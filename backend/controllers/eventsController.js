const { myEventsConnection } = require('../db'); // importe la connexion à la base de donnée
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // importe uuid pour générer un id unique
const fs = require('fs');

// fonction pour générer un slug (chaque évènement aura une URL constitué de son nom reformaté et d'un id unique)
function generateUniqueSlug(title) {
  const lowercaseTitle = title.toLowerCase();
  // remplace les espaces par des underscores
  const slug = lowercaseTitle.replace(/\s+/g, '_');
  // supprime les caractères non alphanumériques (y compris les points d'interrogation)
  const cleanedSlug = slug.replace(/[^a-zA-Z0-9_]/g, '');
  // génère un identifiant unique au format uuid
  const uniqueId = uuidv4(); 
  return `${cleanedSlug}_${uniqueId}`;
};

// controller pour création d'un évènement
async function createEvent(req, res) {

  // récupère les données du formulaire 
  const eventTitle = req.body.eventTitle;
  const eventCoverImage = req.files['eventCoverImage'][0];
  const eventDate = req.body.eventDate;
  const eventLocation = req.body.eventLocation;
  const eventPresentation = req.body.eventPresentation;
  const eventProgramme = req.body.eventProgramme;
  const eventPracticalInformations = req.body.eventPracticalInformations;
  const eventOrganizerName = req.body.eventOrganizerName;
  const eventOrganizerLogo = req.files['eventOrganizerLogo'][0];
  const eventOrganizerWebsite = req.body.eventOrganizerWebsite;
 
  // génère le slug pour l'évènement
  const eventSlug = generateUniqueSlug(eventTitle);

  // crée et formate la legende alt pour l'image de couverture
  const eventCoverImageAlt = eventTitle.toLowerCase();

  // crée et formate la légende alt pour le logo de l'organisateur
  const eventOrganizerLogoAlt = eventOrganizerName.toLowerCase();

  // obtient le chemin relatif de l'image de couverture et du logo de l'organisateur
  const eventCoverImageRelativePath = path.relative(__dirname, eventCoverImage.path).replace(/\\/g, '/');
  const eventOrganizerLogoRelativePath = path.relative(__dirname, eventOrganizerLogo.path).replace(/\\/g, '/');

  try {

    // insert les données dans la bdd myevents table evenements
    const insertQuery = 'INSERT INTO evenements (titre, date, lieu, image_source, image_alt, presentation, programme, infos_pratiques, nom_client, logo_client_source, logo_client_alt, site_client, slug) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const values = [
      eventTitle,
      eventDate,
      eventLocation,
      eventCoverImageRelativePath,
      eventCoverImageAlt,
      eventPresentation,
      eventProgramme,
      eventPracticalInformations,
      eventOrganizerName,
      eventOrganizerLogoRelativePath,
      eventOrganizerLogoAlt,
      eventOrganizerWebsite, 
      eventSlug
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

// controller pour suppression d'un événement et fichier image associé
async function removeEvent(req, res) {
  // récupère l'ID de l'événement à supprimer
  const eventId = req.params.eventId;

  try {
    // supprime les participants associés à l'événement
    const deleteParticipantsQuery = 'DELETE FROM participants_evenements WHERE evenement_id = ?';
    myEventsConnection.query(deleteParticipantsQuery, [eventId], (err) => {
      if (err) {
        console.error('Erreur lors de la suppression des participants associés :', err);
        res.status(500).json({ error: 'Erreur lors de la suppression des participants associés' });
        return;
      }

      // récupère l'information sur l'événement pour obtenir le chemin de l'image à supprimer
      const query = 'SELECT image_source, logo_client_source FROM evenements WHERE id = ?';
      myEventsConnection.query(query, [eventId], (err, results) => {
        if (err) {
          console.error('Erreur lors de la récupération de l\'image de l\'événement :', err);
          res.status(500).json({ error: 'Erreur lors de la récupération de l\'image de l\'événement' });
          return;
        }

        // supprime l'entrée de la base de données pour l'événement
        const deleteQuery = 'DELETE FROM evenements WHERE id = ?';
        myEventsConnection.query(deleteQuery, [eventId], (err) => {
          if (err) {
            console.error('Erreur lors de la suppression de l\'événement :', err);
            res.status(500).json({ error: 'Erreur lors de la suppression de l\'événement' });
            return;
          }

          // supprime le fichier image de couverture
          const coverImagePath = results[0].image_source;
          const absoluteCoverImagePath = path.join(__dirname, coverImagePath);
          fs.unlink(absoluteCoverImagePath, (err) => {
            if (err) {
              console.error('Erreur lors de la suppression de l\'image de couverture :', err);
            }
          });

          // supprime le fichier logo de l'organisateur
          const organizerLogoPath = results[0].logo_client_source;
          const absoluteorganizerLogoPath = path.join(__dirname, organizerLogoPath);
          fs.unlink(absoluteorganizerLogoPath, (err) => {
            if (err) {
              console.error('Erreur lors de la suppression du logo de l\organisateur :', err);
            }
          })

          res.status(200).json({ message: 'Événement, image et participants associés supprimés avec succès' });
        });
      });
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement :', err);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'événement' });
  }
};

// controller pour la modification d'un évènement
async function updateEvent(req, res) {
};

// controller pour recupération de tous les évènements
async function getAllEvents(req, res) {

  // requête sql pour obtenir tous les évènements
  const eventsQuery = 'SELECT * FROM evenements';

  // execute la requête pour les évènements
  myEventsConnection.query(eventsQuery, (err, eventsResults) => {
    
    if (err) {
      console.error('Erreur lors de la récupération des évènements: ', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des évènements' });
      return;
    };

    // formate les résultats en un objet JSON contenant les évènements 
    const events = eventsResults;
    const formattedData = formatData(events);
    // renvoie les résultats au format JSON en réponse
    res.json({ events: formattedData});

  });

};

// fonction de formatage pour transformer les données brutes en un objet JSON 
function formatData(events) {
  const formattedEvents = events.map(evenement => ({
    id: evenement.id,
    title: evenement.titre,
    date: evenement.date,
    location: evenement.lieu,
    image: {
      source: `/assets/events-covers/${path.basename(evenement.image_source)}`, 
      alt: evenement.image_alt
    },
    presentation: evenement.presentation,
    programme: evenement.programme,
    practicalInformations: evenement.infos_pratiques,
    organizerName: evenement.nom_client,
    organizerLogo: {
      source: `/assets/events-covers/${path.basename(evenement.logo_client_source)}`,
      alt: evenement.logo_client_alt,
    },
    organizerWebsite: evenement.site_client,
    creationDate: evenement.date_creation,
    slug: evenement.slug
  }));

  return formattedEvents;
};

module.exports = { createEvent, removeEvent, updateEvent, getAllEvents };