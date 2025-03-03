const mongoose = require("mongoose");
const db_password = "ln3uLs54q9C34zJN";
const db_User = "godwaha2003";
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
};
module.exports = connectDB;
