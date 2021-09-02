const express = require("express");
const Book = require("../models/books");
const Author = require("../models/authors");
const multer = require("multer");

const bookRouter = new express.Router();

bookRouter.get("/", async (req, res) => {
    try {
        let query = Book.find();
        console.log(req.query);
        if(!(req.query.title == null)) {
            query = query.regex("title", new RegExp(req.query.title, "i"));
        }
        if(req.query.publishDateBefore != null && req.query.publishDateBefore != "") {
            query = query.lte("publishDate", req.query.publishDateBefore);
        }
        if(req.query.publishDateAfter != null && req.query.publishDateAfter != "") {
            query = query.gte("publishDate", req.query.publishDateAfter);
        }
        const books = await query.exec();
        
        res.status(200).render("bookviews/index", {
            title: "Books - Book-App",
            books: books,
            searchOptions: req.query
        })
    } catch (error) {
        console.log(error);
    }  
})



bookRouter.get("/images/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if(!book) {
            return res.send(null);
        }
        res.set("Content-Type", "image/jpg" );
        res.status(200).send(book.coverImage);
    } catch (error) {
        console.log(error);
    }   
})



// cover image setup
const upload = multer({
    limits: {
        fileSize: 1000000
    }, 
    fileFilter(req, file, cb) {
        if(!file.originalname.toLowerCase().match(/\.(png|img|jpg|jpeg)$/)) {
            return cb(new Error("Please upload an Image file"));
        }
        cb(undefined, true);
    }
})



// book save route 
bookRouter.post("/", upload.single("cover"), async (req, res) => {
    try {
        let value = req.body;
        console.log(value);
    
    const book = await new Book({
        title: value.title,
        description: value.description,
        publishDate: value.publishDate,
        pageCount: value.pageCount,
        coverImage: req.file.buffer,
        author: value.author 
    })

    await book.save();

    res.status(200).redirect("/books");

    } catch (error) {
        res.status(500).send(error);    
    }
}, (error, req, res, next) => {
    res.status(400).send(error.message);
})



bookRouter.get("/new", async (req, res) => {
    const authors = await Author.find({});
    res.status(200).render("bookviews/new", {
        title: "New Book - Book-App",
        authors: authors
    })
})

module.exports = bookRouter;