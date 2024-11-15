const jwt = require('jsonwebtoken');
const User = require('../models/usermodel'); // Adjust the path if necessary

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header contains a bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user based on the decoded token and attach it to the request
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Middleware to check if the user has admin privileges
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
