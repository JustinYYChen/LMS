import tryCatch from "../catchError.js";
import Book from "../models/Book.js";

// handel book creation
export const createBook = tryCatch(async (req, res) => {
  // get  bookCategoryId, bookName from front end
  const { bookCategoryId, bookName, description } = req.body;
  // check if missing data, if missing, return error 400
  if (bookCategoryId == undefined || bookName == undefined)
    return res.status(400).json({
      success: false,
      message: "missing data",
    });

  // await book creation finish and change stored data(success and result)
  const newBook = await Book.create({
    condition: "new",
    status: "Available",
    description: description,
    bookCategoryId: bookCategoryId,
    bookName: bookName,
  });
  const bookId = newBook._id;
  res.status(201).json({
    success: true,
    result: {
      condition: "new",
      status: "Available",
      description: description,
      bookCategoryId: bookCategoryId,
      bookName: bookName,
      bookId,
    },
  });
});
export const getBook_array = tryCatch(async (req, res) => {
  const book_array = await Book.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: book_array });
});
export const updateStatus = tryCatch(async (req, res) => {
  const { condition, description, status } = req.body;
  await Book.findByIdAndUpdate(req.params.bookId, {
    condition,
    description,
    status,
  });
  res.status(200).json({ success: true, result: { _id: req.params.bookId } });
});
