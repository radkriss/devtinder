
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email: email});

        if (!user) {
            throw new Error("No email found !");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = await jwt.sign({_id: user._id}, "NandhanMamae");
            res.cookie("token", token);
            res.send("Login successful !");
        } else {
            throw new Error("Credentials not valid !")
        }
    } catch(err) {
        res.status(400).send("Issue login");
    }
})

router.post("/signup", async (req, res, next) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        const pwd = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            password: pwd
        })
        await user.save();
        res.send("User added successfully !!")
    } catch(err) {
        res.status(400).send("Error saving the user : " + err.message);
    }
})

module.exports = router;