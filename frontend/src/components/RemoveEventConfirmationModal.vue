<template>
    <div class="removeEventConfirmationModal" :class="{ hiddenRemoveEventConfirmationModal: !isRemoveEventConfirmationModalVisible }">
        <div class="optionBox">

            <div class="part1">
                <div class="alertIcon_container">
                    <Icon icon="mdi:alert-outline" class="alertIcon"/>
                </div>
                <p>Supprimer l'évènement</p>
            </div>

            <ReusableSeparator/>

            <p class="eventTitle">"{{ eventToRemove.eventTitle }}"</p>

            <p class="alertMessage">Etes-vous sûr de vouloir supprimer l'evenement? Cette opération est irréversible et supprimera l'évènement et toutes ses données. </p>

            <ReusableSeparator/>
            
            <div class="buttons_container">
                <ReusableSecondaryButton  @click="closeRemoveEventConfirmationModal">Annuler</ReusableSecondaryButton> 
                <ReusablePrimaryButton @click="confirmRemoveEvent">Confirmer</ReusablePrimaryButton>
            </div>

        </div>
    </div>  
</template>

<script setup>
    import { Icon } from '@iconify/vue';
    import { ref, onMounted } from 'vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import { useEventStore } from '@/stores/EventStore';
    import { useRouter } from 'vue-router';
    import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
    import ReusableSecondaryButton from '@/sub-components/ReusableSecondaryButton.vue';
    import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

    // statut par défaut de la visibilité de la fenetre
    const isRemoveEventConfirmationModalVisible  = ref(false);

    // données de l'évènement à supprimer
    const eventToRemove = ref({
        eventTitle:'',
        eventId:''
    });

    // permet la fermeture de la fenetre au click du bouton Annuler
    const closeRemoveEventConfirmationModal = () => {
        isRemoveEventConfirmationModalVisible.value = false;
    };

    // ecoute l'événement personnalisé (créé sur 'BackOfficeEventCard') pour réafficher la fenetre
    onMounted(() => {
        window.addEventListener('show-removeEventConfirmationModal', (event) => {
            isRemoveEventConfirmationModalVisible.value = true;
            // récupère les données de l'évènement à supprimer
            eventToRemove.value = event.detail;
        });
    });

    const eventStore = useEventStore();
    const router = useRouter();

    // fonction pour confirmer la suppression de l'événement
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

                // charge les données des évènements
                await eventStore.loadEventsData();

                // renvoie vers une page de redirection
                router.push('/admin_remove-confirmation');

            } else {
                console.error('Erreur lors de la suppression de l\'événement');
            }

            // ferme la fenêtre modale de suppression
            isRemoveEventConfirmationModalVisible.value = false;
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'événement :', error);
        }
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';
    .hiddenRemoveEventConfirmationModal { 
        visibility: hidden;
        opacity: 0;
    }
    .removeEventConfirmationModal {
        background: $overlayTransparencyColor;
        height: 100vh;
        width: 100vw;
        position: fixed;
        z-index: 999;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all .2s ease-in-out;
        .optionBox {
            max-width: 500px;
            background: $ultraLightColor;
            box-shadow: $shadow;
            border-radius: 10px;
            color: $darkColor;
            display: flex;
            flex-direction: column;
            padding: 1rem;
            margin: 1rem;
            gap: 1rem;
            .part1 {
                display: flex;
                align-items: center;
                gap: 1rem;
                .alertIcon_container {
                    background: rgba($errorColor, .15);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 2rem;
                    height: 2rem;
                    border-radius: 100%;
                    .alertIcon {
                        color: $errorColor;
                        font-size: 1rem;
                    }
                }

                p {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 700;
                    white-space: nowrap;
                }
                 
            }
            .eventTitle {
                margin: 0;
                font-weight: 700;
            }
            .alertMessage {
                margin: 0;
                font-size: 1rem;
                text-align: justify;
            }
            .buttons_container {
                display: flex;
                align-items: center;
                justify-content: end;
                gap: 1rem;
            }

        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .removeEventConfirmationModal {
            .optionBox {
                margin: unset;
                .part1 {
                    .alertIcon_container {
                        width: 2.5rem;
                        height: 2.5rem;
                        .alertIcon {
                            font-size: 1.5rem;
                        }
                    }

                    p {
                        font-size: 1.2rem;
                    }
                    
                }
                .alertMessage {
                    text-align: unset;
                }
                .buttons_container {
                    justify-content: end;
                }

            }
        }
    }

    
</style>
