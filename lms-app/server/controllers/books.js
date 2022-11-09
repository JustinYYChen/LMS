import tryCatch from "../catchError.js";
import Book from "../models/Book.js";
import Books from "../models/Books.js";

// handel books(bookCategory) creation
export const createBooks = tryCatch(async (req, res) => {
  // get bookName, bookQuantity, category from front end
  // check if missing data, if missing, return error 400
  const { bookName, bookQuantity, category, description } = req.body;
  if (
    bookName == undefined ||
    bookQuantity == undefined ||
    category == undefined ||
    description == undefined
  )
    return res.status(400).json({
      success: false,
      message: "missing data",
    });
  // normalize bookName and category
  const bookNameLowerCase = bookName.toLowerCase();
  const categoryLowerCase = category.toLowerCase();
  // await books creation and change stored data(success and result)
  const books = await Books.create({
    bookName: bookNameLowerCase,
    quantity: bookQuantity,
    genera: categoryLowerCase,
    description: description,
  });
  const bookDBId = books._id;
  res.status(201).json({
    success: true,
    result: {
      bookName: bookNameLowerCase,
      quantity: bookQuantity,
      genera: categoryLowerCase,
      description: description,
      bookDBId,
    },
  });
});
