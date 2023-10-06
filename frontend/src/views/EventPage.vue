<template>

    <div class="eventPage">
        <Header />
        <div class="eventPage_content">
            <EventCard />
        </div>
    </div>
    <InscriptionModal />
    
</template>

<script setup>

    import Header from '@/components/Header.vue';
    import EventCard from '@/components/EventCard.vue';
    import InscriptionModal from '@/components/InscriptionModal.vue';

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
