const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const app = express();
const PORT=process.env.port;
connectDB()
  .then(() => {
    console.log("Conneted successfully to DB");
    app.listen(PORT, () => {
      console.log("Listening server 3000");
    });
  })
  .catch((err) => {
    console.log("NOt DB Connetion", err);
  });
