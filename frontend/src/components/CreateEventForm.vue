<template>
    
    <form class="createEventForm" @submit.prevent="validateEventCreation" enctype="multipart/form-data">

        <div class="inputs_wrapper">

            <div class="input-container">
                <label for="event-title">Titre de l'évènement</label>
                <input 
                    type="text"
                    name="eventTitle"
                    required
                    id="create_eventTitle"
                    v-model="eventTitle"
                >
            </div>

            <div class="input-container" >
                <label for="event-coverImage">Image de couverture</label>
                <input 
                    type="file"
                    name="eventCoverImage"
                    required
                    accept="image/jpg, image/jpeg, image/png"
                    class="image-input"
                    id="create_coverImage"
                    @change="handleCoverImageFileChange"
                >
            </div> 

            <div class="input-container">
                <label for="event-date">Date de l'évènement</label>
                <input 
                    type="date"
                    name="eventDate"
                    required
                    id="create_eventDate"
                    v-model="eventDate"
                >
            </div>

            <div class="input-container">
                <label for="event-location">Lieu de l'évènement</label>
                <input 
                    type="text"
                    name="eventLocation"
                    required
                    id="create_eventLocation"
                    v-model="eventLocation"
                >
            </div>

            <div class="input-container">
                <label for="event-presentation">Présentation de l'évènement</label>
                <textarea
                    name="eventPresentation"
                    required
                    id="create_eventPresentation"
                    v-model="eventPresentation"
                >   
                </textarea>   
            </div>

            <div class="input-container">
                <label for="event-programme">Programme de l'évènement</label>
                <textarea
                    name="eventProgramme"
                    required
                    id="create_eventProgramme"
                    v-model="eventProgramme"
                >   
                </textarea>   
            </div>

            <div class="input-container">
                <label for="event-practicalInformations">Informations pratiques</label>
                <textarea
                    name="eventPracticalInformations"
                    required
                    id="create_eventPracticalInformations"
                    v-model="eventPracticalInformations"
                >   
                </textarea>   
            </div>

            <div class="input-container">
                <label for="event-organizerName">Nom de l'organisateur</label>
                <input 
                    type="text"
                    name="eventOrganizerName"
                    required
                    id="create_eventOrganizerName"
                    v-model="eventOrganizerName"
                >
            </div>

            <div class="input-container">
                <label for="event-organizerLogo">Logo de l'organisateur</label>
                <input 
                    type="file"
                    name="eventOrganizerLogo"
                    required
                    accept="image/jpg, image/jpeg, image/png"
                    class="image-input"
                    id="create_eventOrganizerLogo"
                    @change="handleOrganizerLogoFileChange"
                >
            </div> 

            <div class="input-container">
                <label for="event-organizerWebsite">Site web de l'organisateur</label>
                <input 
                    type="url"
                    name="eventOrganizerWebsite"
                    placeholder="https://www.example.com"
                    required
                    id="create_eventOrganizerWebsite"
                    v-model="eventOrganizerWebsite"
                >
            </div>

        </div>
        
        <button class="createEvent-button" type="submit">
            <p>Publier</p>
        </button>

    </form>

</template>

<script setup>

    import { ref } from 'vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import { useEventStore } from '@/stores/EventStore';
    import { useRouter } from 'vue-router';

    // propriétés du formulaire
    const eventTitle = ref('');
    const eventCoverImage = ref('');
    const eventDate = ref('');
    const eventLocation = ref('');
    const eventPresentation = ref('');
    const eventProgramme = ref('');
    const eventPracticalInformations = ref('');
    const eventOrganizerName = ref('');
    const eventOrganizerLogo = ref('');
    const eventOrganizerWebsite  = ref('');


    // gère le téléchargement du fichier image de couverture et stocke le fichier selectionné
    const handleCoverImageFileChange = (event) => {
        eventCoverImage.value = event.target.files[0];
    };

    // gère le téléchargement du fichier logo de l'organisateur et stocke le fichier selectionné
    const handleOrganizerLogoFileChange = (event) => {
        eventOrganizerLogo.value = event.target.files[0];
    };

    const eventStore = useEventStore();
    const router = useRouter();

    // soumet le formulaire
    const validateEventCreation = async () => {
        
        const formData = new FormData();
        formData.append('eventTitle', eventTitle.value);
        formData.append('eventCoverImage', eventCoverImage.value);
        formData.append('eventDate', eventDate.value);
        formData.append('eventLocation', eventLocation.value);
        formData.append('eventPresentation', eventPresentation.value);
        formData.append('eventProgramme', eventProgramme.value);
        formData.append('eventPracticalInformations', eventPracticalInformations.value);
        formData.append('eventOrganizerName', eventOrganizerName.value);
        formData.append('eventOrganizerLogo', eventOrganizerLogo.value);
        formData.append('eventOrganizerWebsite', eventOrganizerWebsite.value);

        // affiche les valeurs dans la console
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {

            const { hostName } = useGlobalDataStore();
            
            const response = await fetch (`${hostName}/events/create`, {
                method: 'POST', 
                body: formData,           
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Réponse de l\'API:', data.message);

                // ajoute le nouvel evenement dans la liste d'evenements dans le store
                eventStore.events.push(data.event);

                // charge les données des évènements
                await eventStore.loadEventsData();

                // renvoie vers une page de redirection
                router.push('/admin_publication-confirmation');
                        
            } else {
                console.error('Erreur lors de la création d\'evenement :', response.statusText);
            }

        } catch(error) {
            console.error('Erreur lors de la création d\'evenement :', error);
        }  

    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .createEventForm {
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

                textarea {
                    width: 100%;
                    height: 6rem;
                    border: solid 1px rgba($accentColorBackof3, .25);
                    font-size: 1rem;
                    outline: none;

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
        .createEvent-button {
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
