require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./schema"); 
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Error connecting to database:", err));

// Define API Route
app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.validate(); // Validate before saving
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
