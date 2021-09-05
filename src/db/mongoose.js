const mongoose = require("mongoose");
const db = mongoose.connection;

require("dotenv").config();

// mongodb+srv://poorneshhn:Welcome%40@cluster0.dhwgc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})

db.on("error", () => {
    console.log("database error");
})

db.once("open", () => {
    console.log("connected to database successfully");
})