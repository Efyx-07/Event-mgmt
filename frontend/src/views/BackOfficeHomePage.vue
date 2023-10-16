<template>

    <div class="backOfficeHomePage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

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
        <RemoveEventModal />

    </div>

    
    
</template>

<script setup>
    
    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import BackOfficeEventCard from '@/components/BackOfficeEventCard.vue'; 
    import RemoveEventModal from '@/components/RemoveEventModal.vue';
    import { Icon } from '@iconify/vue';
    import { useEventStore } from '@/stores/EventStore';
    import { computed } from 'vue';

    // permet de vérifier le nombre d'évènements créés
    const eventsCount = computed(() => {
        return useEventStore().events.length;
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

    .backOfficeHomePage {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        .adminHomePage {
            grid-column: 2 / -1;
            position:relative;
            min-height: 100vh;
            .adminHomePageHeader {
                background: $lightColor;
                box-shadow: $shadow;
                padding: 1rem 3rem;
                display: flex;
                justify-content: center;
                position: sticky;
                top: 0;
                z-index: 99;

                &_content {
                    display: grid;
                    align-items: center;
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                    width: 100%;
                    max-width: $contentMaxWidth;

                    h1 {
                    grid-column: 1 / -2;
                    margin: 0;
                    font-size: 2rem;
                    color: $darkColor;
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
                }
                .icon {
                    font-size: 6rem;
                }
            }
            .eventCards_container {
                padding: 2rem 3rem;
                display: flex;
                gap: 2rem;
                justify-content: center;
                flex-wrap: wrap;
            }
        }
    }
    

    
</style>
