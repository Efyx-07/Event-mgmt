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

// controller pour recupération de tous les évènements
async function getAllEvents(req, res) {

  // requête sql pour obtenir tous les évènements
  const eventsQuery = 'SELECT * FROM evenements';

  // execute la requête pour les évènements
  myEventsConnection.query(eventsQuery, (err, eventsResults) => {
    if (err) {
      console.error('Erreur lors de la récupération des évènements: ', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des évènements'});
      return;
    };

    // formate les résultats en un objet JSON contenant les évènements 
    const events = eventsResults;
    const formattedData = formatData(events);
    // renvoie les résultats au format JSON en réponse
    res.json({ events: formattedData});

  });

};

function formatData(events) {
  const formattedEvents = events.map(evenement => ({
    title: evenement.titre,
    date: evenement.date,
    location: evenement.lieu,
    image: {
      source: evenement.image_source,
      alt: evenement.image_alt
    },
  }));

  return formattedEvents;
}; 

module.exports = { createEvent, getAllEvents };