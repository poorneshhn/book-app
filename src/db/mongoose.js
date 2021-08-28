const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect("mongodb://127.0.0.1:27017/book-app", {
    useNewUrlParser: true
})

db.on("error", () => {
    console.log("database error");
})

db.once("open", () => {
    console.log("connected to database successfully");
})