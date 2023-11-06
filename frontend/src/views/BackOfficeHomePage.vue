<template>

    <div class="backOfficeHomePage">

        <BackOfficeNavAside />

        <div class="adminHomePage">

            <header class="adminHomePageHeader">

                <div class="adminHomePageHeader_content">
                    <h1>Vos évènements</h1>
                    <div class="eventsCountMention_container">
                        <div class="eventsCountMention">
                            <p v-if="eventsCount >= 1"> {{ eventsCount }}</p> 
                            <p v-if="eventsCount === 1">évènement créé</p>
                            <p v-if="eventsCount >= 2">évènements créés</p>
                        </div>
                    </div>
                    <MobileMenuIcon class="mobileMenuIcon"/>
                </div>

            </header>

            <div v-if="eventsCount === 0" class="adminHomePage_empty">
                <p>Il n'y a aucun évènement pour l'instant...</p>
                <Icon icon="streamline-emojis:magnifying-glass-tilted-left"  class="icon"/>
                <router-link to="/admin_new-event" type="submit" class="toNewEvent_button">
                    <p>Créez votre 1er évènement</p>
                </router-link>
            </div>

            <div class="eventCards_container" v-if="eventsCount >= 1">
                <BackOfficeEventCard />
            </div>
        </div>
        <RemoveEventConfirmationModal />

    </div>

    
    
</template>

<script setup>
    
    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import BackOfficeEventCard from '@/components/BackOfficeEventCard.vue'; 
    import RemoveEventConfirmationModal from '@/components/RemoveEventConfirmationModal.vue';
    import MobileMenuIcon from '@/sub-components/MobileMenuIcon.vue';
    import { Icon } from '@iconify/vue';
    import { useEventStore } from '@/stores/EventStore';
    import { computed, onMounted } from 'vue';

    // permet de vérifier le nombre d'évènements créés
    const eventsCount = computed(() => {
        return useEventStore().events.length;
    });

    // appel de la fonction de tri par date de creation (du plus récent au plus ancien) au moment du chargement des données
    onMounted(() => {
        useEventStore().sortEventByCreationDateNewToOld();
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';
    @import '@/assets/sass/mixins.scss';

    .backOfficeHomePage {
        .adminHomePage {
            position:relative;
            min-height: 100vh;
            .adminHomePageHeader {
                @include headersMobileBasicSettings;

                &_content {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    h1 {
                        margin: 0;
                    }

                    .eventsCountMention_container {
                        display: none;
                    }
                }

            }
            .adminHomePage_empty {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2rem;

                p {
                    margin: 0;
                    font-size: 1.4rem;
                    text-align: center;
                }
                .icon {
                    font-size: 6rem;
                }
                .toNewEvent_button {
                    text-decoration: none;
                    border: none;
                    background: $darkColorBackOf;
                    cursor: pointer;

                    &:hover {
                        background: $accentColorBackof2;
                    }

                    p {
                        margin: 0;
                        color: $lightColor;
                        font-size: 1.1rem;
                        font-weight: 700;
                        padding: .5rem;
                    }
                        
                }
            }
            .eventCards_container {
                padding: 1rem 1rem 3rem 1rem;
                display: flex;
                gap: 2rem;
                justify-content: center;
                flex-wrap: wrap;
            }
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .backOfficeHomePage {
            display: grid;
            grid-template-columns: 1fr 3fr;
            .adminHomePage {
                grid-column: 2 / -1;
                .adminHomePageHeader {
                    @include headersBasicSettings;

                    &_content {
                        display: grid;
                        align-items: center;
                        grid-template-columns: 1fr 1fr 1fr 1fr;
                        max-width: $contentMaxWidth;

                        h1 {
                            grid-column: 1 / -2;
                            @include pageTitlesBasicSettings;
                        }

                        .eventsCountMention_container {
                            grid-column: 4 / -1;
                            display: flex;
                            justify-content: end;
                            width: 100%;
                            .eventsCountMention {
                                display: flex;
                                gap: .3rem;

                                p {
                                    margin: 0;
                                }
                            }
                        }
                    }

                }
                .adminHomePage_empty {
                    .toNewEvent_button {

                        p {
                            font-size: 1.3rem;
                            padding: .7rem 1rem;
                        }
                        
                    }
                }
                .eventCards_container {
                    padding: 2rem 3rem;
                }
            }
        }

    }
    

    
</style>
