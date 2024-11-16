const express = require('express');
const router = express.Router();
const { createProperty } = require('../controllers/propertyController'); // Adjust path as needed
const { add-property } = require('../controllers/propertyController');
router.post('/', createProperty);
router.post("/add-property", authMiddleware, addProperty);

module.exports = router;
