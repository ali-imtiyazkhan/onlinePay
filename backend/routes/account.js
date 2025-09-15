const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account, Transaction } = require("../db");
const mongoose = require("mongoose");

const router = express.Router();

// Get balance
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
      return res.status(404).json({ message: "No account found. Please create an account first." });
    }
    res.json({ balance: account.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Transfer funds
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session);
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid account" });
    }

    // Update balances
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

   
    await Transaction.create([
      {
        userId: req.userId,
        amount,
        type: "debit",
        description: `Transferred to user ${to}`,
      },
      {
        userId: to,
        amount,
        type: "credit",
        description: `Received from user ${req.userId}`,
      },
    ], { session });

    await session.commitTransaction();
    res.json({ message: "Transfer successful" });
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    session.endSession();
  }
});

// Add funds
router.post("/add", authMiddleware, async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
      return res.status(404).json({ message: "No account found. Please create an account first." });
    }

    account.balance += amount;
    await account.save();


    await Transaction.create({
      userId: req.userId,
      amount,
      type: "credit",
      description: "Funds added to wallet",
    });

    res.json({ message: "Funds added successfully", balance: account.balance });
  } catch (err) {
    console.error("Error adding funds:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching history", error: err.message });
  }
});

module.exports = router;
