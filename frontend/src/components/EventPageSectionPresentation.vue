<template>

    <div class="EventPageSectionPresentation">
        <div class="title_container">
            <h2>Présentation</h2>
            <div class="separator"></div>
        </div>
        <div class="presentation_container">
            <p v-html="selectedEvent.presentation"></p>
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
    .EventPageSectionPresentation {
            .title_container {
                display: flex;
                flex-direction: column;
                gap: .5rem;

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
            .presentation_container {
                margin-top: 1rem;
                padding: 0 1rem;
                border: solid 1px rgba($darkColor, .1);
                border-radius: 5px;
                
                p {
                    margin: 0;
                    font-size: .95rem;
                    line-height: 1.8;
                    text-align: justify;
                }
            }
        }

    @media screen and (min-width: $breakpointDesktop) {
        .EventPageSectionPresentation {
            padding-top: 2rem;
            .title_container {
                gap: 1rem;
                
                h2 {
                    font-size: 1.5rem;
                }

            }
            .presentation_container {
                margin-top: 2rem;
                
                p {
                    font-size: 1rem;
                }
            }
        }
    }
    
     
</style>
