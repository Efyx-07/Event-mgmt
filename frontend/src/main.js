import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useEventStore } from './stores/EventStore';
import { useAdminStore } from './stores/AdminStore';
import App from './App.vue';
import router from './router';


// initialise l'appli à la fin du chargement des données
const initApp = async () => {

    const app = createApp(App);
    
    // initialise Pinia
    app.use(createPinia());
    
    // crée une instance de store
    const eventStore = useEventStore();
    const adminStore = useAdminStore();

    try {
        await eventStore.loadEventsData();
        await adminStore.loadAdminsData();
        
    } catch (error) {
        console.error('Erreur lors du chargement des données: ', error);
    };

    app.use(router);
    app.mount('#app');
}; 

initApp();














