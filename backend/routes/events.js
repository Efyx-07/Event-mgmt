const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const multer = require('multer'); // importe multer

// configure le dossier de destination pour les fichiers téléchargés
const upload = multer({ dest: '../assets/events-covers' });

router.post('/create', upload.single('eventCoverImage'),eventsController.createEvent);

module.exports = router;