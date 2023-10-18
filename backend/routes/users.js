const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/:eventSlug/register', usersController.registerUser);

module.exports = router;