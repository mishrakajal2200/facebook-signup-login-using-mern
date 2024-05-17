const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupModel = require("../models/signupModel");


// Signup logic
exports.signup = async (req, res) => {
  try {
    const { name, surname, email, password, dob, gender } = req.body;

    // Check if the user already exists in the database
    const existingUser = await signupModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new signupModel({
      name,
      surname,
      email,
      password: hashedPassword,
      dob,
      gender,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ email: newUser.email }, "your-secret-key", {
      expiresIn: "1d", // Token expires in 1 day
    });

    // Send response with token
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logic for login form
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists in the database
    const user = await signupModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    bcrypt.compare(password, user.password, (err, response) => {
      if (response) {
        // If passwords match, generate a JWT token and send it to the client
        const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
          expiresIn: "1d",
        });
        res.cookie("token", token);
        res.json({ message: "Login successful" });
      } else {
        // If passwords don't match, return an error message
        res.status(401).json({ message: "Incorrect password" });
      }
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
