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
        default: Date.now
    },
    coverImage: {
        type: Buffer
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    }    
})

bookSchema.methods.toJSON = function() {
    const book = this
    const bookObject = book.toObject();

    delete bookObject.coverImage;

    return bookObject;
}

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
