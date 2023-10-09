const hostName = 'http://localhost:3000'; // adresse du serveur backend

// récupère du backend, l'API des datas des évènements
export async function fetchEventsData() {

    try {

        const response = await fetch (`${hostName}/events`);
        if (!response.ok) {
            throw new Error ('Erreur lors de la récupération des données de l\'évènement');
        }
        const eventsData = await response.json();
        console.log(eventsData)

    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'évènement: ', error);
        throw error
    }
};