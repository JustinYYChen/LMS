import { Router } from "express";
import auth from "../auth.js";
import { createLoanRecord, getRecords } from "../controllers/loanRecord.js";
// use router to post codes in loanRecord.js
const recordRouter = Router();
recordRouter.post("/records", auth, createLoanRecord);
recordRouter.get("/", getRecords);

export default recordRouter;
