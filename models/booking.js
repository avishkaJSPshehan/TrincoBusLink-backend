const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  key:String,
  bookings:[]
});

const BookingModel = mongoose.model("booking", BookingSchema);
module.exports = BookingModel;
