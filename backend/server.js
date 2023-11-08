const express = require('express'); // appelle l'instance express
const cors = require('cors'); // importe cors
const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users');
const adminsRouter = require('./routes/admins')
const path = require('path');

// charge les variables d'environnement à partir du fichier .env
require('dotenv').config();

console.log('GOOGLE_MAPS_API_KEY:', process.env.GOOGLE_MAPS_API_KEY);
console.log('Variables d\'environnement chargées :', process.env);

const app = express(); // demarre le serveur express
const PORT = process.env.PORT || 3000; // définit le port

app.use(cors()); // utilise cors en tant que middleware, permet au server Express d'accepter des requetes de n'importe quelle origine

app.use(express.json()); // middleware - analyse le corps des requetes JSON
app.use('/events', eventsRouter); // utilise la route events
app.use('/users', usersRouter); // utilise la route users
app.use('/admins', adminsRouter); // utilise la route admins

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// endpoint pour l'accés à la clé API  Google Maps Embed stockée dans les variables d'environnement
app.get('/maps', (req, res) => {
    const urlWithApiKey = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(req.query.location)}`;
    console.log('URL est: ', urlWithApiKey)
    res.json({ embedUrl: urlWithApiKey });
});

// execute le serveur backend sur le port déterminé
app.listen(PORT, () => {
    console.log(`Serveur backend en cours d'execution sur le port ${PORT}`);
});