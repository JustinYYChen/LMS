import { Router } from "express";
import { initialiseAdministrator, myLogin } from "../controllers/admin.js";
// use router to post codes in admin.js
const adminRouter = Router();
adminRouter.post("/initialise", initialiseAdministrator);
adminRouter.post("/signin", myLogin);

export default adminRouter;
