<template>

    <div class="EventPageSectionPracticalInformations">
        <div class="title_container">
            <h2>Informations Pratiques</h2>
            <div class="separator"></div>
        </div>
        <div class="practicalInformations_container">
            <p v-html="formattedPracticalInformations"></p>
        </div>
    </div>
    
</template>

<script setup>

    import { computed } from 'vue';

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

    // fonction pour formater les sauts de ligne en balises <br>
    const formattedPracticalInformations = computed(() => {
        return selectedEvent.practicalInformations.replace(/\r\n/g, '<br>');
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .EventPageSectionPracticalInformations {
        .title_container {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            h2 {
                margin: 0;
                font-size: 1.5rem;
            }
            .separator {
                width: 100%;
                height: 1px;
                background: rgba($accentColor1, .25);
            }

        }
        .practicalInformations_container {
            padding: 2rem 0;
            
            p {
                margin: 0;
            }
        }
    }
    
    
</style>