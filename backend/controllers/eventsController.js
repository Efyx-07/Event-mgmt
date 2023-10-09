const { myEventsConnection } = require('../db'); // importe la connexion à la base de donnée

// controller pour inscription utilisateur
async function createEvent(req, res) {

  try {

    // récupère les données du formulaire avec req.body
    const eventTitle = req.body.eventTitle;
    const eventLocation = req.body.eventLocation;
    const eventDate = req.body.eventDate;
    const eventCoverImage = req.file; 

    console.log('les données recupérées sont: ', eventTitle, eventLocation, eventDate, eventCoverImage)

  } catch (error) {

  }
    
};

module.exports = { createEvent };