<template>

    <div id="eventsNav" class="boHeaderNav" v-if="eventsCount >= 1">
        <SearchIcon class="searchIcon" />
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
    </div>

</template>

<script setup>

    import SearchIcon from '@/sub-components/SearchIcon.vue';
    import { useEventStore } from '@/stores/EventStore';
    import { computed, ref, onMounted } from 'vue';

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

    // écoute l'évènement personnalisé émis par BackOfficeEventsSearchBar
    onMounted(() => {
        window.addEventListener('filterChanged', handleFilterChanged);
        window.addEventListener('resetActiveTabs', resetActiveTabs);
    });

    // modifie la valeur du filtre selon l'evenement emis
    const handleFilterChanged = (event) => {
        currentFilter.value = event.detail;
    };

    // réinitialise les classes actives
    const resetActiveTabs = () => {
        currentFilter.value = '';
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/boHeaderNavStyle.scss';
    @import '@/assets/sass/varMediaQueries.scss';

    .boHeaderNav {
        width: 100%;
        justify-content: space-around;
        .searchIcon.active-link {
            background: $accentColorBackof2;
        }
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