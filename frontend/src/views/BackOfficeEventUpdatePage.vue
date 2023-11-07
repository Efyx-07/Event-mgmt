<template>

    <div class="backOfficeEventUpdatePage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="eventUpdatePage">

            <header class="eventUpdatePageHeader">
                <div class="eventUpdatePageHeader_content">
                    <h1>Modifier votre évènement</h1>
                    <BackToEventsButtonVue class="backToEventsButton"/>
                    <MobileMenuIcon class="mobileMenuIcon"/>
                </div>
            </header>

            <div class="updateEventOperations_container">

                <div class="updateEventOperations">

                    <div class="updateEventOperations-section">

                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Modifier les données de l'évènement</p>
                            <div class="line"></div>
                        </div>
                        <h2>{{ selectedEvent.title }}</h2>

                        <UpdateEventForm class="updateEventForm" :selectedEvent="selectedEvent"/>

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
    @import '@/assets/sass/varMediaQueries.scss';
    @import '@/assets/sass/mixins.scss';
    .backOfficeEventUpdatePage {
        .eventUpdatePage {
            .eventUpdatePageHeader {
                @include headersMobileBasicSettings;

                &_content {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    
                    h1 {
                        margin: 0;
                        font-size: 1.5rem;
                    }
                    .backToEventsButton {
                        display: none;
                    }
                }
            }
            .updateEventOperations_container {
                width: 100%;
                padding: 1rem 1rem 3rem 1rem;
                .updateEventOperations {
                    background: $ultraLightColor;
                    box-shadow: $shadow;
                    border-radiuS: $containerRadius;
                    padding: 2rem 2rem 4rem 2rem;
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
                            }
                            .line {
                                width: 100%;
                                height: 1px;
                                background: $accentColorBackof3;
                            }
                        }

                        h2 {
                            font-size: 1.3rem;
                            margin: 3rem 0 0 0;
                            padding: 1rem;
                            text-align: center;
                            background: $darkColorBackOf;
                            color: $lightColor;
                        }
                        .updateEventForm {
                            @include adminForm;
                        }

                    }
                }
            }
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .backOfficeEventUpdatePage {
            display: grid;
            grid-template-columns: 1fr 3fr;
            .eventUpdatePage {
                grid-column: 2 / -1;
                .eventUpdatePageHeader {
                    @include headersBasicSettings;

                    &_content {
                        display: grid;
                        grid-template-columns: 6fr 1fr;
                        max-width: $contentMaxWidth;
                        
                        h1 {
                            grid-column: 1 / -2;
                            @include pageTitlesBasicSettings;
                        }
                        .backToEventsButton {
                            display: block;
                            white-space: nowrap;
                        }
                    }
                }
                .updateEventOperations_container {
                    padding: 2rem 3rem;
                    .updateEventOperations {

                        &-section {
                            .sectionTitle_container {
                                .sectionTitle {
                                    white-space: nowrap;
                                }
                            }

                            h2 {
                                font-size: 1.5rem;
                                width: 75%;
                                align-self: center;
                            }

                        }
                    }
                }
            }
        }
    }
    
</style>
