const express = require("express");
const connectDB = require("./db")
const app = express();
const User = require("./models/user");

app.get("/user", (req, res, next) => {
    throw new Error("Something wrong");
})

app.post("/signup", async (req, res, next) => {
    const userObj = {
        firstName: "Virat",
        lastNAme: "Kohli",
        email: "vkohli@gmail.com",
        password: "ferfdscv"
    }

    try {
        const user = new User(userObj);
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

