<template>

    <div class="eventPage">
        <EventPageHeader :selectedEvent="selectedEvent"/>
        <div class="eventPage_content">
            <EventCard :selectedEvent="selectedEvent"/>
            <div class="eventPage-sections_container">
                <div id="presentation">
                    <EventPageSectionPresentation :selectedEvent="selectedEvent"/>
                </div>
                <div id="programme">
                    <EventPageSectionProgramme :selectedEvent="selectedEvent"/>
                </div>
                <div id="practicalInformations">
                    <EventPageSectionPracticalInformations :selectedEvent="selectedEvent"/>
                </div>
            </div>
        </div>
        <EventPageFooter />
    </div>
    <ParticipantsInscriptionModal :selectedEvent="selectedEvent"/>
    
</template>

<script setup>

    import EventPageHeader from '@/components/EventPageHeader.vue';
    import EventPageFooter from '@/components/EventPageFooter.vue'
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
                gap: 1rem;
                padding: 3rem 0;
            }
        }
    }
    
</style>
