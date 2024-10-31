const express = require("express");
const { paymentConfig, createPayment } = require("../controllers/payment-controller");

const router = express.Router();

router.get("/config", paymentConfig);
router.post("/create-payment-intent", createPayment);

module.exports = router;
