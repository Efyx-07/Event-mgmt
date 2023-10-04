<template>

    <div class="eventPage">
        <Header />
        <div class="eventPage_content">
            <EventCard ref="eventCard"/>
        </div>
        <StickyBar class="sticky-bar"/>
    </div>
    
</template>

<script setup>

    import Header from '@/components/Header.vue';
    import EventCard from '@/components/EventCard.vue';
    import StickyBar from '@/components/StickyBar.vue';

</script>

<style lang="scss" scoped>

    .eventPage {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 300vh;

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
