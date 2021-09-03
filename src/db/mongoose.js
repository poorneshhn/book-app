const mongoose = require("mongoose");
const db = mongoose.connection;

// mongodb+srv://poorneshhn:Welcome%40@cluster0.dhwgc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect("mongodb+srv://poorneshhn:Welcome%40@cluster0.dhwgc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true
})

db.on("error", () => {
    console.log("database error");
})

db.once("open", () => {
    console.log("connected to database successfully");
})