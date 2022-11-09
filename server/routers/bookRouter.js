import { Router } from "express";
import auth from "../auth.js";
import {
  createBook,
  getBook_array,
  updateStatus,
} from "../controllers/book.js";
// use router to post codes in book.js
const bookRouter = Router();
bookRouter.post("/addBook", auth, createBook);
bookRouter.get("/", getBook_array);
bookRouter.patch("/updateStatus/:bookId", updateStatus);
export default bookRouter;
