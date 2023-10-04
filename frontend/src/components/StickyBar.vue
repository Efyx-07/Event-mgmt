<template>

    <div class="sticky-bar">
        <EventTitle />
        <ParticipateButton />
    </div>

</template>

<script setup>

    import EventTitle from '@/sub-components/EventTitle.vue';
    import ParticipateButton from '@/sub-components/ParticipateButton.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

    .sticky-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        background: $ultraLightColor;
        border-radius: $containerRadius;
        box-shadow: $shadow;
    }

</style>