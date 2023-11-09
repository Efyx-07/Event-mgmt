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
    </div>

</template>

<script setup>

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
    .navItem {
        text-align: center;
    }

</style>