<template>

    <div class="EventPageSectionPracticalInformations">
        <div class="title_container">
            <h2>Informations Pratiques</h2>
            <div class="separator"></div>
        </div>
        <div class="practicalInformations_container">
            <p v-html="selectedEvent.practicalInformations"></p>
            <EventPageLocationMap :selectedEvent="selectedEvent" class="locationMap"/>
        </div>
    </div>
    
</template>

<script setup>

    import EventPageLocationMap from '@/components/EventPageLocationMap.vue';

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';
    .EventPageSectionPracticalInformations {
        .title_container {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            h2 {
                margin: 0;
                font-size: 1.2rem;
            }
            .separator {
                width: 100%;
                height: 1px;
                background: $accentColor1;
            }

        }
        .practicalInformations_container {
            margin-top: 1rem;
            padding: 0 1rem;
            border: solid 1px rgba($darkColor, .1);
            border-radius: 5px;

            p {
                margin: 0;
                font-size: .95rem;
                line-height: 1.8;
            }
            .locationMap {
                display: none;
            }
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .EventPageSectionPracticalInformations {
            padding-top: 2rem;
            .title_container {

                h2 {
                    font-size: 1.5rem;
                }

            }
            .practicalInformations_container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                margin-top: 2rem;
                
                p {
                    font-size: 1rem;
                }
                .locationMap {
                    display: block;
                    padding: 1rem 0;
                }
            }
        }
    }
    
    
</style>