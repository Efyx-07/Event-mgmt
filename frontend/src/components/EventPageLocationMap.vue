<template>

    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10494.127685897449!2d2.364546728166933!3d48.88619910106311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66dd75390f999%3A0x7214db08363c60a1!2sVillette%2C%2075019%20Paris!5e0!3m2!1sfr!2sfr!4v1698937822877!5m2!1sfr!2sfr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</template>

<script setup>

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

</script>

<style lang="scss" scoped>
</style>