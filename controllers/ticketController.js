const ticketModel = require("../models/ticketModel");
let totalSeats = 100;

module.exports = {
  newTicket: async (req, res) => {
    try {
      const { name, seats, moviedate } = req.body;
      if (totalSeats != 0) {
        totalSeats -= seats;
        const amount = seats * 80;
        var result = [];
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < seats; i++) {
          result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength))
          );
        }
        await ticketModel.create({
          movieName: name,
          seatBookedNo: seats,
          amount,
          seatsAllocate: result,
          movieDate: moviedate,
          createdBy: req.user._id,
        });
        res.json({
          message: "This movie ticket is booked",
          ticket: `Avalable ticket is ${totalSeats}`,
        });
      } else {
        res.json({
          message:
            "No ticket is available ,all ticket are booked try again letar",
        });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  ticketbookedList: async (req, res) => {
    try {
      const data = await ticketModel.find({ createdBy: req.user._id });
      res.json({ message: "list of  tickets you booked", data });
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  ticketList: async (req, res) => {
    try {
      const data = await ticketModel.find().populate("createdBy");
      res.json({ message: "list of  tickets booked user", data });
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  // ticketUpdate: async (req, res) => {},
  ticketDelete: async (req, res) => {
    try {
      await ticketModel.findByIdAndDelete(req.query.id);
      res.json({ message: "This ticket is deleted" });
    } catch (error) {
      res.json({ message: error.message });
    }
  },
};
