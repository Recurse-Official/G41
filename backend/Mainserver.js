import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.js'; // User model
import Transaction from './models/Transaction.js'; // Correct import for Transaction model

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/Database3'; // Replace with your MongoDB URI

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || password.length < 8) {
    return res.status(400).json({ message: 'Invalid input. Please fill all fields correctly.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists. Please log in.' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    return res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please sign up first.' });
    }

    if (user.password !== password) { // In a real-world app, use hashing like bcrypt
      return res.status(401).json({ message: 'Incorrect password. Please try again.' });
    }

    return res.status(200).json({ message: 'Login successful!', userId: user._id });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
});

// Fetch transaction history route
app.get('/history', async (req, res) => {
  try {
    const transactions = await Transaction.find(); // Get all transactions from the database
    res.status(200).json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
