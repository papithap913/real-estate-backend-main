const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

app.use(cors({
    origin: ["https://realfront.netlify.app", "http://localhost:3000"], // Frontend & Postman
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));


// Body Parsing Middleware (Replace body-parser with built-in express.json)
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

// Define Root Route
app.get('/', (req, res) => {
    res.send("Welcome to the Real Estate Backend API");
});

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api", propertyRoutes);

// Start Server
const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
