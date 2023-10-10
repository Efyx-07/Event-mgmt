import { defineStore } from 'pinia';

export const useGlobalDataStore = defineStore('globalData', {

    state: () => ({

        hostName: 'http://localhost:3000', // entrer ici l'adresse du serveur backend, ne doit se déclarer qu'à cet endroit
        
    }),
});