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
