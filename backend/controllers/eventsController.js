const { myEventsConnection } = require('../db'); // importe la connexion à la base de donnée

// controller pour création d'évènement
async function createEvent(req, res) {

    try {

        // récupère les données du formulaire CreateEventForm depuis req.body
        const { 
            eventTitle, 
            eventDate, 
            eventLocation 
        } = req.body;
        // obtient le nom de fichier de l'image
        const eventCoverImage = req.file.filename;

        // insère les données dans la base de données
        const insertQuery = `
            INSERT INTO evenements (titre, date, lieu, image_source, image_alt)
            VALUES(?, ?, ?, ?, ?)
        `;

        const values = [
            eventTitle, 
            eventDate, 
            eventLocation, 
            eventCoverImage
        ];

        myEventsConnection.query(insertQuery, values, (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'insertion des données de l\'évènement: ', err);
                return res.status(500).json({ error:'Erreur lors de la création de l\'événement' });
            }

            console.log('Événement créé avec succès:', results);
            // renvoie une réponse en cas de succès
            res.status(201).json({ message: 'Événement créé avec succès' });
        });

    } catch (error) {
        console.error('Une erreur s\'est produite:', error);
        res.status(500).json({ message: 'Une erreur s\'est produite' });
    };

};

module.exports = createEvent;