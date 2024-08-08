require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./mongo");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
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

// Use authentication routes
app.use(authRoutes);

// Routes
app.get("/", (req, res) => {
  res.json({ user: res.locals.user }); // Send user data to the client
});

app.get("/filler", requireAuth, (req, res) => res.render("Filler"));

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log("Server started on port " + port);
});
