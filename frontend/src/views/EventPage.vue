<template>

    <div class="eventPage">
        <Header />
        <div class="eventPage_content">
            <EventCard :selectedEvent="selectedEvent"/>
        </div>
    </div>
    <InscriptionModal :selectedEvent="selectedEvent"/>
    
</template>

<script setup>

    import Header from '@/components/Header.vue';
    import EventCard from '@/components/EventCard.vue';
    import InscriptionModal from '@/components/InscriptionModal.vue';

    import { useEventStore } from '@/stores/EventStore';
    import { useRoute } from 'vue-router';

    const eventStore = useEventStore();
    const allEvents = eventStore.events;

    const route = useRoute();

    const eventSlug = route.params.eventSlug; // récupère le slug de la route

    // compare pour faire correspondre les slugs
    const selectedEvent = allEvents.find((event) => {
        return event.slug === eventSlug;
    });

</script>

<style lang="scss" scoped>

    .eventPage {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 200vh;

        &_content {
            width: 100%;
            max-width: 75rem;
        }
        .sticky-bar {
            width: 100%;
            max-width: 75rem;
            position: sticky;
            top: 1rem;
        }
    }
    
</style>
