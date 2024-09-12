require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact'); // Add this line
const orderRoutes = require('./routes/orders'); // Add this line

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection with error handling
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
  origin: 'http://192.168.0.215:19000' // Replace with your frontend URL
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes); // Add this line
app.use('/api/orders', orderRoutes); // Add this line

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));