const Property = require("../models/Property"); // Adjust path as needed

// Controller for adding a property
const addProperty = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    // Create a new property associated with the logged-in user
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

// Controller for retrieving all properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("user", "name email");
    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for retrieving a property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("user", "name email");
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for updating a property
const updateProperty = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Ensure the logged-in user owns the property
    if (property.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this property" });
    }

    // Update the property details
    property.title = title || property.title;
    property.description = description || property.description;
    property.price = price || property.price;

    const updatedProperty = await property.save();
    res.status(200).json(updatedProperty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for deleting a property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Ensure the logged-in user owns the property
    if (property.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this property" });
    }

    await property.remove();
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
