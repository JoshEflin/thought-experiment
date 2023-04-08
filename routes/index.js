const router = require('express').Router();
const { User, Thought } = require('../models');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;
