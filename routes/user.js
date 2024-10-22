const express = require("express");

const addUser = require("../controllers/user-controller").addUser;
const login = require("../controllers/user-controller").login;

const router = express.Router();

router.post("/", addUser);
router.post("/login", login);

module.exports = router;
