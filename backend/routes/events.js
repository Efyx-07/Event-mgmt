const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const multer = require('multer'); // importe multer
const path = require('path');

// définit le chemin du dossier de destination des fichiers
const destinationPath = path.join(__dirname, '..', 'assets', 'events-covers');

// configure le dossier de destination et le nom de fichier
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationPath); // répertoire de destination
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // génère un suffixe unique
      cb(null, uniqueSuffix + '.jpeg'); // nom du fichier avec extension JPEG
    },
  });

// configure le dossier de destination pour les fichiers téléchargés
const upload = multer({ storage: storage });

// route pour la création d'évèvenement
router.post('/create', upload.single('eventCoverImage'),eventsController.createEvent);

// route pour la récupération de tous les évènements
router.get('/', eventsController.getAllEvents)

module.exports = router;