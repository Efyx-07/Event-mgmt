<template>

    <div class="backOfficeNewEventPage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="newEventPage">

            <header class="newEventPageHeader">
                <div class="newEventPageHeader_content">
                    <h1>Nouvel évènement</h1>
                    <BackToEventsButton class="backToEventsButton"/>
                    <MobileMenuIcon class="mobileMenuIcon"/>
                </div>
            </header>

            <div class="newEventOperations_container">

                <div class="newEventOperations">

                    <div class="newEventCreation-section newEventOperations-section">

                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Données de l'évènement</p>
                            <ReusableSeparator/>
                        </div>

                        <CreateEventForm class="createEventForm"/>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <BackOfficeNavMobile />
      
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import BackToEventsButton from '@/sub-components/BackToEventsButton.vue';
    import CreateEventForm from '@/components/CreateEventForm.vue';
    import MobileMenuIcon from '@/sub-components/MobileMenuIcon.vue';
    import BackOfficeNavMobile from '@/components/BackOfficeNavMobile.vue';
    import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';
    @import '@/assets/sass/mixins.scss';
    .backOfficeNewEventPage {
        @include backOfficePageStyle;
        .newEventPage {
            .newEventPageHeader {
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
            .newEventOperations_container {
                width: 100%;
                padding: 1rem 1rem 3rem 1rem;
                .newEventOperations {
                    background: $ultraLightColor;
                    box-shadow: $containerShadow;
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
                        }
                        .createEventForm {
                            @include adminForm;
                        }

                    }
                }
            }
            
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .backOfficeNewEventPage {
            display: grid;
            grid-template-columns: 1fr 3fr;
            .newEventPage {
                grid-column: 2 / -1;
                .newEventPageHeader {
                    @include headersBasicSettings;

                    &_content {
                        display: grid;
                        grid-template-columns: 6fr 1fr;
                        max-width: $contentMaxWidth;
                        
                        h1 {
                            grid-column: 1 / -2;
                            @include pageTitlesBasicSettings
                        }
                        .backToEventsButton {
                            display: block;
                            white-space: nowrap;
                        }
                    }
                }
                .newEventOperations_container {
                    padding: 2rem 3rem;
                    .newEventOperations {

                        &-section {
                            .sectionTitle_container {
                                .sectionTitle {
                                    white-space: nowrap;
                                }
                            }
                        }
                    }
                }    
            }
        }
    }
    
</style>
