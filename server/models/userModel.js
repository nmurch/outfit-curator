const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fname: { type: String, required: [true, "Please enter a first name"] },
  lname: { type: String, required: [true, "Please enter a last name"] },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

/* Mongoose Hooks */

// Function to run before new user saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt); // hash pw
  next();
});

// Function to run after new user saved to db
userSchema.post("save", function (doc, next) {
  console.log("new user created and saved", doc);
  next();
});

// Static method to log in user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect email or password");
  }
  throw Error("incorrect email or password");
};

// Getting a user's first name
userSchema.methods.getFname = async function () {
  return this.fname;
};

module.exports = mongoose.model("user", userSchema);
