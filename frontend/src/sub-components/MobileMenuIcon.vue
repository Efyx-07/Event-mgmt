<template>

    <Icon icon="tabler:menu-deep" class="mobileMenuIcon" @click="toggleBackOfficeNavMobileVisibility"/>

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
    .mobileMenuIcon {
        font-size: 1.5rem;
        cursor: pointer;

        &:hover {
            color: $accentColorBackof2;
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .mobileMenuIcon {
            display: none;
        }
    }

</style>