const { myEventsConnection } = require('../db');

// controller pour l'inscription d'un participant
async function registerUser(req, res) {
  // récupère le slug de l'événement à partir de l'URL
  const eventSlug = req.params.eventSlug;
  console.log('Slug récupéré depuis l\'URL:', eventSlug);

  // récupère l'ID de l'événement correspondant au slug depuis la base de données
  myEventsConnection.query('SELECT id FROM evenements WHERE slug = ?', [eventSlug], (err, results) => {
    if (err || results.length === 0) {
      console.error('Erreur lors de la récupération de l\'ID de l\'événement: ', err);
      res.status(500).json({ error: 'Événement non trouvé' });
      return;
    }

    const eventId = results[0].id;

    // récupère les données du formulaire d'inscription depuis req.body
    const {
      entrepriseOrganisation,
      nom,
      prenom,
      telephone,
      email,
    } = req.body;

    // effectue les mêmes vérifications de champs côté serveur
    const companyNameRegex = /^[a-zA-Z0-9\s\.,'-]*$/;
    const nameRegex = /^[\p{L}\sçÇ'-]+$/u;
    const phoneFrenchNumbersRegex = /^(?!0[013]).{10}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (
      !companyNameRegex.test(entrepriseOrganisation) ||
      !nameRegex.test(nom) ||
      !nameRegex.test(prenom) ||
      !phoneFrenchNumbersRegex.test(telephone) ||
      !emailRegex.test(email)
    ) {
      return res.status(400).json({ error: 'Champs invalides' });
    }

    // vérifie d'abord si le participant est déjà inscrit à cet événement avec la même adresse e-mail
    myEventsConnection.query(
      'SELECT * FROM participants_evenements pe JOIN participants p ON pe.participant_id = p.id WHERE pe.evenement_id = ? AND p.email = ?',
      [eventId, email],
      (err, existingRegistration) => {
        if (err) {
          console.error('Erreur lors de la vérification de l\'inscription existante: ', err);
          res.status(500).json({ error: 'Erreur lors de la vérification' });
          return;
        }

        if (existingRegistration.length > 0) {
          console.log('Participant déjà inscrit à cet évènement')
          return res.status(400).json({ error: 'Participant is already registered for this event.' });
        }

        // insère le participant dans la base de données myevents table participants
        const insertParticipantQuery = 'INSERT INTO participants (nom_entreprise, nom, prenom, email, telephone) VALUES (?, ?, ?, ?, ?)';
        const participantValues = [
          entrepriseOrganisation,
          nom,
          prenom,
          email,
          telephone,
        ];

        myEventsConnection.query(insertParticipantQuery, participantValues, (err, participantResults) => {
          if (err) {
            console.error('Erreur lors de l\'inscription du participant: ', err);
            res.status(500).json({ error: 'Erreur lors de l\'inscription' });
            return;
          }

          // obtient l'ID du participant nouvellement créé
          const participantId = participantResults.insertId;
          console.log('ID du participant :', participantId);

          // insère la liaison entre le participant et l'événement
          const insertBindingQuery = 'INSERT INTO participants_evenements (participant_id, evenement_id) VALUES (?, ?)';
          const bindingValues = [participantId, eventId];
          console.log('Valeurs de la liaison :', bindingValues);

          myEventsConnection.query(insertBindingQuery, bindingValues, (err, bindingResults) => {
            if (err) {
              console.error('Erreur lors de la liaison participant-événement: ', err);
              res.status(500).json({ error: 'Erreur lors de la liaison participant-événement' });
              return;
            }

            // utilisateur inscrit avec succès
            res.status(201).json({ message: 'Inscription réussie' });
          });
        });
      }
    );
  });
}

module.exports = { registerUser };