<template>

    <div class="searchIcon_container">
        <Icon icon="ic:sharp-search" class="searchIcon" @click="toggleEventsSearchBarVisibility"/>
    </div>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

    // ouvre la fenetre 'EventsSearchbar' au clic de l'icone
    const toggleEventsSearchBarVisibility = () => {
        // crée un nouvel evenement personnalisé 
        const showEventsSearchBarEvent = new Event('show-eventsSearchBar');
        // déclenche l'événement 'show-eventsSearchBar' sur l'objet window
        window.dispatchEvent(showEventsSearchBarEvent);
    }

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';
    .searchIcon_container {
        width: 2rem;
        height: 2rem;
        background: $secondaryButtonColor;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
            background: rgba($secondaryButtonColor, .7);
        }
        .searchIcon {
            color: $lightColor;
            font-size: 1.3rem;
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .searchIcon_container {
            width: 2.3rem;
            height: 2.3rem;
        }
    }
</style>