<template>

    <Icon icon="iconamoon:menu-burger-horizontal" class="burgerMenuIcon" @click="toggleBackOfficeNavMobileVisibility"/>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

    // ouvre la fenetre 'BackOfficeNavMobile' au clic de l'icone
    const toggleBackOfficeNavMobileVisibility = () => {
        // crée un nouvel evenement personnalisé 
        const showBackOfficeNavMobileEvent = new Event('show-backOfficeNavMobile');
        // déclenche l'événement 'show-backOfficeNavMobile' sur l'objet window
        window.dispatchEvent(showBackOfficeNavMobileEvent);
    }

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