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
                <label for="event-coverImage">Photo de couverture</label>
                <input 
                    type="file"
                    name="eventCoverImage"
                    required
                    accept="image/jpg, image/jpeg, image/png"
                    class="coverImage-input"
                    id="create_coverImage"
                    @change="handleCoverImageFileChange"
                >
            </div> 

        </div>
        
        <button class="createEvent-button" type="submit">
            <p>Publier l'évènement</p>
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
    const eventLocation = ref('');
    const eventDate = ref('');
    const eventCoverImage = ref('');

    // gère le telechargement du fichier image et stocke le fichier selectionné
    const handleCoverImageFileChange = (event) => {
        eventCoverImage.value = event.target.files[0];
    };

    const eventStore = useEventStore();
    const router = useRouter();

    // soumet le formulaire
    const validateEventCreation = async () => {
        
        const formData = new FormData();
        formData.append('eventTitle', eventTitle.value);
        formData.append('eventLocation', eventLocation.value);
        formData.append('eventDate', eventDate.value);
        formData.append('eventCoverImage', eventCoverImage.value);

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
        display: flex;
        flex-direction: column;
        align-items: center;
        background: $ultraLightColor;
        box-shadow: $shadow;
        max-width: 50%;
        padding: 3rem;
        gap: 3rem;

        .inputs_wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .input-container {
                display: flex;
                flex-direction: column;
                gap: .5rem;

                label {
                    font-size: 1.3rem;
                    font-weight: 700;
                }

                input {
                    height: 2.5rem;
                    font-size: 1rem;
                    padding: 1rem;
                    border: solid 1px rgba($darkColor, .25);

                    &:focus {
                        outline: none;
                        border: solid 2px $accentColorBackof2;
                    }
                }
                .coverImage-input {
                    border: none;
                }
            }
        }
        .createEvent-button {
            border: none;
            background: $darkColorBackOf;
            cursor: pointer;

            &:hover {
                background: $accentColorBackof2;
            }

            p {
                margin: 0;
                color: $lightColor;
                font-size: 1.3rem;
                font-weight: 700;
                padding: .7rem 1rem;
            }
        }
    }
    
</style>
