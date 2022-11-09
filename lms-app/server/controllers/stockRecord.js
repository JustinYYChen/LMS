import tryCatch from "../catchError.js";
import StockRecord from "../models/StockRecord.js";

//TODO read books into Schema
// handle StockRecord creation
export const createStockRecord = tryCatch(async (req, res) => {
    // get data from front end, check if missing data, missing then return error 400
    const { customerName, phoneNumber, hireDate, quantity } = req.body;
    if (
        phoneNumber == undefined ||
        customerName == undefined ||
        hireDate == undefined ||
        quantity == undefined
    )
        return res.status(400).json({
            success: false,
            message: "missing data",
        });
    // normalize
    const customerNameLowerCase = customerName.toLowerCase();
    // await creation and change stored data(success and result)
    const stockRecord = await StockRecord.create({
        quantity,
        userPhone: phoneNumber,
        userName: customerNameLowerCase,
        dateTime: hireDate,
    });
    res.status(201).json({
        success: true,
        result: {
            quantity,
            userPhone: phoneNumber,
            userName: customerNameLowerCase,
            dateTime: hireDate,
        },
    });
});