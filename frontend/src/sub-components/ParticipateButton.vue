<template>
    <button class="participateButton" @click="toggleParticipantsInscriptionModalVisibility" >
        <p>Je participe</p>
    </button>
</template>

<script setup>

    // ouvre la fenetre 'ParticipantsInscriptionModal' au clic de l'icone
    const toggleParticipantsInscriptionModalVisibility = () => {
        // crée un nouvel evenement personnalisé 
        const showParticipantsInscriptionModalEvent = new Event('show-participantsInscriptionModal');
        // déclenche l'événement 'show-participantsInscriptionModal' sur l'objet window
        window.dispatchEvent(showParticipantsInscriptionModalEvent);
        const showOverlayEvent = new Event('show-overlay');
        // déclenche l'événement 'show-overlay' sur l'objet window
        window.dispatchEvent(showOverlayEvent);
    }

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';
    @import '@/assets/sass/varMediaQueries.scss';

    .participateButton {
        @include buttonStyle;
        width: 100%;
    }

    @media screen and (min-width: $breakpointDesktop) {
        .participateButton {
            @include buttonStyle;
        }
    }

</style>