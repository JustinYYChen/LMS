import mongoose from "mongoose";
// determine what data needs to be saved in Books
const booksSchema = mongoose.Schema({
  bookName: {
    type: String,
    min: 3,
    max: 50,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    min: 0,
    max: 1000,
    required: true,
    unique: false,
  },
  genera: {
    type: String,
    min: 3,
    max: 50,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true,
  },
  bookIdList: [String],
  pictureURL: { type: String, default: "" },
});
const Books = mongoose.model("bookDB", booksSchema);
export default Books;
