const hostName = 'http://localhost:3000'; // adresse du serveur backend

// récupère du backend, l'API des datas des évènements
export async function fetchEventsData() {

    try {

        const response = await fetch (`${hostName}/events`);
        if (!response.ok) {
            throw new Error ('Erreur lors de la récupération des données de l\'évènement');
        }
        const eventsData = await response.json();
        return eventsData;

    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'évènement: ', error);
        throw error
    }
};

// récupère du backend, l'API des datas des particpants pour un évènement sélectionné
export async function fetchParticipantsData(eventSlug) {

    try {

        const response = await fetch (`${hostName}/users/${eventSlug}/participants`);
        if(!response.ok) {
            throw new Error('Erreur lors de la récupération des données des participants');
        }
        const participantsData = await response.json();
        console.log('Participants data:', participantsData);
        return participantsData;

    } catch (error) {
        console.error('Erreur lors de la récupération des données des participants :', error);
        throw error;
    }
}; 