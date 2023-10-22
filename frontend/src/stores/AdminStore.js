import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useAdminStore = defineStore('admins', {

    state: () => ({
        token: null, // initialise le token à null par défaut
        isConnected: false, // statut initial de l'administrateur à 'non-connecté'
        adminData: reactive({}), // déclare adminData comme réactif
    }),

    actions: {

        // stocke le token obtenu à la connexion de l'administrateur
        setToken(newToken) {
            this.token = newToken;
        },

        // supprime le token à la déconnexion de l'administrateur
        clearToken() {
            this.token = null;
        },

        // sauvegarde les données de l'administrateur connecté dans le localStorage
        saveAdminDataInLocalStorage() {
            localStorage.setItem('adminData', JSON.stringify(this.adminData));
            console.log('AdminData sauvegardées dans le localStorage: ', this.adminData);
        },

        // charge les données de l'administrateur à partir de la réponse JSON
        setAdminData(adminData) {
            this.adminData = adminData;
            this.saveAdminDataInLocalStorage();
            console.log('AdminData définies dans le store: ', this.adminData);
        },

        // charge les données de l'administrateur à partir du localStorage
        async loadAdminDataFromLocalStorage() {
            const localStorageAdminData = localStorage.getItem('adminData');
            if (localStorageAdminData) {
                this.adminData = JSON.parse(localStorageAdminData);
                console.log('UserData chargées depuis le localStorage: ', this.adminData);
            }
        },
    },
});