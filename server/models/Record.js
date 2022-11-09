import mongoose from "mongoose";
// determine what data needs to be saved in Record(fater class of LoanRecord and LostRecord)
const recordSchema = mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
      default: undefined,
    },
    userPhone: {
      type: String,
      min: 9,
      max: 20,
      required: true,
      default: undefined,
    },
    userName: {
      type: String,
      min: 3,
      max: 20,
      required: true,
      default: undefined,
    },
    type: {
      type: String,
      min: 3,
      max: 20,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
  },
  // aotomatically generate creation time
  { timestamps: true }
);

const Record = mongoose.model("record", recordSchema);
export default Record;
