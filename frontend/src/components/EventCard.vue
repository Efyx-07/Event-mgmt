<template>

    <div class="eventCard">
        <div class="eventImage_container">
            <img :src="hostName + selectedEvent.image.source" alt="" class="eventImage">
        </div>
        <div class="eventCard-infos">
            <h1 class="eventTitle">{{ selectedEvent.title }}</h1>
            <div class="eventCard-details">
                <div class="eventOrganizer_container">
                    <div class="content">
                        <p>Organisé par</p>
                        <a :href="selectedEvent.organizerWebsite" target="_blank" rel="noopener noreferrer">{{ selectedEvent.organizerName }}</a>
                    </div>    
                </div>
                <div class="separator"></div>
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
            gap: 1rem;
            padding: 1rem;
            .eventTitle {
                margin: 0;
                font-size: 1.3rem;
            }
            .separator {
                height: 1px;
                width: 100%;
                background: rgba($darkColor, .25);
            }
            .eventCard-details {
                display: flex;
                flex-direction: column;
                gap: .5rem;  
                .eventOrganizer_container, .eventDate_container, .eventPlace_container {
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
                        color: rgba($darkColor, .8);

                        &:hover {
                            color: $accentColor1; 
                        }
                    }
                }
                .eventOrganizer_container {
                    
                    .content {
                        display: flex;
                        gap: .5rem;
                        align-items: baseline;
                    }
                    p {
                        font-style: italic;
                        font-size: .7rem;
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
                height: 30rem;
            }

            &-infos {
                gap: 1.5rem;
                .eventTitle {
                    font-size: 2rem;
                }
                .separator {
                    display: none;
                }
                .eventCard-details {
                    flex-direction: row;
                    justify-content: space-between;
                    .eventOrganizer_container {

                        p {
                            font-size: .8rem;
                        }

                        a {
                            font-size: 1.1rem;
                        }
                    }
                    .eventDate_container, .eventPlace_container {
                        display: flex;
                        align-items: center;
                        gap: .5rem;
                        .icon {
                            font-size: 2.5rem;
                        }

                        p, a {
                            font-size: 1.1rem;
                        }
                    }
                    .eventCard-button {
                        display: block;
                        align-self: center;
                        justify-self: end;
                    }
                }
            }
        }
    }

</style>