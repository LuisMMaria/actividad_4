const express = require("express");
const app = express();
app.use(express.json());
const port = 8000;
const booksRouter = require("./routes/books");
const errorHandler = require("./middlewares/errorHandler");

app.use("/books", booksRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Express server running on ${port}`);
});
