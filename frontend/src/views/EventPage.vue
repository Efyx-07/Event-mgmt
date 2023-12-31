<template>

    <div class="eventPage">
        <EP_Header :selectedEvent="selectedEvent"/>
        <div class="eventPage_content">
            <div class="eventCard_container" ref="eventCard">
                <EP_EventCard :selectedEvent="selectedEvent" />
            </div>
            <div class="eventPage-sections_container">
                <div id="presentation">
                    <EP_Section_presentation :selectedEvent="selectedEvent"/>
                </div>
                <div id="programme">
                    <EP_Section_programme :selectedEvent="selectedEvent"/>
                </div>
                <div id="practicalInformations">
                    <EP_Section_practicalInformations :selectedEvent="selectedEvent"/>
                </div>
            </div>
        </div>
        <EP_Footer />
        <div class="stickyBarContainer" v-show="!isEventCardVisible">
            <EP_StickyBar :selectedEvent="selectedEvent"/>
        </div>
    </div>
    <EP_Modal_participantsInscription :selectedEvent="selectedEvent"/>
    
</template>

<script setup>

    import EP_Header from '@/components/EP_Header.vue';
    import EP_Footer from '@/components/EP_Footer.vue';
    import EP_EventCard from '@/components/EP_EventCard.vue';
    import EP_Section_presentation from '@/components/EP_Section_presentation.vue';
    import EP_Section_programme from '@/components/EP_Section_programme.vue';
    import EP_Section_practicalInformations from '@/components/EP_Section_practicalInformations.vue';
    import EP_Modal_participantsInscription from '@/components/EP_Modal_participantsInscription.vue';
    import EP_StickyBar from '@/components/EP_StickyBar.vue';

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
    @import '@/assets/sass/variables.scss';

    .eventPage {
        background: $lightColor;
        color: $darkColor;
        display: flex;
        flex-direction: column;
        align-items: center;

        &_content {
            width: 100%;
            max-width: 77rem;
            display: flex;
            flex-direction: column;
            .eventPage-sections_container {
                display: flex;
                flex-direction: column;
                gap: 2rem;
                padding: 3rem 1rem 6rem 1rem;
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
                .eventPage-sections_container {
                    padding: 3rem 0rem 6rem 0rem;
                }
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
