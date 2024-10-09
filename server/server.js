require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const connectDB = require("./mongo");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const outfitRoutes = require("./routes/outfitRoutes");
const { requireAuth, checkUser } = require("./middleware/authenticate");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Apply checkUser middleware globally
app.use(checkUser);

// Use routes
app.use(authRoutes);
app.use(outfitRoutes);

// Routes
app.get("/", (req, res) => {
  res.json({ user: res.locals.user }); // Send user data to the client
});

app.get("/profile", requireAuth, (req, res) => res.render("Profile"));

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log("Server started on port " + port);
});
