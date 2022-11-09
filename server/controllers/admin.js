import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import tryCatch from "../catchError.js";
import Administrator from "../models/Administrator.js";

// handle creation of admin
export const initialiseAdministrator = tryCatch(async (req, res) => {
  // get adminName, email, password from fornt end
  const { adminName, emailAddress, password, phoneNumber } = req.body;
  // return error 400 if the password created not appropriate
  if (password.length < 5)
    return res.status(400).json({
      success: false,
      message: "Password must be 6 characters or more",
    });
  // normalize email
  const emailLowerCase = emailAddress.toLowerCase();

  // check if creating exist admin, lower case email add as primary key
  const existedAdmin = await Administrator.findOne({
    emailAddress: emailLowerCase,
  });
  // return error 400 if there are same admin in the database
  if (existedAdmin)
    return res
      .status(400)
      .json({ success: false, message: "Administrator already exists!" });
  // hash the password to encrypt
  const hashedPassword = await bcrypt.hash(password, 12);
  // create the admin in database
  const admin = await Administrator.create({
    adminName,
    emailAddress: emailLowerCase,
    password: hashedPassword,
    phoneNumber: phoneNumber,
  });
  console.log("create the db");
  const { _id: id, imageURL } = admin;
  const token = jwt.sign({ id, adminName, imageURL }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({
    success: true,
    result: {
      id,
      adminName,
      emailAddress: admin.emailAddress,
      phoneNumber,
      imageURL,
      token,
    },
  });
});

// handle login
export const myLogin = tryCatch(async (req, res) => {
  // get email, password form front end
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();
  // check if admin exist in db using pk(email)
  const existedUser = await Administrator.findOne({
    emailAddress: emailLowerCase,
  });
  // if not exist, return error 404
  if (!existedUser)
    return res
      .status(404)
      .json({ success: false, message: "User does not exist!" });
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  // check if password corect, if not return error 400
  if (!correctPassword)
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });

  const { _id: id, adminName, imageURL } = existedUser;
  const token = jwt.sign({ id, adminName, imageURL }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  // if match, return success and result
  res.status(200).json({
    success: true,
    result: { id, adminName, emailAddress: emailLowerCase, imageURL, token },
  });
});
