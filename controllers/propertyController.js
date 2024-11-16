const Property = require("../models/propertyModel"); // Adjust path as needed

// Controller for adding a property
const addProperty = async (req, res) => {
  try {
    // The user info from protect middleware is available as req.user
    const { title, description, price } = req.body;

    const newProperty = new Property({
      title,
      description,
      price,
      user: req.user._id, // Associate property with the logged-in user
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addProperty };
