const path = require("path");

// Dependancies
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
var bodyParser = require("body-parser");

dotenv.config({ path: "config.env" });

const ApiError = require("./utils/apiError");
const Database = require("./config/database");

const mountRoutes = require("./routes");

// connect to the database
new Database();

// Express App
const app = express();

// Middlewares

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.options("*", cors());
app.use(express.json()); // parsing to json

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
mountRoutes(app);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

const PORT = process.env.PORT || 1000;
const server = app.listen(PORT, () => {
  console.log("Server is Running on port 1000 .... :)");
});

// @desc    Handling rejection outside Express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting Down Server......");
    process.exit(1);
  });
});
