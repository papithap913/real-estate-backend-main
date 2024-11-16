const express = require("express");
const { addProperty, getProperties } = require("../controllers/propertyController"); // Update with your actual controllers
const { protect } = require("../middleware/authMiddleware"); // Import the protect middleware

const router = express.Router();

// Routes
router.post("/addproperty", protect, addProperty); // Use the protect middleware
router.get("/properties", protect, getProperties); // Example for a protected get route

module.exports = router;
