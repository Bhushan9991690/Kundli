const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const app = express();
connectDB()
  .then(() => {
    console.log("Conneted successfully to DB");
    app.listen(3000, () => {
      console.log("Listening server 3000");
    });
  })
  .catch((err) => {
    console.log("NOt DB Connetion", err);
  });
