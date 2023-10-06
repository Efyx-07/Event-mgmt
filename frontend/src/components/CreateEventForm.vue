<template>
    <form class="createEventForm" @submit.prevent="createEvent">

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
                    required
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
