const { myEventsConnection } = require('../db'); // importe la connexion à la base de donnée

// controller pour inscription utilisateur
async function createEvent(req, res) {

  // récupère les données du formulaire 
  const eventTitle = req.body.eventTitle;
  const eventDate = req.body.eventDate;
  const eventLocation = req.body.eventLocation;
  const eventCoverImage = req.file; 

  console.log('les données recupérées sont: ', eventTitle, eventDate, eventLocation, eventCoverImage)

  // crée et formate la legende alt pour l'image de couverture
  const eventCoverImageAlt = eventTitle.toLowerCase();
  console.log(eventCoverImageAlt)

  try {

    // insert les données dans la bdd myevents
    const insertQuery = 'INSERT INTO evenements (titre, date, lieu, image_source, image_alt) VALUES(?, ?, ?, ?, ?)';

    const values = [
      eventTitle,
      eventDate,
      eventLocation,
      eventCoverImage.path,
      eventCoverImageAlt,
    ];

    myEventsConnection.query(insertQuery, values, (err, results) => {

      if(err) {
        console.error('Erreur lors de la création d\'évènement: ', err);
        res.status(500).json({ error:'Erreur lors de la création d\'évènement' });
      };

      // évènement créé avec succès 
      res.status(201).json({ message: 'Evènement créé avec succès'});

    });


  } catch (err) {
      console.error('Erreur lors de la création d\'évènement: ', err);
      res.status(500).json({ error:'Erreur lors de la création d\'évènement' });
  };
    
};

module.exports = { createEvent };