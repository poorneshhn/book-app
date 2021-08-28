const mongoose = require("mongoose");
const validator = require("validator");

const bookSchema = new mongoose.Schema({
    bookname: {
        type: String,
        required: true,
        validate(value) {
            if(value.trim == "") throw new Error("name can not be Space!");
        }
    }
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
