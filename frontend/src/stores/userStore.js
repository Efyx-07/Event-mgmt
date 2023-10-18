import { defineStore } from 'pinia';
import * as api from '@/services/api'; // importe les fonctions de l'api du fichier api.js

export const useUserStore = defineStore('participants', {

    state: () => ({
        participants: [], // initialise participants comme un tableau vide
    }),

    actions: {
        async fetchParticipants(eventSlug) {
            try {
                const participants = await api.fetchParticipantsData(eventSlug);
                console.log('Participants data:', participants);
                this.participants = participants;
                console.log('Store participants:', this.participants);
            } catch (error) {
                console.error('Erreur lors de la récupération des participants :', error);
            }
        }
    }
});