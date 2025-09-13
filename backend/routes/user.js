const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware");

dotenv.config();


const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});


router.post("/signup", async (req, res) => {
    try {
        const parsed = signupBody.safeParse(req.body);
        if (!parsed.success) {
            return res.status(411).json({ message: "Incorrect inputs" });
        }

        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(411).json({ message: "Email already taken" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        
        const randomBalance = Math.floor(Math.random() * 901) + 100;
        await Account.create({
            userId: user._id,
            balance: randomBalance
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token,
            userID: user._id,
            initialBalance: randomBalance
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});


router.post("/signin", async (req, res) => {
    try {
        const parsed = signinBody.safeParse(req.body);
        if (!parsed.success) {
            return res.status(411).json({ message: "Incorrect inputs" });
        }

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(411).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(411).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.json({
            message: "Signin successful",
            token: token,
            userID: user._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    try {
        const parsed = updateBody.safeParse(req.body);
        if (!parsed.success) {
            return res.status(411).json({ message: "Error while updating information" });
        }

        await User.updateOne({ _id: req.userId }, req.body);

        res.json({ message: "Updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [
                { firstName: { $regex: filter, $options: "i" } },
                { lastName: { $regex: filter, $options: "i" } }
            ]
        });

        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
