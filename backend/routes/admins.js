const express = require('express');
const router = express.Router();
const adminsController = require('../controllers/adminsController');
//const authenticate = require('../auth/authenticate');

router.post('/register', adminsController.registerAdmin);
router.post('/login', adminsController.loginAdmin);
// router.put('/update', authenticate.authenticateToken, adminsController.updateAdmin);
// router.post('/delete', authenticate.authenticateToken, adminsController.deleteAdmin);

module.exports = router;