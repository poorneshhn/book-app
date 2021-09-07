const express = require("express");
const Book = require("../models/books");
const Author = require("../models/authors");
const multer = require("multer");
const imageVariable = require("../../public/variable");

const bookRouter = new express.Router();

bookRouter.get("/", async (req, res) => {
  try {
    let query = Book.find().lean();
    if (!(req.query.title == null)) {
      query = query.regex("title", new RegExp(req.query.title, "i"));
    }
    if (
      req.query.publishDateBefore != null &&
      req.query.publishDateBefore != ""
    ) {
      query = query.lte("publishDate", req.query.publishDateBefore);
    }
    if (
      req.query.publishDateAfter != null &&
      req.query.publishDateAfter != ""
    ) {
      query = query.gte("publishDate", req.query.publishDateAfter);
    }
    const books = await query.exec();

    res.status(200).render("bookviews/index", {
      title: "Books - Book-App",
      books: books,
      searchOptions: req.query,
    });
  } catch (error) {
    console.log(error);
  }
});

bookRouter.get("/:id/edit", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .lean()
      .populate("author")
      .exec();
    const author = await Author.find({}).lean();
    const publishDate = book.publishDate.toISOString().slice(0, 10);

    res.status(200).render("bookviews/edit", {
      title: "Edit Book - Book-App",
      book: book,
      authors: author,
      publishDate: publishDate,
    });
  } catch (error) {
    res.send(error.message);
  }
});

bookRouter.get("/images/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.send(null);
    }
    res.set("Content-Type", "image/jpg");
    res.status(200).send(book.coverImage);
  } catch (error) {
    console.log(error);
  }
});

// cover image setup
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(png|img|jpg|jpeg)$/)) {
      return cb(new Error("Please upload an Image file"), false);
    }
    cb(undefined, true);
  },
});

// book save route
bookRouter.post(
  "/",
  upload.single("cover"),
  async (req, res) => {
    try {
      let value = req.body;

      const book = await new Book({
        title: value.title,
        description: value.description,
        publishDate: value.publishDate,
        pageCount: value.pageCount,
        author: value.author,
      });

      if (req.file !== undefined) {
        book.coverImage = req.file.buffer;
      } else {
        book.coverImage = Buffer.from(imageVariable, "base64");
      }

      await book.save();

      res.redirect("/books");
    } catch (error) {
      res.status(500).send(error);
    }
  },
  (error, req, res, next) => {
    res.status(400).send(error.message);
  }
);

bookRouter.get("/new", async (req, res) => {
  const authors = await Author.find({}).lean();
  res.status(200).render("bookviews/new", {
    title: "New Book - Book-App",
    authors: authors,
  });
});

bookRouter.get("/show/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .lean()
      .populate("author")
      .exec();

    res.render("bookviews/show", {
      title: "Details - Book-App",
      book: book,
    });
  } catch (error) {
    res.send(error.message);
  }
});

// update book details
bookRouter.patch("/update/:id", upload.single("cover"), async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    book.title = req.body.title;
    book.author = req.body.author;
    book.pageCount = req.body.pageCount;
    book.publishDate = req.body.publishDate;
    book.description = req.body.description;

    if (req.file) {
      book.coverImage = req.file.buffer;
    }

    await book.save();

    res.redirect(`/books/show/${book._id}`);
  } catch (error) {
    console.log(error);
  }
});

// delete book details
bookRouter.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    await book.remove();
    res.redirect("/books");
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
});

module.exports = bookRouter;
