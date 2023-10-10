<template>
    <h1 class="eventTitle">{{ event.title }}</h1>
</template>

<script setup>
    import { useEventStore } from '@/stores/EventStore';
    const eventStore = useEventStore();
    const events = eventStore.events;
</script>

<style lang="scss" scoped>
    .eventTitle {
        margin: 0;
        font-size: 1.875rem;
    }

</style>