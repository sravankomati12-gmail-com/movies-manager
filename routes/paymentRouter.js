const express = require("express");
const paymentCont = require("../controllers/paymentController");
const paymentRouter = express.Router();
paymentRouter.post("/addpayment", paymentCont.addpayment);
paymentRouter.post("/verifypayment", paymentCont.verifypayment);
paymentRouter.get("/paymentList", paymentCont.getAllPaymentList);
paymentRouter.get("/getpaymentbyid", paymentCont.getPaymentById);
paymentRouter.delete("/deletepaymentbyid", paymentCont.deletePaymentById);

module.exports = paymentRouter;
