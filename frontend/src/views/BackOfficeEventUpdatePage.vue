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
                        <div class="eventImageAndTitle_container">
                            <img :src="hostName + selectedEvent.image.source" alt="" class="eventImage">
                            <div class="eventTitle_container">
                                <h1 class="eventTitle">{{ selectedEvent.title }}</h1>
                            </div>
                        </div>

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
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import { useRoute } from 'vue-router';

    const eventStore = useEventStore();
    const { hostName } = useGlobalDataStore();
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

    .eventImageAndTitle_container {
        margin: 3rem 0 0 0;
        align-self: center;
        width: 100%;
        display: inline-block;
        position: relative;
        overflow: hidden;
        border-radius: $containerRadius;
        .eventImage {
            width: 100%;
            height: 100%;
            display: block;
            position: relative;
            object-fit: cover;
        }
        .eventTitle_container {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50%;
            background: linear-gradient(to top, $darkColor, transparent);
            .eventTitle {
                margin: 0;
                font-size: 1.3rem;
                text-align: center;
                color: $lightColor;
                text-shadow: 1px 1px 5px $darkColor;
                position: absolute;
                bottom: 0;
                left: 0;
                padding: .5rem;
            }
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .eventImageAndTitle_container {
            width: 75%;
            height: 18rem;
            .eventTitle_container {
                .eventTitle {
                    font-size: 2rem;
                    padding: 1rem;
                }
            }
        }
    }
    
    
</style>
