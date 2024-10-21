const express = require("express");
const connectDB = require("./db")
const app = express();

const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRequestRouter = require("./routes/request");

app.use(express.json())
app.use(cookieParser())
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);


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

