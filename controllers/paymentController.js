const paymentModel = require("../models/paymentModel");
const ticketModel = require("../models/ticketModel");
const razorPay = require("razorpay");
const razorPayInstance = new razorPay({
  key_id: "rzp_test_QTUFWBHJ2sSTu9",
  key_secret: "D4ryYrdDOoukeXOy0NkStV4v",
});

module.exports = {
  addpayment: async (req, res) => {
    const { acountno, payopt, currency, timmingslot, username, ticket } =
      req.body;
    const checkTicket = await ticketModel.findOne({ _id: ticket });
    await paymentModel.create({
      acountNo: acountno,
      paymentOpt: payopt,
      currency,
      userName: username,
      amount: checkTicket.amount,
      timmingSlot: timmingslot,
      ticket: checkTicket._id,
    });
    if (checkTicket) {
      razorPayInstance.orders
        .create({
          amount: 800,
          currency: "INR",
          receipt: "su001",
          payment_capture: "1",
        })
        .then((result) => {
          console.log(result);
          res.json({ message: "payment is done" });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.json({ message: "This ticket id is not exist" });
    }
  },
  verifypayment: async (req, res) => {},
  getAllPaymentList: async (req, res) => {
    const data = await paymentModel
      .find()
      .populate([{ path: "ticket", populate: { path: "createdBy" } }]);

    res.json({ message: "List of payment", data });
  },
  getPaymentById: async (req, res) => {
    const data = await paymentModel
      .findById(req.query.id)
      .populate([{ path: "ticket", populate: { path: "createdBy" } }]);
    res.json({ message: "List of payment by id", data });
  },
  deletePaymentById: async (req, res) => {
    await paymentModel.findByIdAndDelete(req.query.id);
    res.json({ message: "this payment details is deleted" });
  },
};
