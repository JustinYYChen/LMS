import mongoose from "mongoose";
import booksSchema from "./Books.js";
import recordSchema from "./Record.js";
// determine what data needs to be saved in StockRecord(besides data in record)
const StockRecordSchema = recordSchema.extend({
  books: {
    type: booksSchema,
    default: undefined,
  },
  quantity: {
    type: Number,
    required: true,
    default: undefined,
  },
  userPhone: {
    type: String,
    min: 9,
    max: 20,
    required: true,
    unique: true,
    default: undefined,
  },
  userName: {
    type: String,
    min: 3,
    max: 20,
    required: true,
    unique: false,
    default: undefined,
  },
  type: {
    type: String,
    min: 3,
    max: 20,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
    unique: false,
    default: undefined,
  },
});
const StockRecord = mongoose.model("loanRecord", StockRecordSchema);
export default StockRecord;
