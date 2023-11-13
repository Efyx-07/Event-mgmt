<template>

    <div class="eventPage-section">
        <div class="title_container">
            <h2>Programme</h2>
            <ReusableSeparator class="separator"/>
        </div>
        <div class="text_container">
            <p v-html="selectedEvent.programme"></p>
        </div>
    </div>
    
</template>

<script setup>

    import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/eventPageSectionsStyle.scss';
    @import '@/assets/sass/varMediaQueries.scss';
    .eventPage-section {
        .text_container {
            display: flex;
            justify-content: center;
            
            p {
                line-height: 1.6;
            }
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .eventPage-section {
            .text_container {
                padding: 1rem 0;
                display: grid;
                grid-template-columns: 1fr 2fr 1fr;
                
                p {
                    grid-column: 2 / -2;
                }
            }
        }
    }
    
    
</style>