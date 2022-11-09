import { Router } from "express";
import auth from "../auth.js";
import { createBooks } from "../controllers/books.js";
// use router to post codes in books.js
const booksRouter = Router();
booksRouter.post("/books", auth, createBooks);
export default booksRouter;
