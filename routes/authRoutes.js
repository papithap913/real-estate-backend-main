const express = require("express");
const { registerUser, loginUser, addproperty } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/add-property", addproperty);

module.exports = router;
