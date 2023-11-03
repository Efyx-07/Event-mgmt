<template>

    <div class="eventCard">
        <div class="eventImage_container">
            <img :src="hostName + selectedEvent.image.source" alt="" class="eventImage">
        </div>
        <div class="eventCard-infos">
            <h1 class="eventTitle">{{ selectedEvent.title }}</h1>
            <div class="separator"></div>
            <div class="organizer_container">
                <div class="oganizerLogo_container">
                    <img class="organizerLogo" :src="hostName + selectedEvent.organizerLogo.source">
                </div>
                <div class="organizerName_container">
                    <p>Organisé par</p>
                    <a :href="selectedEvent.organizerWebsite" target="_blank" rel="noopener noreferrer">{{ selectedEvent.organizerName }}</a>
                </div>
            </div>
            <div class="separator"></div>
            <div class="eventCard-details">
                <div class="eventDate_container">
                    <Icon icon="healthicons:calendar" class="icon"/>
                    <p class="eventDate">{{ formatDate(selectedEvent.date)}}</p>
                </div>
                <div class="separator"></div>
                <div class="eventPlace_container">
                    <Icon icon="mdi:place-outline" class="icon"/>
                    <a :href="selectedEvent.locationUrl" target="_blank" rel="noopener noreferrer" class="eventPlace">{{ selectedEvent.location }}</a>
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
            .eventTitle {
                margin: 0;
                font-size: 1.3rem;
            }
            .separator {
                height: 1px;
                width: 100%;
                background: rgba($darkColor, .25);
                margin: .5rem 0;
            }
            .organizer_container {
                display: flex;
                align-items: center;
                gap: .5rem;
                .oganizerLogo_container {
                    max-width: 4rem;
                    height: 2rem;
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
                .organizerName_container {
                    display: flex;
                    align-items: baseline;
                    gap: .5rem;

                    p {
                        margin: 0;
                        font-size: .8rem;
                        font-style: italic;
                    }

                    a {
                        margin: 0;
                        font-size: .95rem;
                    }

                    a {
                        color: $darkColor;

                        &:hover {
                            color: $accentColor1; 
                        }
                    }
                }

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

                    p, a {
                        margin: 0;
                        font-size: .95rem;
                    }

                    a {
                        color: $darkColor;

                        &:hover {
                            color: $accentColor1; 
                        }
                    }
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
                gap: 1rem;
                .eventTitle {
                    font-size: 2rem;
                }
                .separator {
                    display: none;
                }
                .organizer_container {
                    .oganizerLogo_container {
                        height: 3rem;
                    }
                    .organizerName_container {
                        align-items: baseline;
                        
                        p {
                            font-size: .8rem;
                            font-style: italic;
                        }

                        a {
                            font-size: 1.1rem;
                        }
                    }
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

                        p, a {
                            font-size: 1.1rem;
                        }
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