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
        authors: allAuthors.map(author => author.name)
    }) 
    } catch (error) {
        res.send(error);
    }
})

authorRouter.get("/new", (req, res) => {
    res.render("authorviews/new", {
        author: new Author()
    });
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

module.exports = authorRouter;