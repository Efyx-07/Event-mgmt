<template>

    <div class="EventPageSectionPracticalInformations">
        <div class="title_container">
            <h2>Informations Pratiques</h2>
            <div class="separator"></div>
        </div>
        <div class="practicalInformations_container">
            <p>
                {{ selectedEvent.practicalInformations }}
            </p>
        </div>
    </div>
    
</template>

<script setup>

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .EventPageSectionPracticalInformations {
        .title_container {

            h2 {
                margin: 0;
                font-size: 1.5rem;
            }
            .separator {
                width: 100%;
                height: 1px;
                background: $accentColor2;
            }

        }
    }
    
    
</style>