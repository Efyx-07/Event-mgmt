import { defineStore } from 'pinia';
import * as api from '@/services/api'; // importe les fonctions de l'api du fichier api.js

export const useEventStore = defineStore('events', {

    state: () => ({
        events: [], // initialise events comme un tableau vide
        upcomingEvents: [], // initialise les évènements 'à venir' comme un tableau vide
        pastEvents: [], // initialise les évènements 'passés' comme un tableau vide
        keyword: '', // initialise keyword (mot-clé de searchBar) comme chaine vide
        filteredByKeywordEvents: [], // initialise les évènements filtrés par mot-clé comme un tableau vide
    }),

    actions: {

        // récupère les données de tous les évènements à partir de api.js
        async loadEventsData() {
            try {
                const eventsData = await api.fetchEventsData();
                this.events = eventsData.events;
                this.sortEventByCreationDateNewToOld();
                this.updateFilteredEvents();
            } catch (error) {
                console.error('Erreur lors du chargement des données des évènements: ', error);
            }
        },

        // trie les évènements par date de création (du plus récent au plus ancien)
        sortEventByCreationDateNewToOld() {
            this.events.sort((a, b) => {
                return new Date(b.creationDate) - new Date(a.creationDate);
              });
        },

        // met à jour keyword
        updateSearchedKeyword(newKeyword) {
            this.keyword = newKeyword;
        },

        // méthode permettant de filtrer les évènements selon date "à venir / passés"
        updateFilteredEvents() {
            const currentDate = new Date();
            this.upcomingEvents = this.events.filter(event => new Date(event.date) > currentDate);
            this.pastEvents = this.events.filter(event => new Date(event.date) <= currentDate);
            this.filteredByKeywordEvents = this.events.filter(event => event.title.toLowerCase().includes(this.keyword.toLowerCase()));
        },

    },
});