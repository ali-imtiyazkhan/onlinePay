const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account, Transaction } = require("../db");
const mongoose = require("mongoose");

const router = express.Router();

// --------------------- GET BALANCE ---------------------
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

// --------------------- TRANSFER FUNDS ---------------------
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;
    const fromUserId = req.userId;

    const account = await Account.findOne({ userId: fromUserId }).session(session);
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
    await Account.updateOne({ userId: fromUserId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Save single transaction with both users
    await Transaction.create([{
      fromUser: fromUserId,
      toUser: to,
      amount,
      type: "debit",
      description: `Transferred to user ${to}`,
    }], { session });

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

// --------------------- ADD FUNDS ---------------------
router.post("/add", authMiddleware, async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const account = await Account.findOne({ userId: req.userId }).session(session);
    if (!account) {
      await session.abortTransaction();
      return res.status(404).json({ message: "No account found. Please create an account first." });
    }

    account.balance += amount;
    await account.save({ session });

   
    await Transaction.create([{
      fromUser: req.userId,
      toUser: req.userId,
      amount,
      type: "credit",
      description: "Funds added to wallet",
      kind: "topup",
    }], { session });

    await session.commitTransaction();
    res.json({ message: "Funds added successfully", balance: account.balance });
  } catch (err) {
    await session.abortTransaction();
    console.error("Error adding funds:", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    session.endSession();
  }
});

// --------------------- TRANSACTION HISTORY ---------------------
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const transactions = await Transaction.find({
      $or: [{ fromUser: userId }, { toUser: userId }],
    })
      .populate("fromUser", "username email")
      .populate("toUser", "username email")
      .sort({ createdAt: -1 });

    const formatted = transactions.map((txn) => {
      let type = "debit";
      if (txn.toUser && txn.toUser._id.toString() === userId.toString()) {
        type = "credit";
      }
      if (txn.kind === "topup") {
        type = "topup";
      }
      return {
        _id: txn._id,
        amount: txn.amount,
        type,  
        fromUser: txn.fromUser,
        toUser: txn.toUser,
        description: txn.description,
        createdAt: txn.createdAt,
      };
    });

    res.json({ success: true, transactions: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching history",
      error: err.message,
    });
  }
});

module.exports = router;
