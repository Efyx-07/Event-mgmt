<template>

    <div class="eventPage">
        <Header />
        <div class="eventPage_content">
            <EventCard :selectedEvent="selectedEvent"/>
        </div>
    </div>
    <InscriptionModal />
    
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

    const eventId = Number(route.params.eventId); // convertit l'id en number pour la comparaison

    // compare pour faire correspondre les id
    const selectedEvent = allEvents.find((event) => {
        return event.id === eventId;
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
