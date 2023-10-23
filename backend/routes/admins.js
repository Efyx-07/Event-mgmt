const express = require('express');
const router = express.Router();
const adminsController = require('../controllers/adminsController');
// const authenticate = require('../auth/authenticate');

// route pour la création d'un administrateur
router.post('/register', adminsController.registerAdmin);

// route pour la création d'un administrateur
router.post('/login', adminsController.loginAdmin);

// route pour la mise à jour du mot de passe d'un administrateur
// router.put('/update', authenticate.authenticateToken, adminsController.updateAdmin);

// route pour la suppression d'un administrateur
router.post('/:adminId', adminsController.deleteAdmin);

// route pour la récupération de tous les administrateurs
router.get('/', adminsController.getAllAdmins);

module.exports = router;