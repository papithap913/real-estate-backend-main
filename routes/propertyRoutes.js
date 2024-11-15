const express = require('express');
const router = express.Router();
const { createProperty } = require('../controllers/propertyController'); // Adjust path as needed

router.post('/', createProperty);

module.exports = router;
