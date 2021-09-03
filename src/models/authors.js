const mongoose = require("mongoose");
const validator = require("validator");
const Book = require("../models/books");

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate(value) {
            if(value.trim() == "") throw new Error("name can not be space!");
        }
    }
})

authorSchema.pre("remove", async function(next) {
    try {
        const books = await Book.find({author : this._id});
        if(books.length > 0) {
        return next(new Error("This author is linked to a book. Deleting is not allowed"));
        }if(books.length <= 0) {
        return next();
        }
    } catch (error) {
        next(error);
    }
})

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;