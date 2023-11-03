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

    // permet l'apparition de stickyBar à la disparition de eventCard avec observer

    const eventCard = ref(null);
    const isEventCardVisible = ref(true);

    const observer = new IntersectionObserver((entries) => {
        for (let entry of entries) {
            if(entry.target === eventCard.value) {
                isEventCardVisible.value = entry.isIntersecting;
            }
        }
    });

    onMounted(() => {
        if (eventCard.value) {
            observer.observe(eventCard.value);
        }
    });
  
    onBeforeUnmount(() => {
        if (eventCard.value) {
            observer.unobserve(eventCard.value);
        }
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/varMediaQueries.scss';

    .eventPage {
        display: flex;
        flex-direction: column;
        align-items: center;

        &_content {
            width: 100%;
            max-width: 77rem;
            display: flex;
            flex-direction: column;
            padding: 1rem;
            .eventPage-sections_container {
                display: flex;
                flex-direction: column;
                gap: 2rem;
                padding: 3rem 0 6rem 0;
            }
        }
        .stickyBarContainer {
            display: none;
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .eventPage {
            padding: 0;
            position: relative;

            &_content {
                padding: 0 1rem;
            }
            .stickyBarContainer {
                display: block;
                position: fixed;
                width: 100%;
                display: flex;
                justify-content: center;
            }
        }
    }
    
    
    
</style>
