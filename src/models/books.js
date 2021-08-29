const mongoose = require("mongoose");
const validator = require("validator");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate(value) {
            if(value.trim == "") throw new Error("name can not be Space!");
        }},
    description: {
        type: String,
        required: true
        },
    publishDate: {
        type: Date,
        required: true
        },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    }    
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
