const { myEventsConnection } = require('../db'); // importe la connexion à la base de donnée

// controller pour inscription utilisateur
async function createEvent(req, res) {

    // récupère les données du formulaire de création d'évènements depuis req.body
    const { 
        eventTitle,
        eventLocation,
        eventDate,
    } = req.body;

    console.log('Données reçues depuis le formulaire :', eventTitle, eventLocation, eventDate);

    try {

        // insert les données dans la base de données 'myevents'
        const insertQuery = 'INSERT INTO evenements (titre, lieu, date) VALUES (?, ?, ?)';
        const values = [
            eventTitle,
            eventLocation,
            eventDate
        ]; 

        console.log('Requête SQL d\'insertion :', insertQuery, values);

        myEventsConnection.query(insertQuery, values, (err, results) => {
            if (err) {
                console.error('Erreur lors de la création d\'évènement: ', err);
                res.status(500).json({ error: 'Erreur lors de la création d\'évènement' });
                return;
            }

            // utilisateur inscrit avec succés
            console.log('Événement créé avec succès:', results);
            res.status(201).json({ message: 'Événement créé avec succès'});
        });

    } catch (err) {
        console.error('Erreur lors de la création d\'évènement: ', err);
        res.status(500).json({ error: 'Erreur lors de la création d\'évènement' });
    };
};

module.exports = { createEvent };