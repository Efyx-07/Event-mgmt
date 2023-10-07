<template>
    <form class="createEventForm" @submit.prevent="validateEventCreation">

        <div class="inputs_wrapper">
            <div class="input-container">
                <label for="event-title">Titre de l'évènement</label>
                <input 
                    type="text"
                    name="eventTitle"
                    required
                    id="create_eventTitle"
                    v-model="eventTitle"
                    @input="validateEventTitle"
                >
            </div>

            <div class="input-container">
                <label for="event-coverImage">Photo de couverture</label>
                <input 
                    type="file"
                    name="eventCoverImage"
                    accept="image/*"
                    
                    class="coverImage-input"
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
                    @input="validateEventDate"
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
                    @input="validateEventLocation"
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

    // propriétés du formulaire
    const eventTitle = ref('');
    const eventDate = ref('');
    const eventLocation = ref('');
    const eventCoverImageFile = ref(null);

    // gère le changement de fichier image (eventCoverImage)
    const handleCoverImageFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            eventCoverImageFile.value = file;
        };
    };

    // soumet le formulaire
    const validateEventCreation = async () => {

        try {
            //prépare les données à envoyer au backend
            const formData = new FormData();
            formData.append('eventTitle', eventTitle.value);
            formData.append('eventDate', eventDate.value);
            formData.append('eventLocation', eventLocation.value);
            //formData.append('eventCoverImage', eventCoverImageFile.value);

            // envoie les données au backend via fetch
            const response = await fetch('http://localhost:3000/events/create', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                    },
                body: formData,
            }); 

            if (response.ok) {
                // réponse en cas de requête réussie
                const data = await response.json();
                console.log('Reponse du backend: ', data);
            } else {
                // erreur en cas d'echec de la requête
                console.error('Erreur lors de la requête vers le backend');
            }        
        } catch(error) {
            console.error('Une erreur s\est produite', error);
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
        max-width: 66rem;
        padding: 3rem 10rem;
        gap: 3rem;

        .inputs_wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 2rem;

            .input-container {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                label {
                    font-size: 2rem;
                    font-weight: 700;
                }

                input {
                    height: 4rem;
                    font-size: 1.5rem;
                    border: solid 1px rgba($darkColor, .25);
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
                font-size: 1.5rem;
                font-weight: 700;
                padding: 1rem;
            }
        }
    }
    
</style>
