const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email doesn't exist" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Password is incorrect" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req,res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
      return res.status(404).json({message:"User not found or AllReady Deleted"});
    }
    res.status(200).json({message: `user ${user} successfully deleted !`});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.get("/profile", (req, res) => {
  // code to retrieve a user profile goes here
});

module.exports = router;
