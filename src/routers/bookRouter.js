const express = require("express");
const Book = require("../models/books");
const Author = require("../models/authors");

const bookRouter = new express.Router();

bookRouter.get("/", (req, res) => {
    res.status(200).render("bookviews/index", {
        title: "Books - Book-App"
    })
})

bookRouter.post("/", async (req, res) => {
    try {
        
        let value = req.body;

        console.log(value);
    
    const book = await new Book({
        title: value.title,
        description: value.description,
        publishDate: value.publishDate,
        pageCount: value.pageCount,
        createdAt: value.createdDate,
        coverImageName: value.coverImageTitle,
        author: value.author 
    })

    await book.save();

    res.status(200).redirect("/books");

    } catch (error) {
        res.status(500).send(error);    
    }
})

bookRouter.get("/new", async (req, res) => {

    const authors = await Author.find({});
    res.status(200).render("bookviews/new", {
        title: "New Book - Book-App",
        authors: authors
    })
    
})

module.exports = bookRouter;