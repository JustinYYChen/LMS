import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminRouter from "./routers/adminRouter.js";
import recordRouter from "./routers/recordRouter.js";
import bookRouter from "./routers/bookRouter.js";
import booksRouter from "./routers/booksRouter.js";
dotenv.config();

// config for back end, port number 5000
const port = process.env.PORT || 5000;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  next();
});

// assign router to root
app.use(express.json({ limit: "10mb" }));
app.use("/admin", adminRouter);
app.use("/recordForm", recordRouter);
app.use("/bookForm", bookRouter);
app.use("/bookForm", booksRouter);
//app.use("/form", booksRouter);
app.use("/", (req, res) => res.json({ message: "Welcome to our API" }));
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not Found" })
);

// start backend server mongodb
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
