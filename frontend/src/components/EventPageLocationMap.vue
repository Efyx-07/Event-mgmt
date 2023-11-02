<template>

    <iframe :src="selectedEvent.locationUrl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
</template>

<script setup>

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

</script>

<style lang="scss" scoped>
</style>