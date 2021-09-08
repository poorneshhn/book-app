const express = require("express");
const path = require("path");
const authorRouter = require("./routers/authorRouter");
const bookRouter = require("./routers/bookRouter");
const book = require("./models/books");
const methodOverride = require("method-override");
const hbs = require("express-handlebars");

require("./db/mongoose");

// path set up
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../views/partials");
const layoutDirPath = path.join(__dirname, "../views/layouts");

// set up express
const app = express();
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    layoutsDir: layoutDirPath,
    defaultLayout: "main",
    partialsDir: partialsPath,
  })
);

// routes
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.get("/", async (req, res) => {
  try {
    res.render("index", {
      title: "Home - Book App",
      books: await book
        .find({})
        .lean()
        .sort({ createdAt: "desc" })
        .limit(10)
        .exec(),
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Server is up and running on port", port);
});
