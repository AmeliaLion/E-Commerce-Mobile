const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Assuming you have an Order model

// Fetch orders by user ID
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId });
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;