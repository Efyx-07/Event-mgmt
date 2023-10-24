import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import * as api from '@/services/api'; // importe les fonctions de l'api du fichier api.js

export const useAdminStore = defineStore('admins', {

    state: () => ({
        token: null, // initialise le token à null par défaut
        isConnected: false, // statut initial de l'administrateur à 'non-connecté'
        adminData: reactive({}), // déclare adminData comme réactif
        admins: [], // initialise admins comme un tableau vide
        filteredAdmins: ref([]),
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
                console.log('AdminData chargées depuis le localStorage: ', this.adminData);
            }
        },

        // récupère les données de tous les administrateurs à partir de api.js
        async loadAdminsData() {
            try {
                const adminsData = await api.fetchAdminsData();
                this.admins = adminsData.admins;

            } catch (error) {
                console.error('Erreur lors du chargement des données des administrateurs');
            }
        },

        // ajoute administrateur nouvellement créé à admins
        addToAdmins(admin) {
            this.admins.push(admin);
            console.log('Nouvel administrateur ajouté au tableau admins:', admin);
        },
    },

    getters: {

        // méthode pour filtrer les administrateurs en comparant avec l'id de l'administrateur actuellement connecté
        filteredAdmins() {
            const connectedAdminId = this.adminData.id;
            return this.admins.filter(admin => admin.id !== connectedAdminId);
        }
    }
});