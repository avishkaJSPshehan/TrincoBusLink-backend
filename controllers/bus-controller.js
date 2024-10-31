const BookingModel = require("../models/booking");
const BusModel = require("../models/buses");

exports.addBus = (req, res) => {
  const newBus = new BusModel(req.body);
  newBus
    .save()
    .then((bus) => res.status(201).json({ message: "success", bus: bus }))
    .catch((err) => res.status(500).json({ message: "error", error: err }));
};

exports.getAllBus = (req, res) => {
  BusModel.find()
    .then((buses) => res.status(200).json(buses))
    .catch((err) => res.status(500).json({ message: "error", error: err }));
};

exports.getBus = (req, res) => {
  const { id } = req.query;
  BusModel.findOne({ _id: id })
    .then((bus) => res.status(200).json(bus))
    .catch((err) => res.status(500).json({ message: "error", error: err }));
};

exports.updateBus = (req, res) => {
  const busId = req.params.id;
  BusModel.findByIdAndUpdate(busId, req.body, { new: true })
    .then((updatedBus) => res.status(200).json(updatedBus))
    .catch((err) => res.status(500).json({ message: "error", error: err }));
};

exports.deleteBus = (req, res) => {
  const busId = req.params.id;
  BusModel.findByIdAndDelete(busId)
    .then(() => res.status(200).json({ message: "success" }))
    .catch((err) => res.status(500).json({ message: "error", error: err }));
};

exports.searchBus = (req, res) => {
  const { departure, arrival } = req.body;

  BusModel.find({
    departure: departure,
    arrival: arrival,
  })
    .then((buses) => {
      if (buses.length > 0) {
        res.json(buses);
      } else {
        res.status(404).json("No buses found for the specified locations");
      }
    })
    .catch((error) => {
      console.error("Error retrieving buses:", error);
      res.status(500).json("An error occurred while searching for buses");
    });
};

exports.bookSeats = async (req, res) => {
  const { busId, date, userId, seats, paymentIntent } = req.body;
  const key = `${busId}-${date}`;
  const obj = await BookingModel.findOne({ key: key });
  let r_Obj;
  if (obj) {
    const bookings = obj.bookings;
    bookings.push({
      user: userId,
      seats: seats,
      paymentIntent: paymentIntent,
    });
    obj.bookings = bookings;
    r_Obj = await obj.save();
  } else {
    const booking = new BookingModel({
      key: key,
      bookings: [{ user: userId, seats: seats }],
    });
    r_Obj = await booking.save();
  }

  return res.status(200).json({ message: "successfull", obj: r_Obj });
};

exports.getBookedSeats = async (req, res) => {
  const { busId, date } = req.query;
  const key = `${busId}-${date}`;
  const obj = await BookingModel.findOne({ key: key });
  if (!obj) return res.status(200).json({ seats: [] });

  let bookedSeats = [];

  if (obj.bookings) {
    obj.bookings.forEach((booking) => {
      bookedSeats = bookedSeats.concat(booking.seats);
    });
    // console.log(bookedSeats);
  }
  return res.status(200).json({ seats: bookedSeats });
};
