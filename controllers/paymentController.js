const paymentModel = require("../models/paymentModel");
const ticketModel = require("../models/ticketModel");
const razorPay = require("razorpay");
require("dotenv").config();

const razorPayInstance = new razorPay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

module.exports = {
  addpayment: async (req, res) => {
    const { acountno, payopt, currency, timmingslot, username, ticket } =
      req.body;
    const checkTicket = await ticketModel.findOne({ _id: ticket });
    if (checkTicket) {
      razorPayInstance.orders
        .create({
          amount: checkTicket.amount * 100,
          currency: currency,
          receipt: "su001",
          payment_capture: "1",
        })
        .then(async (result) => {
          await paymentModel.create({
            acountNo: acountno,
            paymentOpt: payopt,
            currency,
            userName: username,
            amount: checkTicket.amount,
            timmingSlot: timmingslot,
            ticket: checkTicket._id,
            paymentId: result.id,
          });
          res.json({ message: "Payment is done", details: result });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.json({ message: "This ticket id is not exist" });
    }
  },
  getAllPaymentList: async (req, res) => {
    const { skipNo, fetchNo } = req.query;
    if (
      (skipNo == "" && fetchNo == "") ||
      (skipNo === undefined && fetchNo === undefined)
    ) {
      const data = await paymentModel.find().skip(0).limit(10);
      res.json({ message: "List of payments", data });
    } else {
      const data = await paymentModel.find().skip(skipNo).limit(fetchNo);
      res.json({ message: "List of payments", data });
    }
  },
  getPaymentById: async (req, res) => {
    const data = await paymentModel
      .findById(req.query.id)
      .populate([{ path: "ticket", populate: { path: "createdBy" } }]);
    res.json({ message: "List of payments by id", data });
  },
  deletePaymentById: async (req, res) => {
    await paymentModel.findByIdAndDelete(req.query.id);
    res.json({ message: "These payment details are deleted" });
  },
};
