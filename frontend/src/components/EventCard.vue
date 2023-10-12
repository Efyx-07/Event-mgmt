<template>

    <div class="eventCard">
        <div class="eventImage_container">
            <img :src="hostName + selectedEvent.image.source" alt="" class="eventImage">
        </div>
        <div class="eventCard-infos">
            <h1 class="eventTitle">{{ selectedEvent.title }}</h1>
            <div class="eventCard-details">
                <div class="eventDate_container">
                    <Icon icon="healthicons:calendar" class="icon"/>
                    <p class="eventDate">{{ selectedEvent.date}}</p>
                </div>
                <div class="eventPlace_container">
                    <Icon icon="mdi:place-outline" class="icon"/>
                    <p class="eventPlace">{{ selectedEvent.location }}</p>
                </div>
                <ParticipateButton class="eventCard-button"/>
            </div>
        </div>
    </div>

</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import ParticipateButton from '@/sub-components/ParticipateButton.vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';

    const { hostName } = useGlobalDataStore();

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .eventCard {
        margin-top: 3rem;
        background: $ultraLightColor;
        border-radius: $containerRadius;
        box-shadow: $shadow;
        width: 100%;
        .eventImage_container {
            width: 100%;
            height: 25rem;
            display: inline-block;
            position: relative;
            overflow: hidden;
            border-radius: $containerRadius $containerRadius 0 0;
            .eventImage {
                width: 100%;
                height: 100%;
                display: block;
                position: relative;
                object-fit: cover;
            }
        }

        &-infos {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            gap: 1rem;
            .eventCard-details {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                .eventDate_container {
                    grid-column: 1 / -3;
                }
                .eventPlace_container {
                    grid-column: 2 / -2;
                }
                .eventDate_container, .eventPlace_container {
                    display: flex;
                    align-items: center;
                    gap: .5rem;
                    .icon {
                        font-size: 3rem;
                        color: $accentColor1;
                    }

                    p {
                        margin: 0;
                        font-size: 1.1rem;
                    }
                }
                .eventCard-button {
                    grid-column: 3 / -1;
                    align-self: center;
                    justify-self: end;
                }
            }
        }
    }

</style>