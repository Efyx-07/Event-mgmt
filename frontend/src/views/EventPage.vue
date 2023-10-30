<template>

    <div class="eventPage">
        <EventPageHeader :selectedEvent="selectedEvent"/>
        <div class="eventPage_content">
            <div class="eventCard_container" ref="eventCard">
                <EventCard :selectedEvent="selectedEvent" />
            </div>
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
        <div class="stickyBarContainer" v-show="!isEventCardVisible">
            <EventPageStickyBar :selectedEvent="selectedEvent"/>
        </div>
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
    import EventPageStickyBar from '@/components/EventPageStickyBar.vue';

    import { ref, onMounted, onBeforeUnmount } from 'vue';

    import { useEventStore } from '@/stores/EventStore';
    import { useRoute } from 'vue-router';

    const eventStore = useEventStore();
    const allEvents = eventStore.events;

    const route = useRoute();

    // récupère le slug de la route
    const eventSlug = route.params.eventSlug; 

    // compare pour faire correspondre les slugs
    const selectedEvent = allEvents.find((event) => {
        return event.slug === eventSlug;
    });

    const eventCard = ref(null);
    const isEventCardVisible = ref(true);

    const observer = new IntersectionObserver((entries) => {
        for (let entry of entries) {
            if(entry.target === eventCard.value) {
                isEventCardVisible.value = entry.isIntersecting;
                console.log('EventCard est visible :', isEventCardVisible.value);
            }
        }
    });

    onMounted(() => {
        if (eventCard.value) {
            observer.observe(eventCard.value);
            console.log('Observation de EventCard a commencé');
        }
    });
  
    onBeforeUnmount(() => {
        if (eventCard.value) {
            observer.unobserve(eventCard.value);
            console.log('Observation de EventCard s\'est terminée');
        }
    });

</script>

<style lang="scss" scoped>
    .eventPage {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 200vh;

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
        .stickyBarContainer {
            position: fixed;
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }
    
    
</style>
