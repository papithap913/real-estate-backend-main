const express = require("express");
const {
  addProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController"); // Import your controllers
const { protect, admin } = require("../middleware/authMiddleware"); // Import middleware

const router = express.Router();

// Route to add a new property (protected)
router.post("/addproperty", protect, addProperty);

// Route to get all properties (protected)
router.get("/properties", protect, getProperties);

// Route to get a property by ID (protected)
router.get("/properties/:id", protect, getPropertyById);

// Route to update a property by ID (admin only)
router.put("/properties/:id", protect, admin, updateProperty);

// Route to delete a property by ID (admin only)
router.delete("/properties/:id", protect, admin, deleteProperty);

module.exports = router;
