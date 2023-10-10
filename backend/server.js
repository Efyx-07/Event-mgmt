const express = require('express'); // appelle l'instance express
const cors = require('cors'); // importe cors
const eventsRouter = require('./routes/events');
const path = require('path');


const app = express(); // demarre le serveur express
const PORT = process.env.PORT || 3000; // définit le port

app.use(cors()); // utilise cors en tant que middleware, permet au server Express d'accepter des requetes de n'importe quelle origine

app.use(express.json()); // middleware - analyse le corps des requetes JSON
app.use('/events', eventsRouter); // utilise la route users

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// execute le serveur backend sur le port déterminé
app.listen(PORT, () => {
    console.log(`Serveur backend en cours d'execution sur le port ${PORT}`);
});