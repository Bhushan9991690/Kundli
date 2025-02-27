const mongoose = require("mongoose");
const db_password = "ln3uLs54q9C34zJN";
const db_User = "godwaha2003";
const connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${db_User}:${db_password}@kundlimatch.y6ivg.mongodb.net/?retryWrites=true&w=majority&appName=kundliMatch`
  );
};
module.exports = connectDB;
