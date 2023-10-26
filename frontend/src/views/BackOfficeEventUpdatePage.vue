<template>

    <div class="backOfficeEventUpdatePage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="eventUpdatePage">

            <header class="eventUpdatePageHeader">
                <div class="eventUpdatePageHeader_content">
                    <h1>Modifier votre évènement</h1>
                    <BackToEventsButtonVue class="backToEventsButton"/>
                </div>
            </header>

            <div class="updateEventOperations_container">

                <div class="updateEventOperations">

                    <div class="updateEventOperations-section">

                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Modifier les données de l'évènement: {{ selectedEvent.title }}</p>
                            <div class="line"></div>
                        </div>

                        <UpdateEventForm class="updateEventForm" :selectedEvent="selectedEvent"/>

                    </div>

                </div>
                
            </div>

        </div>

    </div>
    
    
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import BackToEventsButtonVue from '@/sub-components/BackToEventsButton.vue';
    import UpdateEventForm from '@/components/UpdateEventForm.vue';

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

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';
    .backOfficeEventUpdatePage {
        display: grid;
        grid-template-columns: 1fr 3fr;
        .eventUpdatePage {
            grid-column: 2 / -1;
            display: flex;
            flex-direction: column;
            align-items: center;

            .eventUpdatePageHeader {
                @include headersBasicSettings;

                &_content {
                    display: grid;
                    align-items: center;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                    width: 100%;
                    max-width: $contentMaxWidth;
                    
                    h1 {
                        grid-column: 1 / -2;
                        @include pageTitlesBasicSettings;
                    }
                }
            }

            &_content {
                width: 100%;
                padding: 3rem;
                max-width: $contentMaxWidth;
            }
            .updateEventOperations_container {
                width: 100%;
                padding: 2rem 3rem;
                .updateEventOperations {
                    background: $ultraLightColor;
                    box-shadow: $shadow;
                    border-radiuS: $containerRadius;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;

                    &-section {
                        display: flex;
                        flex-direction: column;
                        .sectionTitle_container {
                            display: flex;
                            align-items: baseline;
                            gap: 1rem;

                            .sectionTitle {
                                margin: 0;
                                font-size: 1.25rem;
                                font-weight: 700;
                                white-space: nowrap;
                            }

                            .line {
                                width: 100%;
                                height: 1px;
                                background: $accentColorBackof3;
                            }
                        }
                        .updateEventForm {
                            align-self: center;
                            margin-top: 3rem;
                        }

                    }
                }
            }
        }
    }
    
</style>
