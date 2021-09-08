const express = require("express");
const Author = require("../models/authors");
const Book = require("../models/books");

const authorRouter = new express.Router();

authorRouter.get("/", async (req, res) => {
  try {
    let value = req.query.name;
    let searchOptions = {};
    if (value != null && value != "") {
      searchOptions.name = new RegExp(value, "i");
    }

    const allAuthors = await Author.find(searchOptions).lean();

    res.status(200).render("authorviews/index", {
      title: "Authors Book-App",
      authors: allAuthors,
      searchOption: req.query.name,
    });
  } catch (error) {
    res.send(error);
  }
});

authorRouter.get("/new", (req, res) => {
  res.render("authorviews/new");
});

authorRouter.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).lean();
    const books = await Book.find({ author: req.params.id }).lean();

    res.render("authorviews/show", {
      title: "Author - Book-App",
      author: author,
      books: books,
    });
  } catch (error) {
    res.redirect("/authors");
  }
});

authorRouter.post("/new", async (req, res) => {
  try {
    const author = await new Author({
      name: req.body.name,
    });
    await author.save();
    res.redirect("/authors", {
      title: "New Author - Boop - App",
    });
  } catch (error) {
    res.send(error);
  }
});

authorRouter.get("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).lean();
    res.render("authorviews/edit", {
      title: "Edit - Book-App",
      author: author,
    });
  } catch (error) {
    console.log(error);
  }
});

authorRouter.patch("/:id", async (req, res) => {
  try {
    console.log(req.body);
    const author = await Author.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    });
    await author.save();
    res.redirect(`/authors/${author._id}`);
  } catch (error) {
    console.log(error);
  }
});

authorRouter.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    await author.remove();
    res.redirect("/authors");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = authorRouter;
