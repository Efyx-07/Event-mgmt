const { myEventsConnection } = require('../db'); // importe la connexion à la base de donnée
const bcrypt = require('bcrypt'); // importe bcrypt 
const util = require('util'); // importe util
const authenticate = require('../auth/authenticate');

// controller pour inscrire un nouvel administrateur
async function registerAdmin(req, res) {

    // récupère les données du formulaire d'inscription depuis req.body
    const {
        lastName,
        firstName,
        email,
        password
    } = req.body;

    // effectue les mêmes validations côté serveur que côté client
    const nameTypeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/;
    const emailRegex = /^[a-z0-9.-]+@[a-z0-9._-]{2,}\.[a-z]{2,8}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*]).{8,}$/;

    if (
        !nameTypeRegex.test(lastName) ||
        !nameTypeRegex.test(firstName) ||
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
                    lastName,
                    firstName,
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
                     const newAdminId = results.insertId; // récupère l'ID du nouvel administrateur

                     // execute une requête pour obtenir les données du nouvel administrateur
                     const selectQuery = 'SELECT * FROM administrateurs WHERE id = ?';
                     myEventsConnection.query(selectQuery, [newAdminId], (err, adminResults) => {
                         if (err) {
                             console.error('Erreur lors de la récupération des données du nouvel administrateur : ', err);
                             res.status(500).json({ error: 'Erreur lors de la récupération des données du nouvel administrateur' });
                             return;
                         }
                         const newAdmin = adminResults[0];
                         // renvoie un message de succés et les données du nouvel administrateur
                         res.status(201).json({ message: 'Administrateur inscrit avec succès', admin: newAdmin });
                     });
                });
        
            } catch (err) {
                console.error('Erreur lors de l\'inscription du nouvel administrateur: ', err);
                res.status(500).json({ error: 'Erreur lors de l\'inscription du nouvel administrateur'});
            };
        }
    });
};

// controller pour la connexion d'un administrateur
async function loginAdmin(req, res) {

    // récupère les données du formulaire de connexion depuis req.body
    const { email, password } = req.body;

    try {

        // effectue une requête dans la table 'administrateurs' pour vérifier l'email
        const selectQuery = 'SELECT * FROM administrateurs WHERE email = ?';

        // convertit la fonction query de mysql2 en promise avec util
        const query = util.promisify(myEventsConnection.query).bind(myEventsConnection);

        const rows = await query(selectQuery, [email]);

        // si aucun administrateur n'est trouvé avec l'email, envoie un message d'erreur
        if (rows.length === 0) {
            res.status(401).json({ error: 'Identifiant invalide' });
            return;
        }

        // compare le mot de passe renseigné avec le mot de passe haché
        const hashedPassword = rows[0].hashed_password;
        const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

        // si aucune correspondance entre les mots de passe, envoie un message d'erreur
        if (!isPasswordMatch) {
            res.status(401).json({ error: 'Identifiant invalide' });
            return;
        }

        // génère un token et le renvoie à l'utilisateur
        const token = authenticate.generateJwtToken(rows[0].id);
        res.status(200).json({
            success: true,
            message: 'Connexion réussie',
            token: token, 
            admin: {
                id: rows[0].id,
                lastName: rows[0].nom,
                firstName: rows[0].prenom,
                email: rows[0].email,
            }
        });

    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};

// controller pour mofifier le mot de passe d'un administrateur
async function updateAdminPassword(req, res) {

    // récupère les nouvelles informations à partir de req.body
    const {
        adminId,
        adminCurrentPassword,
        adminNewPassword
    } = req.body;

    try {
        
        // valide les données
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*]).{8,}$/;
        if(!passwordRegex.test(adminNewPassword)) {
            return res.status(400).json({ error: 'Nouveau mot de passe invalide' });
        }

        // récupère l'administrateur de la base de données à partir de son ID
        const selectQuery = 'SELECT * FROM administrateurs WHERE id = ?';
        const adminQuery = util.promisify(myEventsConnection.query).bind(myEventsConnection);
        const rows = await adminQuery(selectQuery, [adminId]);

        // vérifie si l'administrateur existe
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Administrateur non trouvé' });
        }

        // vérifie la correspondance du mot de passe actuel
        const hashedPassword = rows[0].hashed_password;
        const isPasswordMatch = await bcrypt.compare(adminCurrentPassword, hashedPassword);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
        }

        // hache le nouveau mot de passe
        const hashedNewPassword = await hashPassword(adminNewPassword);

        // met à jour le mot de passe dans la base de données
        const updateQuery = 'UPDATE administrateurs SET hashed_password = ? WHERE id = ?';
        const updateValues = [hashedNewPassword, adminId];
        await adminQuery(updateQuery, updateValues);

        res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });

    } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du mot de passe' });
    }
};

// controller pour supprimer un administrateur
async function deleteAdmin(req, res) {

    // récupère l'ID de l'administrateur à supprimer
    const adminId = parseInt(req.params.adminId);

    // vérifie que l'ID est valide
    if (isNaN(adminId) || adminId <= 0) {
        return res.status(400).json({ error: 'ID d\'administrateur non valide' });
    }

    try {

        // permet la réaffectation des données d'un évènement à un administrateur générique
        const adminGeneriqueID = 1; 
        const updateQuery = 'UPDATE evenements SET administrateur_id = ? WHERE administrateur_id = ?';

        myEventsConnection.query(updateQuery, [adminGeneriqueID, adminId], (err) => {
            if (err) {
                console.error('Erreur lors de la mise à jour des événements :', err);
                res.status(500).json({ error: 'Erreur lors de la suppression de l\'administrateur' });
                return;
            }

            // supprime l'entrée de la base de données pour l'administrateur
            const deleteQuery = 'DELETE FROM administrateurs WHERE id = ?';
            myEventsConnection.query(deleteQuery, [adminId], (err) => {
                if (err) {
                    console.error('Erreur lors de la suppression de l\'administrateur :', err);
                    res.status(500).json({ error: 'Erreur lors de la suppression de l\'administrateur' });
                    return;
                }

                res.status(200).json({ message: 'Administrateur supprimé avec succès' });
            });
        });       

    } catch (error) {
        console.error('Erreur lors de la suppression de l\'administrateur :', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'administrateur' });
    }

};

// controller pour la récupération de tous les administrateurs
async function getAllAdmins(req, res) {

    // requête sql pour obtenir tous les administrateurs
    const adminsQuery = 'SELECT * FROM administrateurs'; 
    
    // éxécute la requête pour les administrateurs
    myEventsConnection.query(adminsQuery, (err, adminsResults) => {

        if (err) {
            console.error('Erreur lors de la récupération des administrateurs: ', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des administrateurs' });
            return;
        };

        // formate les résultats en un objet JSON contenant les administrateurs
        const admins = adminsResults;
        const formattedAdminsData = formatAdminsData(admins);
        // renvoie les résultats au format JSON en réponse
        res.json({ admins: formattedAdminsData });

    });
};

// fonction de formatage pour transformer les données brutes en un objet JSON 
function formatAdminsData(admins) {
    const formattedAdmins = admins.map(administrateur => ({
        id: administrateur.id,
        nom: administrateur.nom,
        prenom: administrateur.prenom,
        email: administrateur.email,
    }));

    return formattedAdmins;
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
    updateAdminPassword,
    deleteAdmin,
    getAllAdmins
};