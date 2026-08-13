const express = require("express");
const { controller } = require("../controllers/PropertiesController");

const router = express.Router();

router.post("/create", controller);


module.exports = router;