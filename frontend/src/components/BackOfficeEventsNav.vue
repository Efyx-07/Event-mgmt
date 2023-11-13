<template>

    <div id="eventsNav" class="boHeaderNav" v-if="eventsCount >= 1">
        <div class="navItem" @click="displayAllEvents" :class="{ 'active-link': currentFilter === 'all' }">
            <p>Tous <span>({{ eventsCount }})</span></p>
            <div class="activeBar"></div>
        </div>
        <div class="navItem" @click="displayOnlyUpcomingEvents" :class="{ 'active-link': currentFilter === 'upcoming' }">
            <p>A venir <span>({{ upcomingEventsCount }})</span></p>
            <div class="activeBar"></div>
        </div>
        <div class="navItem" @click="displayOnlyPastEvents" :class="{ 'active-link': currentFilter === 'past' }">
            <p>Passés <span>({{ pastEventsCount }})</span></p>
            <div class="activeBar"></div>
        </div>
        <MobileSearchIcon class="mobileSearchIcon"/>
    </div>

</template>

<script setup>

    import MobileSearchIcon from '@/sub-components/MobileSearchIcon.vue';
    import { useEventStore } from '@/stores/EventStore';
    import { computed, ref } from 'vue';

    const eventStore = useEventStore();

    // récupère le nombre d'évènements total
    const eventsCount = computed(() => {
        return eventStore.events.length;
    });

    // récupère le nombre d'évènements 'à venir'
    const upcomingEventsCount = computed(() => {
        return eventStore.upcomingEvents.length;
    });

     // récupère le nombre d'évènements 'passés'
     const pastEventsCount = computed(() => {
        return eventStore.pastEvents.length;
    });

    // déclare currentFilter comme réactif avec valeur 'all' par défaut
    const currentFilter = ref('all'); 

    // fonctions emettant les évènements personnalisés
    const displayAllEvents = () => {
        currentFilter.value = 'all';
        window.dispatchEvent(new CustomEvent('filterChanged', { detail: 'all' }));
    };
    const displayOnlyUpcomingEvents = () => {
        currentFilter.value = 'upcoming';
        window.dispatchEvent(new CustomEvent('filterChanged', { detail: 'upcoming' }));
    };
    const displayOnlyPastEvents = () => {
        currentFilter.value = 'past';
        window.dispatchEvent(new CustomEvent('filterChanged', { detail: 'past' }));
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/boHeaderNavStyle.scss';
    @import '@/assets/sass/varMediaQueries.scss';

    .boHeaderNav {
        width: 100%;
        justify-content: space-around;
        .navItem {
            text-align: center;

            p {
                font-size: .8rem;
            }

            span {
                display: none;
            }
        }
    }

    @media screen and (min-width: 302px) {
        .boHeaderNav {
            .navItem {

                p {
                    font-size: 1rem;
                }
            }
        }

    }

    @media screen and (min-width: 405px) {
        .boHeaderNav {
            .navItem {

                span {
                    display: inline;
                }
            }
        }   
    }

    @media screen and (min-width: $breakpointDesktop) {
        .boHeaderNav {
            width: unset;
            justify-content: unset;
        }
    }

</style>