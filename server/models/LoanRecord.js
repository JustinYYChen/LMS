import mongoose from "mongoose";
import recordSchema from "./Record.js";
// determine what data needs to be saved in LoanRecord(besides data in record)
const LoanRecordSchema = recordSchema.extend({
  type: {
    type: String,
    min: 3,
    max: 10,
    required: true,
    unique: true,
    default: undefined,
  },
});
const LoanRecord = mongoose.model("loanRecord", LoanRecordSchema);
export default LoanRecord;
