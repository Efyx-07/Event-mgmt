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
  const eventLocationGoogleMapsUrl = req.body.eventLocationGoogleMapsUrl;
  const eventPresentation = req.body.eventPresentation;
  const eventProgramme = req.body.eventProgramme;
  const eventPracticalInformations = req.body.eventPracticalInformations;
  const eventOrganizerName = req.body.eventOrganizerName;
  const eventOrganizerLogo = req.files['eventOrganizerLogo'][0];
  const eventOrganizerWebsite = req.body.eventOrganizerWebsite;
  const adminId = req.body.adminId;

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
    const insertQuery = 'INSERT INTO evenements (titre, date, lieu, lieu_googlemaps_url, image_source, image_alt, presentation, programme, infos_pratiques, nom_client, logo_client_source, logo_client_alt, site_client, slug, administrateur_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const values = [
      eventTitle,
      eventDate,
      eventLocation,
      eventLocationGoogleMapsUrl,
      eventCoverImageRelativePath,
      eventCoverImageAlt,
      eventPresentation,
      eventProgramme,
      eventPracticalInformations,
      eventOrganizerName,
      eventOrganizerLogoRelativePath,
      eventOrganizerLogoAlt,
      eventOrganizerWebsite, 
      eventSlug,
      adminId
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

// controller pour la modification d'un événement
async function updateEvent(req, res) {
  // id de l'événement à mettre à jour
  const eventId = req.params.eventId;

  // récupère les données textuelles mises à jour du formulaire
  const updatedData = {
    eventTitle: req.body.newEventTitle,
    eventDate: req.body.newEventDate,
    eventLocation: req.body.newEventLocation,
    eventLocationGoogleMapsUrl: req.body.newEventLocationGoogleMapsUrl,
    eventPresentation: req.body.newEventPresentation,
    eventProgramme: req.body.newEventProgramme,
    eventPracticalInformations: req.body.newEventPracticalInformations,
    eventOrganizerName: req.body.newEventOrganizerName,
    eventOrganizerWebsite: req.body.newEventOrganizerWebsite,
  };

  // modifie le slug pour l'évènement en cas de modification de titre
  const eventSlug = generateUniqueSlug(updatedData.eventTitle);

  // modifie la legende alt pour l'image de couverture en cas de modification de titre
  const eventCoverImageAlt = updatedData.eventTitle.toLowerCase();

  // modifie la légende alt pour le logo de l'organisateur en cas de modification du nom de l'organisateur
  const eventOrganizerLogoAlt = updatedData.eventOrganizerName.toLowerCase();

  let updateEventCover = false; // Indicateur pour vérifier si la couverture doit être mise à jour

  if (req.files['newEventCoverImage'] && req.files['newEventCoverImage'][0]) {
    updateEventCover = true;
  }

  try {
    const updateTextDataQuery = 'UPDATE evenements SET titre=?, date=?, lieu=?, lieu_googlemaps_url=?, image_alt=?, presentation=?, programme=?, infos_pratiques=?, nom_client=?, logo_client_alt=?, site_client=?, slug=? WHERE id=?';

    const textDataValues = [
      updatedData.eventTitle,
      updatedData.eventDate,
      updatedData.eventLocation,
      updatedData.eventLocationGoogleMapsUrl,
      eventCoverImageAlt,
      updatedData.eventPresentation,
      updatedData.eventProgramme,
      updatedData.eventPracticalInformations,
      updatedData.eventOrganizerName,
      eventOrganizerLogoAlt,
      updatedData.eventOrganizerWebsite,
      eventSlug,
      eventId
    ];

    // éxécute la requête pour la mise à jour des données textuelles
    myEventsConnection.query(updateTextDataQuery, textDataValues, (err, results) => {
      if (err) {
        console.error('Erreur lors de la mise à jour des données textuelles :', err);
        return res.status(500).json({ error: 'Erreur lors de la mise à jour des données textuelles' });
      }

      if (updateEventCover) {
        // Si l'image de couverture est mise à jour, appeler la fonction pour mettre à jour l'image de couverture
        updateEventCoverImage(req, eventId, updatedData, res);
      } else {
        // Appeler la fonction pour mettre à jour le logo de l'organisateur, que l'image de couverture soit mise à jour ou non
        updateOrganizerLogo(req, eventId, updatedData, res);
      }
    });
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour des données textuelles' });
  }
}

// fonction pour mettre à jour l'image de couverture
function updateEventCoverImage(req, eventId, updatedData, res) {
  const eventCoverImage = req.files['newEventCoverImage'][0];
  // crée le chemin relatif pour la nouvelle image de couverture
  updatedData.eventCoverImageRelativePath = path.relative(__dirname, eventCoverImage.path).replace(/\\/g, '/');

  // récupére le chemin de l'ancienne image de couverture depuis la base de données
  myEventsConnection.query('SELECT image_source FROM evenements WHERE id = ?', [eventId], (err, imageResults) => {
    if (err) {
      console.error('Erreur lors de la récupération du chemin de l\'ancienne image :', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération du chemin de l\'ancienne image' });
    }

    const oldEventCoverImagePath = imageResults[0].image_source;
    const absoluteOldEventCoverImagePath = path.join(__dirname, oldEventCoverImagePath);

    // supprime l'ancienne image de couverture de son dossier de stockage
    if (fs.existsSync(absoluteOldEventCoverImagePath)) {
      fs.unlink(absoluteOldEventCoverImagePath, (err) => {
        if (err) {
          console.error('Erreur lors de la suppression de l\'ancienne image de couverture :', err);
        } else {
          // met à jour l'image de couverture dans la base de données
          const updateImageQuery = 'UPDATE evenements SET image_source=? WHERE id = ?';
          const imageValues = [
            updatedData.eventCoverImageRelativePath,
            eventId,
          ];

          // éxécute la requête pour la mise à jour de l'image de couverture
          myEventsConnection.query(updateImageQuery, imageValues, (err, imageUpdateResults) => {
            if (err) {
              console.error('Erreur lors de la mise à jour de l\'image de couverture dans la base de données :', err);
              return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'image de couverture dans la base de données' });
            }

            // appelle la fonction pour mettre à jour le logo de l'organisateur
            updateOrganizerLogo(req, eventId, updatedData, res);
          });
        }
      });
    } else {
      // si le fichier image n'existe pas, met à jour directement la base de données
      const updateImageQuery = 'UPDATE evenements SET image_source=? WHERE id = ?';
      const imageValues = [
        updatedData.eventCoverImageRelativePath,
        eventId,
      ];

      // éxécute la requête pour la mise à jour de l'image de couverture
      myEventsConnection.query(updateImageQuery, imageValues, (err, imageUpdateResults) => {
        if (err) {
          console.error('Erreur lors de la mise à jour de l\'image de couverture dans la base de données :', err);
          return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'image de couverture dans la base de données' });
        }

        // appelle la fonction pour mettre à jour le logo de l'organisateur
        updateOrganizerLogo(req, eventId, updatedData, res);
      });
    }
  });
}

// fonction pour mettre à jour le logo de l'organisateur
function updateOrganizerLogo(req, eventId, updatedData, res) {
  if (req.files['newEventOrganizerLogo'] && req.files['newEventOrganizerLogo'][0]) {
    const eventOrganizerLogo = req.files['newEventOrganizerLogo'][0];
    // crée le chemin relatif pour le nouveau logo de l'organisateur
    updatedData.eventOrganizerLogoRelativePath = path.relative(__dirname, eventOrganizerLogo.path).replace(/\\/g, '/');

    // récupére le chemin de l'ancien logo de l'organisateur depuis la base de données
    myEventsConnection.query('SELECT logo_client_source FROM evenements WHERE id = ?', [eventId], (err, logoResults) => {
      if (err) {
        console.error('Erreur lors de la récupération du chemin de l\'ancien logo de l\'organisateur :', err);
        return res.status(500).json({ error: 'Erreur lors de la récupération du chemin de l\'ancien logo de l\'organisateur' });
      }

      const oldEventOrganizerLogoPath = logoResults[0].logo_client_source;
      const absoluteOldEventOrganizerLogoPath = path.join(__dirname, oldEventOrganizerLogoPath);

      // supprime l'ancien logo de son dossier de stockage
      if (fs.existsSync(absoluteOldEventOrganizerLogoPath)) {
        fs.unlink(absoluteOldEventOrganizerLogoPath, (err) => {
          if (err) {
            console.error('Erreur lors de la suppression de l\'ancien logo de l\'organisateur :', err);
          }
        });
      }

      // met à jour le logo de l'organisateur dans la base de données
      const updateLogoQuery = 'UPDATE evenements SET logo_client_source=? WHERE id = ?';
      const logoValues = [
        updatedData.eventOrganizerLogoRelativePath,
        eventId,
      ];

      // éxécute la requête pour la mise à jour du logo de l'organisateur
      myEventsConnection.query(updateLogoQuery, logoValues, (err, logoUpdateResults) => {
        if (err) {
          console.error('Erreur lors de la mise à jour du logo de l\'organisateur dans la base de données :', err);
          return res.status(500).json({ error: 'Erreur lors de la mise à jour du logo de l\'organisateur dans la base de données' });
        }

        res.status(200).json({ message: 'Événement modifié avec succès' });
      });
    });
  } else {
    // si aucun nouveau logo de l'organisateur n'a été renseigné, conserve les données du logo existant
    myEventsConnection.query('SELECT logo_client_source FROM evenements WHERE id = ?', [eventId], (err, logoResults) => {
      if (err) {
        console.error('Erreur lors de la récupération du chemin de l\'ancien logo de l\'organisateur :', err);
        return res.status(500).json({ error: 'Erreur lors de la récupération du chemin de l\'ancien logo de l\'organisateur' });
      }
      
      updatedData.eventOrganizerLogoRelativePath = logoResults[0].logo_client_source;

      res.status(200).json({ message: 'Événement modifié avec succès' });
    });
  }
}

// controller pour recupération de tous les évènements
async function getAllEvents(req, res) {

  // requête sql pour obtenir tous les évènements + id, nom et prenom de l'administrateur associé
  const eventsQuery = 'SELECT evenements.*, administrateurs.nom AS adminNom, administrateurs.prenom AS adminPrenom FROM evenements LEFT JOIN administrateurs ON evenements.administrateur_id = administrateurs.id';

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
    locationUrl: evenement.lieu_googlemaps_url,
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
    slug: evenement.slug,
    admin: {
      id: evenement.administrateur_id,
      nom: evenement.adminNom,
      prenom: evenement.adminPrenom
    }
  }));

  return formattedEvents;
};

module.exports = { createEvent, removeEvent, updateEvent, getAllEvents };