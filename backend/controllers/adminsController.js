const { myEventsConnection } = require('../db'); // importe la connexion à la base de donnée
const bcrypt = require('bcrypt'); // importe bcrypt 
//const util = require('util'); // importe util
//const authenticate = require('../auth/authenticate');

// controller pour inscrire un nouvel administrateur
async function registerAdmin(req, res) {

    // récupère les données du formulaire d'inscription depuis req.body
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;

    // effectue les mêmes validations côté serveur que côté client
    const nameTypeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/;
    const emailRegex = /^[a-z0-9.-]+@[a-z0-9._-]{2,}\.[a-z]{2,8}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*]).{8,}$/;

    if (
        !nameTypeRegex.test(firstName) ||
        !nameTypeRegex.test(lastName) ||
        !emailRegex.test(email) ||
        !passwordRegex.test(password)
    ) {
        return res.status(400).json({ error: 'Champs invalides' });
    };

    // vérifie si l'administrateur existe déjà avant d'insérer les données
    const checkAdminQuery = 'SELECT COUNT(*) as count FROM administrateurs WHERE email = ?';
    myEventsConnection.query(checkAdminQuery, [email], async (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'administrateur existant : ', err);
            res.status(500).json({ error: 'Erreur lors de la vérification de l\'administrateur existant' });
            return;
        }

        if (results[0].count > 0) {
            // si un administrateur avec cet email existe déjà, envoie une réponse d'erreur
            res.status(409).json({ error: 'Cet administrateur existe déjà' });
        } else {

            try {
        
                // utilise bcrypt pour hacher le mot de passe
                const hashedPassword = await hashPassword(password);
        
                // insère les données dans la table "administrateurs" avec le mot de passe haché
                const insertQuery = 'INSERT INTO administrateurs (nom, prenom, email, hashed_password) VALUES (?, ?, ?, ?)';
        
                const values = [
                    firstName,
                    lastName,
                    email,
                    hashedPassword
                ];
        
                myEventsConnection.query(insertQuery, values, (err, results) => {
        
                    if(err) {
                        console.error('Erreur lors de l\'inscription du nouvel administrateur: ', err);
                        res.status(500).json({ error: 'Erreur lors de l\'inscription du nouvel administrateur'});
                        return
                    }
        
                    // nouvel administrateur inscrit avec succès
                    res.status(201).json({ message: 'Administrateur inscrit avec succès' });
                });
        
            } catch (err) {
                console.error('Erreur lors de l\'inscription du nouvel administrateur: ', err);
                res.status(500).json({ error: 'Erreur lors de l\'inscription du nouvel administrateur'});
            };
        }
    });
};

async function loginAdmin(req, res) {

};

async function updateAdmin(req, res) {

};

async function deleteAdmin(req, res) {

};

// permet de hacher le mot de passe avec bcrypt
async function hashPassword(password) {

    try {

        // génère le sel
        const salt = await bcrypt.genSalt(10); 
        // hachage du mot de passe avec le sel
        const hash = await bcrypt.hash(password, salt);
        return hash;

    } catch (err) {
        throw err;
    };
};

module.exports = {
    registerAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin
};