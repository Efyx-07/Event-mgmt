<template>

    <div class="eventPage-section">
        <div class="title_container">
            <h2>Présentation</h2>
            <ReusableSeparator class="separator"/>
        </div>
        <div class="text_container">
            <p v-html="selectedEvent.presentation"></p>
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
    .eventPage-section {
        .text_container {
                
            p {
                line-height: 1.8;
                text-align: justify;
            }
        }
    }
    
     
</style>
