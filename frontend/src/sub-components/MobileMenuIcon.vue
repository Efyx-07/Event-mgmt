<template>

    <Icon icon="iconamoon:menu-burger-horizontal" class="burgerMenuIcon" @click="toggleBurgerMenuVisibility"/>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';
    .burgerMenuIcon {
        font-size: 1.5rem;
        cursor: pointer;

        &:hover {
            color: $accentColorBackof2;
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .burgerMenuIcon {
            display: none;
        }
    }

</style>