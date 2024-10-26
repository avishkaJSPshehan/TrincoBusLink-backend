const express = require("express");
const { getBus } = require("../controllers/bus-controller");
const { addBus } = require("../controllers/bus-controller");
const { getAllBus } = require("../controllers/bus-controller");
const { updateBus } = require("../controllers/bus-controller");
const { deleteBus } = require("../controllers/bus-controller");
const { searchBus } = require("../controllers/bus-controller");

const router = express.Router();

router.post("/", addBus);
router.get("/", getBus);
router.get("/all", getAllBus);
router.put("/update/:id", updateBus);
router.delete("/delete/:id", deleteBus);
router.post("/search", searchBus);

module.exports = router;
