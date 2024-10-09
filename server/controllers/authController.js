const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Handle errors
const handleErrors = (e) => {
  console.log(e.message, e.code);
  let errors = { fname: "", lname: "", email: "", password: "" };

  // Incorrect email or pw
  if (e.message === "incorrect email or password") {
    errors.password = "Incorrect email and/or password";
  }

  // Duplicate error code
  if (e.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  // Validation errors
  if (e.message.includes("user validation failed")) {
    Object.values(e.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Creating JWT
const maxAge = 3 * 24 * 60 * 60; // 3 days, in seconds
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// Check if a user is currently authenticated
exports.checkAuth = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.json({ authenticated: false });
      } else {
        res.json({ authenticated: true });
      }
    });
  } else {
    res.json({ authenticated: false });
  }
};

// Registering a new user
exports.register = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const data = {
    fname: fname,
    lname: lname,
    email: email,
    password: password,
  };

  try {
    const user = await User.create(data);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // 3 days, in milliseconds
    res.status(201).json({ user: user._id });
  } catch (e) {
    const errors = handleErrors(e);
    res.status(400).json({ errors });
  }
};

// Logging a user in
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // 3 days, in milliseconds
    res.status(200).json({ user: user._id });
  } catch (e) {
    const errors = handleErrors(e);
    res.status(400).json({ errors });
  }
};

// Logging users out
exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1, httpOnly: true});
  res.status(200).json({ message: "Logged out" });
};
