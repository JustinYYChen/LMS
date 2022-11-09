import mongoose from "mongoose";
// determine what data needs to be saved in admin
const adminSchema = mongoose.Schema({
  adminName: {
    type: String,
    min: 3,
    max: 50,
    required: true,
    unique: true,
  },
  emailAddress: {
    type: String,
    min: 3,
    max: 50,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  imageURL: { type: String, default: "" },
});
const Administrator = mongoose.model("myAdmin", adminSchema);
export default Administrator;
