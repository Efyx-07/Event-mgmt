const jwt = require('jsonwebtoken'); // importe jwt
require('dotenv').config(); // charge les variables d'environnement à partir du fichier .env

// clé secrète pour signer et valider les jetons et durée de validité du jeton
const secretKey = process.env.AUTH_SECRETKEY;
const expiresIn = '1h';

// middleware authenticateToken pour vérifier authentification
function authenticateToken(req, res, next) {
    const autHeader = req.headers['authorization'];

    if (!autHeader || !autHeader.startsWith('Bearer')) {
        return res.status(401).json({ error: 'Token manquant ou invalide' });
    };

    const token = autHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token invalide.' });
        }
        req.admin = decoded.adminId;
        next();
    });
};

// fonction qui génère un token JWT avec l'id de l'administrateur et la clé secrète
function generateJwtToken(adminId) {
    const token = jwt.sign({ adminId }, secretKey, { expiresIn });
    return token;
};

module.exports.generateJwtToken = generateJwtToken;
module.exports.authenticateToken = authenticateToken;