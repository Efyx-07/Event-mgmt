<template>

    <div class="eventPage-section">
        <div class="title_container">
            <h2>Informations Pratiques</h2>
            <ReusableSeparator class="separator"/>
        </div>
        <div class="text_container">
            <p v-html="selectedEvent.practicalInformations"></p>
            <EventPageLocationMap :selectedEvent="selectedEvent" class="locationMap"/>
        </div>
    </div>
    
</template>

<script setup>

    import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';
    import EventPageLocationMap from '@/components/EventPageLocationMap.vue';

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/eventPageSectionsStyle.scss';
    @import '@/assets/sass/varMediaQueries.scss';
    .eventPage-section {
        .text_container {
            display: flex;
            flex-wrap: wrap;
            padding: 0 1rem 1rem 1rem;

            p {
                line-height: 1.8;
            }
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .eventPage-section {
            .text_container {
                gap: 2rem;
                padding: 0 1rem;
                
                p {
                    flex: 1;
                }
                .locationMap {
                    flex: 1;
                    padding: 1rem 0;
                }
            }
        }
    }
    
    
</style>