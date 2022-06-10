const razorPay = require("razorpay");
const razorPayInstance = new razorPay({
  key_id: "rzp_test_QTUFWBHJ2sSTu9",
  key_secret: "D4ryYrdDOoukeXOy0NkStV4v",
});

module.exports = {
  razorPayInstance,
};
