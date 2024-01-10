const mongoose = require("mongoose");

const server = "127.0.0.1:27017";
const db = "MyDB";

class dbConnection {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(`mongodb://${server}/${db}`)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection failed");
      });
  }
}

module.exports = dbConnection;
