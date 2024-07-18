const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup Controller for Register User
exports.signup = async (req, res) => {
  try {
    // Destructure fields from from request body
    const { name, email, password, confirmPassword } = req.body;

    // validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All the fields are required",
      });
    }

    // check if the password and confirm password both matches
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm Password does not match",
      });
    }
    // check User alredy exist or not?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // generate JWT
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;

        // return response
        res.status(200).json({
          success: true,
          token,
          user,
          message: "User registered successfully",
        });
      }
    );
    // return response
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

// Login Controller for user
exports.login = async (req, res) => {
  try {
    // get email and password from req body
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please Fill up All the Required Fields",
      });
    }
    // find user with provided email
    const user = await User.findOne({ email });

    // Debug: Print the user object
    console.log("User found:", user);

    // if user not found with provided email
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User is not Registered with Us. Please Sign Up to Continue",
      });
    }

    // Debug: Check stored password hash
    console.log("Stored password hash:", user.password);

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    // Generate Jwt token
    const payload = { user: { id: user.id, email: user.email } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Return success response
    res.status(200).json({
      success: true,
      token,
      user,
      message: "User Login Success",
    });
    // return success response
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure Please Try Again",
    });
  }
};
