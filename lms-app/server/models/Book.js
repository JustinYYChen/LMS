import mongoose from "mongoose";
// determine what data needs to be saved in Book
const bookSchema = mongoose.Schema({
  condition: {
    type: String,
    min: 3,
    max: 50,
    required: true,
    default: "new",
  },
  status: {
    type: String,
    min: 3,
    max: 50,
    required: true,
    default: "available",
  },
  description: {
    type: String,
    required: true,
  },
  bookCategoryId: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
});
const Book = mongoose.model("book", bookSchema);
export default Book;
