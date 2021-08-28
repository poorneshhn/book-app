const mongoose = require("mongoose");
const validator = require("validator");

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate(value) {
            if(value.trim() == "") throw new Error("name can not be space!");
        }
    }
})

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;