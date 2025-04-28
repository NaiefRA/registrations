const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { password, username, email, admin } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Input all values" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      admin: admin || false,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Input all values" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    if (correctPassword) {
      return res
        .status(200)
        .json({
          username: user.username,
          email: user.email,
          admin: user.admin,
        });
    }
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/admin", async (req, res) => {
  console.log("got req");
  try {
    const userList = await User.find({});
    res.status(200).json(userList);
  } catch (err) {
    res.status(400).json({ message: "Error in fetching users" });
  }
});

module.exports = router;
