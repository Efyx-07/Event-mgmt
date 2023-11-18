<template>
    <div class="header">

        <div class="content">

            <EventPageOrganizerLogo :selectedEvent="selectedEvent"/>
            <EventPageNavigation class="eventPageNavigation"/>

        </div>
        
    </div>

</template>

<script setup>

    import EventPageOrganizerLogo from '@/sub-components/EventPageOrganizerLogo.vue'
    import EventPageNavigation from '@/sub-components/EventPageNavigation.vue';

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';

    .header {
        width: 100%;
        height: 3.5rem;
        background: $lightColor;
        box-shadow: $shadow;
        display: flex;
        justify-content: center;
        position: sticky;
        top: 0;
        z-index: 199;
        .content {
            width: 100%;
            display: flex;
            align-items: center;
            padding: 0 1rem;
            .eventPageNavigation {
                display: none;
            }
        }       
    }

    @media screen and (min-width: $breakpointDesktop) {
        .header {
            position: unset;
            height: 5rem;
            .content {
                max-width: 77rem;
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 0 1rem;
                .eventPageNavigation {
                    display: flex;
                }
            }       
        }
    }
    

</style>