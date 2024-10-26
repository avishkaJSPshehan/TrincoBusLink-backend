const express = require("express");

const addBus = require("../controllers/bus-controller").addBus;
const getAllBus = require("../controllers/bus-controller").getAllBus;
const updateBus = require("../controllers/bus-controller").updateBus;
const deleteBus = require("../controllers/bus-controller").deleteBus;
const searchBus = require("../controllers/bus-controller").searchBus;

const router = express.Router();

router.post("/", addBus);
router.get("/all", getAllBus);
router.put("/update/:id", updateBus);
router.delete("/delete/:id", deleteBus);
router.post("/search", searchBus);

module.exports = router;
