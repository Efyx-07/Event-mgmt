<template>
    
    <div class="organizerLogo_container">
        <a :href="selectedEvent.organizerWebsite" target="_blank" rel="noopener noreferrer">
            <img class="organizerLogo" :src="hostName + selectedEvent.organizerLogo.source">
        </a>
    </div>

</template>

<script setup>

    import { useGlobalDataStore } from '@/stores/GlobalDataStore';

    const { hostName } = useGlobalDataStore();

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .organizerLogo_container {
        width: 100%;
        height: 4rem;
        display: inline-block;
        position: relative;
        overflow: hidden;
        .organizerLogo {
            max-width: 100%;
            height: 100%;
            display: block;
            position: relative;
            object-fit: contain;
        }
    }
    
</style>