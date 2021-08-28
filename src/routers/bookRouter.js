const express = require("express");
const Book = require("../models/books");

const bookRouter = new express.Router();

bookRouter.get("/", (req, res) => {
    res.status(200).render("bookviews/index", {
        title: "Books Book-App"
    });
})

bookRouter.post("/newbook", async (req, res) => {
    try {
        console.log(req.body);
        const book = await new Book({
            bookname: req.body.bookname
        });
        await book.save();
        res.status(200).redirect("/");
    } catch (error) {
        console.log(error);
    }
    console.log(req.body);
    //res.send("Create");
})

module.exports = bookRouter;