<template>
    <div class="modal" :class="{ hiddenRemoveEventConfirmationModal: !isRemoveEventConfirmationModalVisible }">

        <div class="modal-content">

            <div class="head-part">
                <div class="icon_container">
                    <Icon icon="mdi:alert-outline" class="icon"/>
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

    @import '@/assets/sass/backOfficeModalStyle';
    .hiddenRemoveEventConfirmationModal { 
        visibility: hidden;
        opacity: 0;
    }
    .eventTitle {
        margin: 0;
        font-weight: 700;
    }
 
</style>
