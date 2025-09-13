const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { authMiddleware } = require("../middleware");

dotenv.config();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post("/signup", async (req, res) => {
    console.log("➡️ Incoming signup request:", req.body);

    const parsed = signupBody.safeParse(req.body);
    console.log("✅ Zod parse result:", parsed);

    if (!parsed.success) {
        console.log("❌ Validation failed");
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });
    console.log("🔎 Existing user lookup:", existingUser);

    if (existingUser) {
        console.log("❌ User already exists");
        return res.status(411).json({
            message: "Email already taken"
        });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    console.log("✅ New user created:", user);

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET
    );

    res.json({
        message: "User created successfully",
        token: token
    });
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    console.log("➡️ Incoming signin request:", req.body);

    const parsed = signinBody.safeParse(req.body);
    console.log("✅ Zod parse result:", parsed);

    if (!parsed.success) {
        console.log("❌ Validation failed");
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    console.log("🔎 Found user:", user);

    if (user) {
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET
        );
        console.log("✅ Signin successful, token generated");

        res.json({ token: token });
        return;
    }

    console.log("❌ Signin failed");
    res.status(411).json({
        message: "Error while logging in"
    });
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    console.log("➡️ Update request for user:", req.userId, req.body);

    const parsed = updateBody.safeParse(req.body);
    console.log("✅ Zod parse result:", parsed);

    if (!parsed.success) {
        console.log("❌ Validation failed on update");
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);
    console.log("✅ User updated:", req.body);

    res.json({
        message: "Updated successfully"
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    console.log("➡️ Bulk search with filter:", filter);

    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, $options: "i" } },
            { lastName: { "$regex": filter, $options: "i" } }
        ]
    });
    console.log("🔎 Found users:", users);

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

module.exports = router;
