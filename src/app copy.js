const express = require("express");
const connectDB = require("./db")
const app = express();
// app.use("/", (req, res) => {
//     res.send("Default handler")
// })

app.get("/user", (req, res, next) => {
    throw new Error("Something wrong");
})

// app.get("/user", (req, res) => {
//     res.send("Coming from mamae !")
// })

// app.post("/user", (req, res) => {
//     res.send("Successfully saved in the DB !")
// })

// app.delete("/user", (req, res) => {
//     res.send("Deleted from DB !")
// })

// app.use("/", (err, req, res, next) => {
//     if (err) {
//         res.status(500).send("Pocha !!");
//     }
// })

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

