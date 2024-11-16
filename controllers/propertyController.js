exports.createProperty = (req, res) => {
  // Logic for property creation, extracting data from req.body
  res.status(201).json({ message: 'Property created successfully' });
};
// In propertyController.js
exports.addProperty = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const userId = req.user.id; // Assuming you're using middleware to attach user info
    const property = await Property.create({ title, description, price, user: userId });
    res.status(201).json({ message: "Property added successfully", property });
  } catch (error) {
    res.status(500).json({ error: "Failed to add property" });
  }
};
