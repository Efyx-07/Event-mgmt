import { defineStore } from 'pinia';
import * as api from '@/services/api'; // importe les fonctions de l'api du fichier api.js

export const useEventStore = defineStore('events', {

    state: () => ({
        events: [], // initialise events comme un tableau vide
    }),

    actions: {

        // récupère les données de tous les évènements à partir de api.js
        async loadEventsData() {
            try {
                const eventsData = await api.fetchEventsData();
                this.events = eventsData.events;

            } catch (error) {
                console.error('Erreur lors du chargement des données des évènements: ', error);
            }
        },
    },
});