const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


// router.get("/", authController.renderHome);

// Route checking user authentication
router.get("/checkAuth", authController.checkAuth);

// Route enabling user registration
router.post("/register", authController.register);

// Route for processing login requests
router.post("/login", authController.login);

// Route for logging users out
router.post("/logout", authController.logout);

module.exports = router;