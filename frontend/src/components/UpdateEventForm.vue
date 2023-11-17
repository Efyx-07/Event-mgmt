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
                <div class="labelAndNotif_container">
                    <label for="newEvent-coverImage">Image de couverture</label>
                    <p class="notification">{{ notification }}</p>
                </div>
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
                    v-model="userSelectedDate"
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
                <label for="newEvent-locationGoogleMapsUrl">Lien Google Maps du lieu</label>
                <input 
                    type="url"
                    name="newEventLocationGoogleMapsUrl"
                    placeholder="https://www.google.fr/maps/place/..."
                    required
                    id="newEventLocationGoogleMapsUrl"
                    class="input-text"
                    v-model="newEventLocationGoogleMapsUrl"
                >
            </div>

            <div class="input-container">
                <label for="newEvent-presentation">Présentation de l'évènement</label>
                <ckeditor :editor="editor" v-model="editorDataNewPresentation" :config="editorConfig" @input="updateNewEventPresentation"></ckeditor>
            </div>

            <div class="input-container">
                <label for="newEvent-programme">Programme de l'évènement</label>
                <ckeditor :editor="editor" v-model="editorDataNewProgramme" :config="editorConfig" @input="updateNewEventProgramme"></ckeditor>
            </div>

            <div class="input-container">
                <label for="newEvent-practicalInformations">Informations pratiques</label>
                <ckeditor :editor="editor" v-model="editorDataNewPracticalInformations" :config="editorConfig" @input="updateNewEventPracticalInformations"></ckeditor>
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
                <div class="labelAndNotif_container">
                    <label for="newEvent-organizerLogo">Logo de l'organisateur</label>
                    <p class="notification">{{ notification }}</p>
                </div>
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

        <div class="updateEventForm-buttons_container">
            <ReusableSecondaryButton  @click="navigateToHomepage">Annuler</ReusableSecondaryButton> 
            <ReusablePrimaryButton type="submit">Mettre à jour</ReusablePrimaryButton>
        </div>

    </form>

</template>

<script setup>

    import { ref, computed, watchEffect, onMounted } from 'vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import { useEventStore } from '@/stores/EventStore';
    import { useRouter } from 'vue-router';
    import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
    import ReusableSecondaryButton from '@/sub-components/ReusableSecondaryButton.vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    // recupère la props de selectedEvents en provenance de BackOfficeEventUpdatePage
    const { selectedEvent } = defineProps(['selectedEvent']);

    // data
    const notification = '(Sans choix de votre part, l\'image actuelle restera en place)'

    // convertit la date de l'API en une date locale
    const dateFromAPI = new Date(selectedEvent.date);
    // ajuste l'heure à midi (12:00) pour éviter les problèmes de fuseau horaire
    dateFromAPI.setHours(12, 0, 0, 0);
    // formate la date pour pour préremplissage de l'input type "date"
    const formattedDate = computed(() => {
        return dateFromAPI.toISOString().split('T')[0];
    });

    // nouvelle variable réactive pour stocker la date modifiée par l'utilisateur
    const userSelectedDate = ref(formattedDate.value);

    // mettre cette nouvelle variable quand l'utilisateur modifie la date
    watchEffect(() => {
        if (userSelectedDate.value !== formattedDate.value) {
            formattedDate.value = userSelectedDate.value;
        }
    });

    // propriétés du formulaire
    const newEventTitle = ref(selectedEvent.title);
    const newEventCoverImage = ref('');
    const newEventDate = ref(userSelectedDate);
    const newEventLocation = ref(selectedEvent.location);
    const newEventLocationGoogleMapsUrl =  ref(selectedEvent.locationUrl);
    const newEventPresentation = ref(selectedEvent.presentation);
    const newEventProgramme = ref(selectedEvent.programme);
    const newEventPracticalInformations = ref(selectedEvent.practicalInformations);
    const newEventOrganizerName = ref(selectedEvent.organizerName);
    const newEventOrganizerLogo = ref('');
    const newEventOrganizerWebsite  = ref(selectedEvent.organizerWebsite);

    // récupère l'ID de l'évènement sélectionné
    const selectedEventId = ref(selectedEvent.id);
    const eventId = selectedEventId.value;

    // gère le téléchargement du fichier image de couverture et stocke le fichier selectionné
    const handleNewCoverImageFileChange = (event) => {
        newEventCoverImage.value = event.target.files[0];
    };

    // gère le téléchargement du fichier logo de l'organisateur et stocke le fichier selectionné
    const handleNewOrganizerLogoFileChange = (event) => {
        newEventOrganizerLogo.value = event.target.files[0];
    };

    // crée une instance CKEditor
    const editor = ClassicEditor;
    let editorDataNewPresentation = ref(selectedEvent.presentation);
    let editorDataNewProgramme = ref(selectedEvent.programme);
    let editorDataNewPracticalInformations = ref(selectedEvent.practicalInformations);
    const editorConfig = {
        toolbar: {
        items: [
            'bold', 
            'italic',
            'bulletedList', 
            'numberedList', 
            'undo', 
            'redo'
        ]
        },
        language: 'fr',
    };

    // lie les editorData aux propriétés du formulaire envoyées
    onMounted(() => {
        editorDataNewPresentation = newEventPresentation.value;
        editorDataNewProgramme = newEventProgramme.value;
        editorDataNewPracticalInformations = newEventPracticalInformations.value;
    });

    // fonctions pour mettre à jour les propriétés du formulaires quand le contenu de l'éditeur change
    const updateNewEventPresentation = (event) => {
        newEventPresentation.value = event;
    };
    const updateNewEventProgramme = (event) => {
        newEventProgramme.value = event;
    };
    const updateNewEventPracticalInformations = (event) => {
        newEventPracticalInformations.value = event;
    };

    const eventStore = useEventStore();
    const router = useRouter();

    // soumet le formulaire
    const updateEvent = async () => {

        const formData = new FormData();
        formData.append('newEventTitle', newEventTitle.value);
        formData.append('newEventCoverImage', newEventCoverImage.value);
        formData.append('newEventDate', newEventDate.value);
        formData.append('newEventLocation', newEventLocation.value);
        formData.append('newEventLocationGoogleMapsUrl', newEventLocationGoogleMapsUrl.value);
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

    // reconduis vers la page 'vos évènements'
    const navigateToHomepage = () => {
        router.push('/admin_homepage');
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';
    .updateEventForm {
        width: 100%;
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
                .labelAndNotif_container {
                    display: flex;
                    flex-direction: column;
                    .notification {
                        margin: 0;
                        font-size: .7rem;
                    }

                }

                input {
                    width: 100%;
                    height: 3rem;
                    border: solid 1px rgba($accentColorBackof3, .25);
                    border-radius: 5px;
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
                .image-input {
                    border: none;
                    border-radius: unset;

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
        .updateEventForm-buttons_container {
            display: flex;
            flex-wrap: wrap;
            justify-content: end;
            gap: 1rem;
        }

    }

    @media screen and (min-width: 1440px) {
        .updateEventForm {
            width: 75%;   
        }
    }
    
    
</style>