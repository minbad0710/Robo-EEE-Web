const express = require('express');
const mongoose = require('mongoose');
const teamMemberRoutes = require('./teamMember.route');

const router = express.Router();

// Quick check that the server is up and still connected to MongoDB
router.get('/health', (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

router.use('/team-members', teamMemberRoutes);

module.exports = router;
