import { defineStore } from 'pinia';

export const useGlobalDataStore = defineStore('globalData', {

    state: () => ({

        // Serveur backend
        hostName: 'http://localhost:3000', // entrer ici l'adresse du serveur backend, ne doit se déclarer qu'à cet endroit

        // Icones de Iconify
        validateIconName: "ooui:success", // Icone 'validé'
        removeImageIconName: "grommet-icons:update", // Icone 'changer image'
   
    }),
});