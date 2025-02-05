const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.db_User}:${process.env.db_password}@kundlimatch.y6ivg.mongodb.net/?retryWrites=true&w=majority&appName=kundliMatch`
  );
};
module.exports = connectDB;
