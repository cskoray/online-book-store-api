require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { errorMiddleware } = require("./middleware/error_middleware");

const app = express();

app.use(bodyParser.json());

process.env.NODE_ENV === "development"
  ? app.use(morgan("dev"))
  : app.use(morgan("combined"));

const userRoutes = require("./routes/user_routes");
const bookRoutes = require("./routes/book_routes");
const orderRoutes = require("./routes/order_routes");

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorMiddleware);

module.exports = app;
