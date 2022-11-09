import recordSchema from "./Record";
import extende from "mongoose-schema-extend";
// determine what data needs to be saved in LostRecord(besides data in record)
var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
const LostRecordSchema = recordSchema.extend(); //check
const LostRecord = mongoose.model("loanRecord", LostRecordSchema);
export default LostRecord;