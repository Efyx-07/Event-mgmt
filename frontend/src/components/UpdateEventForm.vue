<template>
    
    <form class="updateEventForm" @submit.prevent="updateEvent" enctype="multipart/form-data">

        <div class="inputs_wrapper">

            <div class="input-container">
                <label for="newEvent-title">Titre de l'évènement</label>
                <input 
                    class="input-text"
                    type="text"
                    name="newEventTitle"
                    required
                    id="newEventTitle"
                    v-model="newEventTitle"
                >
            </div>

            <div class="input-container" >
                <label for="newEvent-coverImage">Image de couverture</label>
                <input
                    type="file"
                    name="newEventCoverImage"
                    accept="image/jpg, image/jpeg, image/png"
                    class="image-input"
                    id="newEventCoverImage"
                    @change="handleNewCoverImageFileChange"
                >
            </div> 

            <div class="input-container">
                <label for="newEvent-date">Date de l'évènement</label>
                <input 
                    class="input-text"
                    type="date"
                    name="newEventDate"
                    required
                    id="newEventDate"
                    v-model="newEventDate"
                >
            </div>

            <div class="input-container">
                <label for="newEvent-location">Lieu de l'évènement</label>
                <input 
                    class="input-text"
                    type="text"
                    name="newEventLocation"
                    required
                    id="newEventLocation"
                    v-model="newEventLocation"
                >
            </div>

            <div class="input-container">
                <label for="newEvent-presentation">Présentation de l'évènement</label>
                <textarea
                    class="input-text"
                    name="newEventPresentation"
                    required
                    id="newEventPresentation"
                    v-model="newEventPresentation"
                >   
                </textarea>   
            </div>

            <div class="input-container">
                <label for="newEvent-programme">Programme de l'évènement</label>
                <textarea
                    class="input-text"
                    name="newEventProgramme"
                    required
                    id="newEventProgramme"
                    v-model="newEventProgramme"
                >   
                </textarea>   
            </div>

            <div class="input-container">
                <label for="newEvent-practicalInformations">Informations pratiques</label>
                <textarea
                    class="input-text"
                    name="newEventPracticalInformations"
                    required
                    id="newEventPracticalInformations"
                    v-model="newEventPracticalInformations"
                >   
                </textarea>   
            </div>

            <div class="input-container">
                <label for="newEvent-organizerName">Nom de l'organisateur</label>
                <input 
                    class="input-text"
                    type="text"
                    name="newEventOrganizerName"
                    required
                    id="newEventOrganizerName"
                    v-model="newEventOrganizerName"
                >
            </div>

            <div class="input-container">
                <label for="newEvent-organizerLogo">Logo de l'organisateur</label>
                <input 
                    type="file"
                    name="newEventOrganizerLogo"
                    accept="image/jpg, image/jpeg, image/png"
                    class="image-input"
                    id="newEventOrganizerLogo"
                    @change="handleNewOrganizerLogoFileChange"
                >
            </div> 

            <div class="input-container">
                <label for="newEvent-organizerWebsite">Site web de l'organisateur</label>
                <input 
                    class="input-text"
                    type="url"
                    name="newEventOrganizerWebsite"
                    placeholder="https://www.example.com"
                    required
                    id="newEventOrganizerWebsite"
                    v-model="newEventOrganizerWebsite"
                >
            </div>

        </div>
        
        <button class="updateEvent-button" type="submit">
            <p>Mettre à jour</p>
        </button>

    </form>

</template>

<script setup>

    import { ref, computed } from 'vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import { useEventStore } from '@/stores/EventStore';
    import { useRouter } from 'vue-router';

    // recupère la props de selectedEvents en provenance de BackOfficeEventUpdatePage
    const { selectedEvent } = defineProps(['selectedEvent']);

    // convertit la date de l'API en une date locale
    const dateFromAPI = new Date(selectedEvent.date);
    // ajuste l'heure à midi (12:00) pour éviter les problèmes de fuseau horaire
    dateFromAPI.setHours(12, 0, 0, 0);
    // formate la date pour pour préremplissage de l'input type "date"
    const formattedDate = computed(() => {
        return dateFromAPI.toISOString().split('T')[0];
    });

    // propriétés du formulaire
    const newEventTitle = ref(selectedEvent.title);
    const newEventCoverImage = ref('');
    const newEventDate = ref(formattedDate);
    const newEventLocation = ref(selectedEvent.location);
    const newEventPresentation = ref(selectedEvent.presentation);
    const newEventProgramme = ref(selectedEvent.programme);
    const newEventPracticalInformations = ref(selectedEvent.practicalInformations);
    const newEventOrganizerName = ref(selectedEvent.organizerName);
    const newEventOrganizerLogo = ref('');
    const newEventOrganizerWebsite  = ref(selectedEvent.organizerWebsite);

    // récupère l'ID de l'évènement sélectionné
    const selectedEventId = ref(selectedEvent.id);
    const eventId = selectedEventId.value;

    console.log('id event selectionné: ', eventId)

    // gère le téléchargement du fichier image de couverture et stocke le fichier selectionné
    const handleNewCoverImageFileChange = (event) => {
        newEventCoverImage.value = event.target.files[0];
    };

    // gère le téléchargement du fichier logo de l'organisateur et stocke le fichier selectionné
    const handleNewOrganizerLogoFileChange = (event) => {
        newEventOrganizerLogo.value = event.target.files[0];
    };

    const eventStore = useEventStore();
    const router = useRouter();

    // soumet le formulaire
    const updateEvent = async () => {

        console.log('ok')

        const formData = new FormData();
        formData.append('newEventTitle', newEventTitle.value);
        formData.append('newEventCoverImage', newEventCoverImage.value);
        formData.append('newEventDate', newEventDate.value);
        formData.append('newEventLocation', newEventLocation.value);
        formData.append('newEventPresentation', newEventPresentation.value);
        formData.append('newEventProgramme', newEventProgramme.value);
        formData.append('newEventPracticalInformations', newEventPracticalInformations.value);
        formData.append('newEventOrganizerName', newEventOrganizerName.value);
        formData.append('newEventOrganizerLogo', newEventOrganizerLogo.value);
        formData.append('newEventOrganizerWebsite', newEventOrganizerWebsite.value);

        // vérifie si un fichier image de couverture a été sélectionné
        if (!newEventCoverImage.value) {
            // laisse l'image actuelle de l'événement en place
            formData.delete('newEventCoverImage');
        }

        // affiche les valeurs dans la console
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {

            const { hostName } = useGlobalDataStore();
            
            const response = await fetch (`${hostName}/events/${eventId}`, {
                method: 'PUT', 
                body: formData,           
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Réponse de l\'API:', data.message);

                // charge les données des évènements
                await eventStore.loadEventsData();

                // renvoie vers une page de redirection
                router.push('/admin_update-confirmation');

            } else {
                console.error('Erreur lors de la mise à jour de l\'evenement :', response.statusText);
            }

        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'evenement :', error);
        }

    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .updateEventForm {
        width: 75%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        .inputs_wrapper {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            .input-container {
                display: flex;
                flex-direction: column;
                gap: .5rem;

                label {
                    margin: 0;
                    font-weight: 700;
                }

                input {
                    width: 100%;
                    height: 3rem;
                    border: solid 1px rgba($accentColorBackof3, .25);
                    font-size: 1rem;
                    outline: none;

                    &:focus {
                        background: transparent;
                        border: solid 1px $accentColorBackof2;
                    }
                }
                .input-text {
                    padding-left: 1rem;
                }

                textarea {
                    width: 100%;
                    height: 6rem;
                    border: solid 1px rgba($accentColorBackof3, .25);
                    font-size: 1rem;
                    outline: none;
                    font-family: 'Inter', sans-serif;
                    padding: .5rem 1rem;

                    &:focus {
                        background: transparent;
                        border: solid 1px $accentColorBackof2;
                    }
                }
                .image-input {
                    border: none;

                    &::file-selector-button {
                        height: 2.5rem;
                        padding: 0 1rem;
                        margin-right: 1rem;
                        border: solid 1px rgba($accentColorBackof3, .25);
                        background: transparent;
                        color: $darkColor;
                        cursor: pointer;

                        &:hover {
                            color: $accentColorBackof2;
                            border: solid 1px $accentColorBackof2;
                        }

                    }

                    &:focus {
                        border: none
                    }
                }

                

                
            }
        }
        .updateEvent-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 8rem;
            height: 2rem;
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
                font-weight: 700;
            }
        }
    }
    
</style>