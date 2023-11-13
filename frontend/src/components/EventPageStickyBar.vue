<template>

    <div class="stickyBar_container">
        <div class="stickyBar">
            <h1 class="eventTitle">{{ selectedEvent.title }}</h1>
            <ParticipateButton class="eventCard-button"/>
        </div>
    </div>

</template>

<script setup>

    import ParticipateButton from '@/sub-components/ParticipateButton.vue';

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .stickyBar_container {
        width: 100%;
        max-width: 77rem;
        padding: 0 1rem;
        .stickyBar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 2rem;
            background: $ultraLightColor;
            color: $darkColor;
            border-radius: 0 0 $containerRadiusS $containerRadiusS;
            box-shadow: $containerShadow;

            h1 {
                margin: 0;
                font-size: 1.7rem;
            }
        }
    }

</style>