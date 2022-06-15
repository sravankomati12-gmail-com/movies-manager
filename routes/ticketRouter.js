const express = require("express");
const ticketControl = require("../controllers/ticketController");
const validate = require("../middleware/auth");

const ticketRouter = express.Router();

ticketRouter.post(
  "/newticket",
  validate.ticketValidation,
  ticketControl.newTicket
);
ticketRouter.get("/ticketList", ticketControl.ticketList);
ticketRouter.get("/ticketsbooked", ticketControl.ticketbookedList);
ticketRouter.delete("/ticketdelete", ticketControl.ticketDelete);

module.exports = ticketRouter;
