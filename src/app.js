const express = require("express");
const connectDB = require("./db")
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");

app.use(express.json())

// Get user by email
app.get("/user", async (req, res, next) => {
    const email = req.body.email;
    try {
        const user = await User.find({ email: email});
        res.send(user);
    } catch(err) {
        res.status(404).send("Something went wrong !");
    }
})

// Get all Users
app.get("/users", async (req, res, next) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(err) {
        res.status(404).send("Couldn't fetch the users !")
    }
})

// Delete a user
app.delete("/user", async (req, res) => {
    try {
        await User.deleteOne({ email: req.body.email});
        res.send("Successfully deleted user !")
    } catch (err) {
        res.send("Unable to delete user !")
    }
})

// Update an user
app.patch("/user", async (req, res) => {
    try {
        await User.findOneAndUpdate({email: req.body.email}, {firstName: "Dhoni mamae"});
        res.send("Updated successfully !");
    } catch(err) {
        res.status(404).send("Not working !")
    }
})

app.post("/signup", async (req, res, next) => {
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

connectDB()
    .then(() => {
        console.log("DB connected !!");
        app.listen(3000, () => {
            console.log("Server started at 3000")
        });
    })
    .catch(() => {
        console.log("DB not connected !!")
    })

