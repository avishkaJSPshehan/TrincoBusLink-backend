const express = require("express");

const addBus = require("../controllers/bus-controller").addBus;
const getAllBus = require("../controllers/bus-controller").getAllBus;
const updateBus = require("../controllers/bus-controller").updateBus;
const deleteBus = require("../controllers/bus-controller").deleteBus;

const router = express.Router();

router.post("/", addBus);
router.get("/all", getAllBus);
router.put("/", updateBus);
router.delete("/", deleteBus);
