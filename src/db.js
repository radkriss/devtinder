const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://devtinder:devtinder@devtinder.fxd0g.mongodb.net/?retryWrites=true&w=majority&appName=DevTinder");
} 

module.exports = connectDB;