<template>

    <div class="backOfficeEventHandlingPage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="eventHandlingPage">

            <header class="eventHandlingPageHeader">
                <div class="eventHandlingPageHeader_content">
                    <h1>Modifier votre évènement</h1>
                    <BackToEventsButtonVue class="backToEventsButton"/>
                    <MobileMenuIcon />
                </div>
            </header>

            <div class="eventHandlingOperations_container">

                <div class="eventHandlingOperations">

                    <div class="eventHandlingOperations-section">

                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Modifier les données de l'évènement</p>
                            <ReusableSeparator/>
                        </div>
                        <h2>{{ selectedEvent.title }}</h2>

                        <UpdateEventForm class="eventHandlingForm" :selectedEvent="selectedEvent"/>

                    </div>

                </div>
                
            </div>

        </div>

    </div>

    <BackOfficeNavMobile />
       
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import BackToEventsButtonVue from '@/sub-components/BackToEventsButton.vue';
    import UpdateEventForm from '@/components/UpdateEventForm.vue';
    import MobileMenuIcon from '@/sub-components/MobileMenuIcon.vue';
    import BackOfficeNavMobile from '@/components/BackOfficeNavMobile.vue';
    import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

    import { useEventStore } from '@/stores/EventStore';
    import { useRoute } from 'vue-router';

    const eventStore = useEventStore();
    const allEvents = eventStore.events;

    const route = useRoute();

    const eventSlug = route.params.eventSlug; // récupère le slug de la route

    // compare pour faire correspondre les slugs
    const selectedEvent = allEvents.find((event) => {
        return event.slug === eventSlug;
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/backOfficeEventHandlingPageStyle.scss';
    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';

    h2 {
        font-size: 1.3rem;
        margin: 3rem 0 0 0;
        padding: .5rem;
        text-align: center;
        background: $darkColorBackOf;
        color: $lightColor;
        border-radius: 10px;

        @media screen and (min-width: $breakpointDesktop) {

            font-size: 1.5rem;
            width: 75%;
            align-self: center;

        }
                            
    }
    
    
</style>
