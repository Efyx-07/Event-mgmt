const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// route pour l'inscription d'un participant à un évènement selectionné
router.post('/:eventSlug/register', usersController.registerUser);

// route pour récupérer la liste des participants d'un évènement selectionné
router.get('/:eventSlug/participants', usersController.getUsersByEvent);

module.exports = router;