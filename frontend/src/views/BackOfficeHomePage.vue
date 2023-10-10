<template>

    <div class="adminHomePage">
        <header class="adminHomePageHeader">
            <div class="adminHomePageHeader_content">
                <h1>Vos évènements</h1>
                <router-link to="/admin_new-event" type="submit" class="toNewEvent_button" v-if="eventsCount >= 1">
                    <p>Nouvel évènement</p>
                </router-link>
            </div>
        </header>

        <div v-if="eventsCount === 0" class="adminHomePage_empty">
            <p>Il n'y a aucun évènement pour l'instant</p>
            <router-link to="/admin_new-event" type="submit" class="toNewEvent_button">
                <p>Créez votre 1er évènement</p>
            </router-link>
        </div>

        <div class="eventCards_container">
            <BackOfficeEventCard />
        </div>
    </div>
    
</template>

<script setup>
    
    import BackOfficeEventCard from '@/components/BackOfficeEventCard.vue'; 
    import { useEventStore } from '@/stores/EventStore';
    import { computed } from 'vue';

    // permet de vérifier le nombre d'évènements créés
    const eventsCount = computed(() => {
        return useEventStore().events.length;
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .adminHomePage {
        position:relative;
        min-height: 100vh;
        .adminHomePageHeader {
            background: $darkColorBackOf;
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
                font-size: 6rem;
                color: $lightColor;
                }
                .toNewEvent_button {
                    text-decoration: none;
                    justify-self: center;
                    background: $darkColorBackOf;
                    border: 2px solid $lightColor;
                    cursor: pointer;

                    &:hover {
                        background: $accentColorBackof2;
                    }
                    
                    p {
                        margin: 0;
                        color: $lightColor;
                        font-size: 1.4rem;
                        font-weight: 700;
                        padding: 1rem 2rem;
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
            .toNewEvent_button {
                    text-decoration: none;
                    justify-self: center;
                    background: transparent;
                    color: $darkColorBackOf;
                    border: 2px solid $darkColorBackOf;
                    cursor: pointer;

                    &:hover {
                        border-color: $accentColorBackof2;
                        color: $accentColorBackof2;
                    }

                    p {
                        margin: 0;
                        font-size: 1.4rem;
                        font-weight: 700;
                        padding: 1rem 2rem;
                    }
                        
                }

        }
        .eventCards_container {
            padding: 3rem;
            display: flex;
            gap: 2rem;
            justify-content: center;
            flex-wrap: wrap;
        }
    }

    
</style>
