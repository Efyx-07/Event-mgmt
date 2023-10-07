const { myEventsConnection } = require('../db'); // importe la connexion à la base de donnée

// controller pour inscription utilisateur
async function createEvent(req, res) {

    // récupère les données du formulaire de création d'évènements depuis req.body
    const { 
        eventTitle,
        eventLocation,
    } = req.body;

    console.log('Données reçues depuis le formulaire :', eventTitle, eventLocation);

    try {

        // insert les données dans la base de données 'myevents'
        const insertQuery = 'INSERT INTO evenements (titre, lieu) VALUES (?, ?)';
        const values = [
            eventTitle,
            eventLocation
        ]; 

        console.log('Requête SQL d\'insertion :', insertQuery, values);

        if (!myEventsConnection) {
            console.error('La connexion à la base de données est indéfinie.');
            res.status(500).json({ error: 'Erreur lors de la connexion à la base de données' });
            return;
        }

        myEventsConnection.query(insertQuery, values, (err, results) => {
            if (err) {
                console.error('Erreur lors de l\inscription: ', err);
                res.status(500).json({ error: 'Erreur lors de l\inscription' });
                return;
            }

            // utilisateur inscrit avec succés
            console.log('Événement créé avec succès:', results);
            res.status(201).json({ message: 'Inscription reussie'});
        });

    } catch (err) {
        console.error('Erreur lors de l\inscription: ', err);
        res.status(500).json({ error: 'Erreur lors de l\inscription' });
    };
};

module.exports = { createEvent };