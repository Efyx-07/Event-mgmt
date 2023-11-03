<template>

    <div class="EventPageSectionProgramme">
        <div class="title_container">
            <h2>Programme</h2>
            <div class="separator"></div>
        </div>
        <div class="programme_container">
            <p v-html="selectedEvent.programme"></p>
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
    .EventPageSectionProgramme {
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
        .programme_container {
            display: flex;
            justify-content: center;
            margin-top: 1rem;
            padding: 0 1rem;
            border: solid 1px rgba($darkColor, .1);
            border-radius: 5px;
            
            p {
                margin: 0;
                font-size: .95rem;
                line-height: 1.6;
            }
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .EventPageSectionProgramme {
            padding-top: 2rem;
            .title_container {
                gap: 1rem;
                
                h2 {
                    font-size: 1.5rem;
                }

            }
            .programme_container {
                margin-top: 2rem;
                padding: 2rem 0;
                display: grid;
                grid-template-columns: 1fr 2fr 1fr;
                border: solid 1px rgba($darkColor, .1);
                border-radius: 5px;
                
                p {
                    grid-column: 2 / -2;
                    font-size: 1rem;
                }
            }
        }
    }
    
    
</style>