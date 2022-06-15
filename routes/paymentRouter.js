const express = require("express");
const paymentCont = require("../controllers/paymentController");
const authv = require("../middleware/auth");

const paymentRouter = express.Router();

paymentRouter.post(
  "/addpayment",
  authv.paymentValidation,
  paymentCont.addpayment
);
paymentRouter.get("/paymentList", paymentCont.getAllPaymentList);
paymentRouter.get("/getpaymentbyid", paymentCont.getPaymentById);
paymentRouter.delete("/deletepaymentbyid", paymentCont.deletePaymentById);

module.exports = paymentRouter;
