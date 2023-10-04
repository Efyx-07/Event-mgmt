<template>

    <div class="eventCard">
        <div class="eventImage-container">
            <img src="src/assets/images/Event1-banner.jpg" alt="" class="eventImage">
        </div>
        <div class="eventCard-infos">
            <EventTitle />
            <div class="eventCard-details">
                <div class="eventDate-container">
                    <Icon icon="healthicons:calendar" class="icon"/>
                    <p class="eventDate">Mercredi 22 Novembre 2023</p>
                </div>
                <div class="eventPlace-container">
                    <Icon icon="mdi:place-outline" class="icon"/>
                    <p class="eventPlace">Lille Grand Palais</p>
                </div>
                <ParticipateButton class="eventCard-button"/>
            </div>
        </div>
    </div>

</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import EventTitle from '@/sub-components/EventTitle.vue';
    import ParticipateButton from '@/sub-components/ParticipateButton.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .eventCard {
        margin-top: 3rem;
        background: $ultraLightColor;
        border-radius: $containerRadius;
        box-shadow: $shadow;
        width: 100%;
        .eventImage-container {
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
                .eventDate-container {
                    grid-column: 1 / -3;
                }
                .eventPlace-container {
                    grid-column: 2 / -2;
                }
                .eventDate-container, .eventPlace-container {
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