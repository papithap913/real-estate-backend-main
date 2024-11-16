const express = require('express');
const router = express.Router();
const { createProperty } = require('../controllers/propertyController'); // Adjust path as needed

router.post('/', createProperty);
// In propertyRoutes.js
router.post("/add-property", authMiddleware, addProperty);

module.exports = router;
