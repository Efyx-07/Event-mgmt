<template>

    <div v-for="participant in participants">
        <p>{{ participant.name }}</p>
    </div>
     
</template>

<script setup>

    import { useUserStore } from '@/stores/userStore';

    const userStore = useUserStore();

    const participants = userStore.participants;

</script>


