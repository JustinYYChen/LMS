import tryCatch from "../catchError.js";
import Record from "../models/Record.js";

// handel LoanRecord creatioin
export const createLoanRecord = tryCatch(async (req, res) => {
  // get data from front end, check if missing, missing then return error 400
  const { itemName, customerName, type, phoneNumber, bookId } = req.body;
  if (
    phoneNumber == undefined ||
    itemName == undefined ||
    customerName == undefined ||
    type == undefined ||
    bookId == undefined
  )
    return res.status(400).json({
      success: false,
      message: "missing data",
    });
  // normalize
  const customerNameLowerCase = customerName.toLowerCase();
  // await record creation and change stored data(success and result)
  const loanRecord = await Record.create({
    bookName: itemName,
    userPhone: phoneNumber,
    userName: customerNameLowerCase,
    type,
    bookId,
  });
  res.status(201).json({
    success: true,
    result: {
      bookName: itemName,
      userPhone: phoneNumber,
      userName: customerNameLowerCase,
      type,
      bookId,
    },
  });
});

export const getRecords = tryCatch(async (req, res) => {
  const records = await Record.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: records });
});
