<template>
    <div class="removeEventModal" :class="{ hiddenRemoveEventModal: !isRemoveEventModalVisible }">
        <div class="optionBox">
            <div class="askText_container">
                <p>Etes-vous sûr de vouloir supprimer l'evenement :</p>
                <p class="eventTitle">"{{ eventToRemove.eventTitle }} {{ eventToRemove.eventId }}"</p>
            </div>
            <div class="alertMention">
                <Icon icon="mdi:alert-outline" class="alertIcon"/>
                <p>Cette opération est irréversible et supprimera l'évènement et toutes ses données</p>
            </div>
            <div class="buttons_container">
                <button class="cancelButton" @click="closeRemoveEventModal">
                    <p>Annuler</p>
                </button>
                <button class="confirmButton" @click="confirmRemoveEvent">
                    <p>Confirmer</p>
                </button>
            </div>
        </div>
    </div>  
</template>

<script setup>
    import { Icon } from '@iconify/vue';
    import { ref, onMounted } from 'vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';

    // statut par défaut de la visibilité de la fenetre
    const isRemoveEventModalVisible  = ref(false);

    // données de l'évènement à supprimer
    const eventToRemove = ref({
        eventTitle:'',
        eventId:''
    });

    // permet la fermeture de la fenetre au click du bouton Annuler
    const closeRemoveEventModal = () => {
        isRemoveEventModalVisible.value = false;
    };

    // ecoute l'événement personnalisé (créé sur 'BackOfficeEventCard') pour réafficher la fenetre
    onMounted(() => {
        window.addEventListener('show-removeEventModal', (event) => {
            isRemoveEventModalVisible.value = true;

            // récupère les données de l'évènement à supprimer
            eventToRemove.value = event.detail;
        });
    });

    // Fonction pour confirmer la suppression de l'événement
    const confirmRemoveEvent = async () => {
        try {

            const { hostName } = useGlobalDataStore();

            // recupère l'id de l'évènement à supprimer
            const eventId = eventToRemove.value.eventId;

            const response = await fetch(`${hostName}/events/${eventId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
            } else {
                console.error('Erreur lors de la suppression de l\'événement');
            }

            // ferme la fenêtre modale de suppression
            isRemoveEventModalVisible.value = false;
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'événement :', error);
        }
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .hiddenRemoveEventModal { 
        visibility: hidden;
        opacity: 0;
    }
    .removeEventModal {
        background: rgba($darkColor, .25);
        backdrop-filter: blur(2.5px);
        height: 100vh;
        width: 100vw;
        position: fixed;
        z-index: 999;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity .1s ease-in-out;
        .optionBox {
            background: $darkColorBackOf;
            color: $lightColor;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            gap: 1rem;
            .askText_container {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                p {
                    margin: 0;
                    text-align: center;
                    font-size: 1.2rem;
                    font-weight: 400;
                }
                .eventTitle {
                    font-weight: 700;
                }
            }
            .alertMention {
                display: flex;
                align-items: center;
                gap: 1rem;
                color: $errorColor;
                .alertIcon {
                    font-size: 1.5rem;
                    color: $errorColor;
                }

                p {
                    margin: 0;
                    text-align: center;
                    font-size: .8rem;
                    font-weight: 200;
                }
            }

            .buttons_container {
                display: flex;
                gap: 1.5rem;

                button {
                    width: 8rem;
                    margin-top: 1rem;
                    padding: .5rem;
                    background: transparent;
                    color: $lightColor;
                    border: solid 1px $lightColor;
                    cursor: pointer;

                    p {
                        margin: 0;
                        font-weight: 600;
                        font-size: 1rem;
                    }

                    &:hover {
                        background: $accentColorBackof2;
                    }
                }
            }

        }
    }

    
</style>
