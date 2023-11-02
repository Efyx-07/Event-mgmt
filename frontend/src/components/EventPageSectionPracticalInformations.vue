<template>

    <div class="EventPageSectionPracticalInformations">
        <div class="title_container">
            <h2>Informations Pratiques</h2>
            <div class="separator"></div>
        </div>
        <div class="practicalInformations_container">
            <p v-html="selectedEvent.practicalInformations"></p>
        </div>
    </div>
    
</template>

<script setup>

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
                background: rgba($accentColor1, .25);
            }

        }
        .practicalInformations_container {
            
            p {
                margin: 0;
                font-size: .95rem;
                line-height: 1.8;
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
                padding: 2rem 0;
                
                p {
                    font-size: 1rem;
                }
            }
        }
    }
    
    
</style>