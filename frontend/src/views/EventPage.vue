<template>

    <div class="eventPage">
        <EventPageHeader :selectedEvent="selectedEvent"/>
        <div class="eventPage_content">
            <EventCard :selectedEvent="selectedEvent"/>
            <div class="eventPage-sections_container">
                <EventPageSectionPresentation :selectedEvent="selectedEvent"/>
                <EventPageSectionProgramme :selectedEvent="selectedEvent"/>
                <EventPageSectionPracticalInformations :selectedEvent="selectedEvent"/>
            </div>
        </div>
    </div>
    <ParticipantsInscriptionModal :selectedEvent="selectedEvent"/>
    
</template>

<script setup>

    import EventPageHeader from '@/components/EventPageHeader.vue';
    import EventCard from '@/components/EventCard.vue';
    import EventPageSectionPresentation from '@/components/EventPageSectionPresentation.vue';
    import EventPageSectionProgramme from '@/components/EventPageSectionProgramme.vue';
    import EventPageSectionPracticalInformations from '@/components/EventPageSectionPracticalInformations.vue';
    import ParticipantsInscriptionModal from '@/components/ParticipantsInscriptionModal.vue';

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

        &_content {
            width: 100%;
            max-width: 75rem;
            display: flex;
            flex-direction: column;
            .eventPage-sections_container {
                display: flex;
                flex-direction: column;
                gap: 3rem;
                padding: 5rem 0;
            }
        }
    }
    
</style>
