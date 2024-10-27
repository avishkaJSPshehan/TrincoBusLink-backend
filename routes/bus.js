const express = require("express");
const {
  getBus,
  bookSeats,
  getBookedSeats,
  addBus,
  getAllBus,
  updateBus,
  deleteBus,
  searchBus,
} = require("../controllers/bus-controller");

const router = express.Router();

router.post("/", addBus);
router.get("/", getBus);
router.get("/all", getAllBus);
router.put("/update/:id", updateBus);
router.delete("/delete/:id", deleteBus);
router.post("/search", searchBus);
router.post("/book", bookSeats);
router.get("/booked-seats", getBookedSeats);

module.exports = router;
