const express = require("express");
const { properties } = require("../controllers/PropertiesController");

const router = express.Router();

router.post("/create", properties);


module.exports = router;