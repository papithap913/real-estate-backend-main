const express = require('express');
const router = express.Router();
 
const { addproperty } = require('../controllers/propertyController');
router.post('/', createProperty);
router.post("/addproperty", authMiddleware, addProperty);

module.exports = router;
