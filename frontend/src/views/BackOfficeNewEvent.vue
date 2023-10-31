<template>

    <div class="backOfficeNewEventPage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="newEventPage">

            <header class="newEventPageHeader">
                <div class="newEventPageHeader_content">
                    <h1>Nouvel évènement</h1>
                    <BackToEventsButtonVue class="backToEventsButton"/>
                </div>
            </header>

            <div class="newEventOperations_container">

                <div class="newEventOperations">

                    <div class="newEventCreation-section newEventOperations-section">

                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Données de l'évènement</p>
                            <div class="line"></div>
                        </div>

                        <CreateEventForm class="createEventForm"/>

                    </div>

                </div>

            </div>

        </div>

    </div>
      
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import BackToEventsButtonVue from '@/sub-components/BackToEventsButton.vue';
    import CreateEventForm from '@/components/CreateEventForm.vue'

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';
    .backOfficeNewEventPage {
        display: grid;
        grid-template-columns: 1fr 3fr;
        .newEventPage {
            grid-column: 2 / -1;
            .newEventPageHeader {
                @include headersBasicSettings;

                &_content {
                    display: grid;
                    align-items: center;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                    width: 100%;
                    max-width: $contentMaxWidth;
                    
                    h1 {
                        grid-column: 1 / -2;
                        @include pageTitlesBasicSettings
                    }
                }
            }
            .newEventOperations_container {
                width: 100%;
                padding: 2rem 3rem;
                .newEventOperations {
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
                                white-space: nowrap;
                            }

                            .line {
                                width: 100%;
                                height: 1px;
                                background: $accentColorBackof3;
                            }
                        }
                        .createEventForm {
                            align-self: center;
                            margin-top: 3rem;
                        }

                    }
                }
            }
            
        }
    }
    
</style>
