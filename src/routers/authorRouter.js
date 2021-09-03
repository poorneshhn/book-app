const express = require("express");
const Author = require("../models/authors");

const authorRouter = new express.Router();

authorRouter.get("/", async (req, res) => {
    try {
        let value = req.query.name;
        let searchOptions = {};
        if(value != null && value != "") {
            searchOptions.name = new RegExp(value, "i")
        }
        
        const allAuthors = await Author.find(searchOptions);
        
        res.status(200).render("authorviews/index", {
        title: "Authors Book-App",
        authors: allAuthors,
        searchOption: req.query.name
    }) 
    } catch (error) {
        res.send(error);
    }
})

authorRouter.get("/new", (req, res) => {
    res.render("authorviews/new");
})

authorRouter.post("/new", async (req, res) => {
    try {
        const author = await new Author({
            name: req.body.name
        });
        await author.save();
        res.redirect("/authors");
    } catch (error) {
        res.send(error);
    }
})

authorRouter.get("/:id", async (req, res) => {
    try {
        
        res.send("author" + req.params.id);
    } catch (error) {
        res.redirect("/authors");
    }
})


authorRouter.get("/:id/edit", async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        res.render("authorviews/edit", {
            title: "Edit - Book-App",
            author: author
        });
    } catch (error) {
        console.log(error);
    }
})


authorRouter.patch("/:id", async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        });
        await author.save();
        res.redirect(`/authors/${author._id}`);
    } catch (error) {
        console.log(error);
    }
})

authorRouter.delete("/:id", async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        await author.remove();
        res.redirect("/authors");
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = authorRouter;