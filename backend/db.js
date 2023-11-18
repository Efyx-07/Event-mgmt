const mysql = require('mysql2'); // appelle l'instance mysql2

const hostName = 'localhost';
const userName = 'root';
const password = 'FXMysql2023!';

// connexion à la base de données 'myevents'
const myEventsConnection = mysql.createConnection({
    host: hostName, // adresse du serveur MySQL
    user: userName, // nom utilisateur MySQL
    password: password, // mot de passe MySQL
    database: 'myevents' // nom BDD MySQL
});

// vérifie que la connexion est établie, envoie une erreur si echec 
myEventsConnection.connect((err) => {
    if(err) {
        console.error('Erreur lors de la recupération des datas des évènements: '+ err.stack)
        return;
    } console.log("connexion reussie avec la BDD myevents")
});

module.exports = {myEventsConnection};