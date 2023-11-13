<template>

    <div class="eventCard">

        <div class="eventImageAndTitle_container">
            <img :src="hostName + selectedEvent.image.source" alt="" class="eventImage">
            <div class="eventTitle_container">
                <h1 class="eventTitle">{{ selectedEvent.title }}</h1>
            </div>
        </div>
        
        <div class="eventCard-details">
            <div class="eventOrganizer_container">
                <div class="content">
                    <p>Organisé par</p>
                    <a :href="selectedEvent.organizerWebsite" target="_blank" rel="noopener noreferrer">{{ selectedEvent.organizerName }}</a>
                </div>    
            </div>
            <ReusableSeparator class="separator"/>
            <div class="eventDate_container">
                <Icon icon="healthicons:calendar" class="icon"/>
                <p class="eventDate">{{ formatDate(selectedEvent.date)}}</p>
            </div>
            <ReusableSeparator class="separator"/>
            <div class="eventPlace_container">
                <Icon icon="mdi:place-outline" class="icon"/>
                <a :href="selectedEvent.locationUrl" target="_blank" rel="noopener noreferrer" class="eventPlace">{{ selectedEvent.location }}</a>
            </div>
            <ParticipateButton class="eventCard-button"/>
        </div>
        
    </div>

</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import ParticipateButton from '@/sub-components/ParticipateButton.vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

    const { hostName } = useGlobalDataStore();

    // reformate la date sous la forme 'ven. 7 juillet 2023'
    const formatDate = (date) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
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
        color: $darkColor;
        box-shadow: $containerShadow;
        width: 100%;
        .eventImageAndTitle_container {
            width: 100%;
            height: 13rem;
            display: inline-block;
            position: relative;
            overflow: hidden;
            .eventImage {
                width: 100%;
                height: 100%;
                display: block;
                position: relative;
                object-fit: cover;
            }
            .eventTitle_container {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 50%;
                background: linear-gradient(to top, $darkColor, transparent);
                .eventTitle {
                    margin: 0;
                    font-size: 1.3rem;
                    color: $lightColor;
                    text-shadow: 1px 1px 5px $darkColor;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    padding: 1rem;
                }
            }
        }
        .eventCard-details {
            display: flex;
            flex-direction: column;
            gap: 1rem;  
            padding: 1rem;
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

    @media screen and (min-width: $breakpointTablet) {
        .eventCard {
            border-radius: $containerRadiusM;
            .eventImageAndTitle_container {
                height: 20rem;
                border-radius: $containerRadiusM $containerRadiusM 0 0;
                .eventTitle_container {
                    .eventTitle {
                        font-size: 1.5rem;
                    }
                }
                
            }
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .eventCard {
            margin-top: 2rem;
            .eventImageAndTitle_container {
                height: 25rem;
                .eventTitle_container {
                    .eventTitle {
                        font-size: 2rem;
                    }
                }
            }
            .eventCard-details {
                gap: 1.5rem;
                flex-direction: row;
                justify-content: space-between;
                .separator {
                    display: none;
                }
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

</style>