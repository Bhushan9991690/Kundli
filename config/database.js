const mongoose = require("mongoose");
const connectDB = async () => {
  // const db_password=ln3uLs54q9C34zJN;
  // const db_User=godwaha2003;F
  await mongoose.connect(
    "mongodb+srv://godwaha2003:ln3uLs54q9C34zJN@kundlimatch.y6ivg.mongodb.net/?retryWrites=true&w=majority&appName=kundliMatch"
  );
};
module.exports = connectDB;
