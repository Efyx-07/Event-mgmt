import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useEventStore } from './stores/EventStore';
import App from './App.vue';
import router from './router';


// initialise l'appli à la fin du chargement des données
const initApp = async () => {

    const app = createApp(App);
    
    // initialise Pinia
    app.use(createPinia());
    
    // crée une instance de store
    const eventStore = useEventStore();

    try {
        await eventStore.loadEventsData();
        
    } catch (error) {
        console.error('Erreur lors du chargement des données: ', error);
    };

    app.use(router);
    app.mount('#app');
}; 

initApp();














