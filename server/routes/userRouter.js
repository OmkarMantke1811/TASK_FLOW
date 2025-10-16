import express from "express";
import userCtrl from "../controller/userCtrl.js";

const userRouter=express.Router();



userRouter.post('/register',userCtrl.register)

export default userRouter;
