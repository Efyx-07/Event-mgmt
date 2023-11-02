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
                    <p class="eventDate">{{ formatDate(selectedEvent.date)}}</p>
                </div>
                <div class="separator"></div>
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

    // reformate la date sous la forme 'ven. 7 juillet 2023'
    const formatDate = (date) => {
        const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    };

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';

    .eventCard {
        background: $ultraLightColor;
        border-radius: $containerRadius;
        box-shadow: $shadow;
        width: 100%;
        .eventImage_container {
            width: 100%;
            height: 16rem;
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
            .eventTitle {
                margin: 0;
                font-size: 1.2rem;
            }
            .eventCard-details {
                display: flex;
                flex-direction: column;  
                .eventDate_container, .eventPlace_container {
                    display: flex;
                    align-items: center;
                    gap: .5rem;
                    .icon {
                        font-size: 2rem;
                        color: $accentColor1;
                    }

                    p {
                        margin: 0;
                        font-size: .95rem;
                    }
                }
                .separator {
                    height: 1px;
                    width: 100%;
                    background: rgba($darkColor, .25);
                    margin: .3rem 0;
                }
                .eventCard-button {
                    display: none;
                }
            }
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .eventCard {
            margin-top: 3rem;
            .eventImage_container {
                height: 25rem;
            }

            &-infos {
                .eventTitle {
                    font-size: 2rem;
                }
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
                        }

                        p {
                            font-size: 1.1rem;
                        }
                    }
                    .separator {
                        display: none;
                    }
                    .eventCard-button {
                        display: block;
                        grid-column: 3 / -1;
                        align-self: center;
                        justify-self: end;
                    }
                }
            }
        }
    }

</style>