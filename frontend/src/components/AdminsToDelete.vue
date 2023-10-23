<template>

    <div class="adminsList">
        <div class="adminsList_block" v-for="admin in filteredAdmins" :key="admin.nom">
            <div class="adminNameAndButton_container">
                <p>{{ admin.prenom }} {{ admin.nom }}</p>
                <button @click="deleteAdmin">
                    <p>Supprimer</p>
                </button>
            </div>
            <div class="separator"></div>
        </div>     
    </div>

</template>

<script setup>

import { useAdminStore } from '@/stores/AdminStore';
import { ref, onMounted } from 'vue';

const adminStore = useAdminStore();
const filteredAdmins = ref([]); // initialise un tableau vide des administrateurs filtrés

// chargement asynchrone des données depuis le store.
onMounted(() => {
    adminStore.loadAdminDataFromLocalStorage();
    adminStore.loadAdminsData();

    // filtre les administrateurs une fois les données chargées avec la methode définie dans le store
    filteredAdmins.value = adminStore.filteredAdmins;
});

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

    .adminsList {
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .adminsList_block {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            .adminNameAndButton_container {
                display: flex;
                align-items: center;
                justify-content: space-between;

                p {
                    margin: 0;
                }

                button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 6rem;
                    height: 1.5rem;
                    border: none;
                    background: $darkColorBackOf;
                    color: $lightColor;
                    align-self: end;
                    cursor: pointer;

                    &:hover {
                        background: $accentColorBackof2;
                    }

                    p {
                        margin: 0;
                        font-size: .7rem;
                        font-weight: 700;
                    }
                }
                .confirmationAsk {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: .5rem;

                    p {
                        margin: 0;
                        font-size: .9rem;
                    }

                    .buttons_container {
                        display: flex;
                        gap: .5rem;
                        
                        p {
                            font-size: .7rem;
                        }
                    }
                }
            }
            .separator {
                height: 1px;
                background: rgba($accentColorBackof3, .25);
            }
        }
    }
    
</style>