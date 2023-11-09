<template>

    <div id="eventsNav" class="boHeaderNav" v-if="eventsCount >= 1">
        <div class="navItem">
            <p>Tous <span>({{ eventsCount }})</span></p>
            <div class="activeBar"></div>
        </div>
        <div class="navItem">
            <p>A venir <span>({{ eventsCount }})</span></p>
            <div class="activeBar"></div>
        </div>
        <div class="navItem">
            <p>Passés <span>({{ eventsCount }})</span></p>
            <div class="activeBar"></div>
        </div>
    </div>

</template>

<script setup>

    import { useEventStore } from '@/stores/EventStore';
    import { computed } from 'vue';

    // permet de vérifier le nombre d'évènements créés
    const eventsCount = computed(() => {
        return useEventStore().events.length;
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/boHeaderNavStyle.scss';
    .navItem {
        text-align: center;
    }

</style>