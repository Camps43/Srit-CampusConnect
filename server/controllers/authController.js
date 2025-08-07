const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // <-- Add this if not already added

const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const ClubHead = require("../models/ClubHead");
const Admin = require("../models/Admin");

const getModelByRole = (role) => {
  switch (role) {
    case "student":
      return Student;
    case "faculty":
      return Faculty;
    case "clubhead":
      return ClubHead;
    case "admin":
      return Admin;
    default:
      throw new Error("Invalid role");
  }
};

// ✅ REGISTER FUNCTION
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const Model = getModelByRole(role);
  try {
    const existingUser = await Model.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Model({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// ✅ LOGIN FUNCTION (This is point 4)
exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  const Model = getModelByRole(role);
  try {
    const user = await Model.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role }, "your_jwt_secret", {
      expiresIn: "1d",
    });

    res.status(200).json({ token, role, name: user.name });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
