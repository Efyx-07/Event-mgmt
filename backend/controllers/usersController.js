const { myEventsConnection } = require('../db'); // importe la connexion à la base de donnée

// controller pour l'inscription d'un participant
async function registerUser(req, res) {

    // récupère les données du formulaire d'inscription depuis req.body
    const {
        entrepriseOrganisation,
        nom, 
        prenom,
        telephone,
        email
    } = req.body;

    // récupère l'id de l'evenement à partir de l'URL

    // effectue les mêmes vérifications de champs côté serveur
    const companyNameRegex = /^[a-zA-Z0-9\s\.,'-]*$/;
    const nameRegex = /^[\p{L}\sçÇ'-]+$/u;
    const phoneFrenchNumbersRegex = /^(?!0[013]).{10}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!companyNameRegex.test(entrepriseOrganisation) ||
        !nameRegex.test(nom) ||
        !nameRegex.test(prenom) ||
        !phoneFrenchNumbersRegex.test(telephone) ||
        !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Champs invalides' });
    };

    try {

        // insère les données dans la base de données myevents table participants
        const insertQuery = 'INSERT INTO participants (nom_entreprise, nom, prenom, email, telephone) VALUES (?, ?, ?, ?, ?)';
        const values = [
            entrepriseOrganisation,
            nom,
            prenom,
            email,
            telephone
        ];

        myEventsConnection.query(insertQuery, values, (err, results) => {

            if (err) {
                console.error('Erreur lors de l\inscription: ', err);
                res.status(500).json({ error: 'Erreur lors de l\inscription' });
                return;
            }

            // utilisateur inscrit avec succés
            res.status(201).json({ message: 'Inscription reussie'});
        });

    } catch (err) {

        console.error('Erreur lors de l\inscription: ', err);
        res.status(500).json({ error: 'Erreur lors de l\inscription' });

    };

};

module.exports = { registerUser };