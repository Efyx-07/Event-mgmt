<template>

    <div class="stickyBar_container">
        <div class="stickyBar">
            <div class="thumbnail_container">
                <img :src="hostName + selectedEvent.image.source" alt="" class="thumbnail">
            </div>
            <h1 class="eventTitle">{{ selectedEvent.title }}</h1>
            <ParticipateButton class="eventCard-button"/>
        </div>
    </div>

</template>

<script setup>

    import ParticipateButton from '@/sub-components/ParticipateButton.vue';

    import { useGlobalDataStore } from '@/stores/GlobalDataStore';

    const { hostName } = useGlobalDataStore();

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
            padding: 1rem;
            background: $ultraLightColor;
            box-shadow: $containerShadow;
            .thumbnail_container {
                width: 3rem;
                height: 3rem;
                display: inline-block;
                position: relative;
                overflow: hidden;
                border-radius: $containerRadius;
                .thumbnail {
                    width: 100%;
                    height: 100%;
                    display: block;
                    position: relative;
                    object-fit: cover;
                }
            }

            h1 {
                margin: 0;
                font-size: 1.7rem;
            }
        }
    }

</style>