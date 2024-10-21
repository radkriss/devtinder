

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const UserAuthentication = require("../middleware/auth");

// Get user by email
router.get("/user",UserAuthentication,  async (req, res, next) => {
    try {
        res.send(req.user);
    } catch(err) {
        res.status(404).send(err);
    }
})


// Get all Users
router.get("/users", async (req, res, next) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(err) {
        res.status(404).send("Couldn't fetch the users !")
    }
})

// Delete a user
router.delete("/user", async (req, res) => {
    try {
        await User.deleteOne({ email: req.body.email});
        res.send("Successfully deleted user !")
    } catch (err) {
        res.send("Unable to delete user !")
    }
})

// Update an user
router.patch("/user", async (req, res) => {
    try {
        await User.findOneAndUpdate({email: req.body.email}, {firstName: "Dhoni mamae"});
        res.send("Updated successfully !");
    } catch(err) {
        res.status(404).send("Not working !")
    }
})

module.exports = router;