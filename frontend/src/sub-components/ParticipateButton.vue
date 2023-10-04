<template>
    <button class="participateButton" @click="toggleInscriptionModalVisibility" >
        <p>Je participe</p>
    </button>
</template>

<script setup>

    // ouvre la fenetre 'UserAccount' au clic de l'icone
    const toggleInscriptionModalVisibility = () => {
        // crée un nouvel evenement personnalisé 
        const showInscriptionModalEvent = new Event('show-inscriptionModal');
        // déclenche l'événement 'show-inscriptionModal' sur l'objet window
        window.dispatchEvent(showInscriptionModalEvent);
        const showOverlayEvent = new Event('show-overlay');
        // déclenche l'événement 'show-overlay' sur l'objet window
        window.dispatchEvent(showOverlayEvent);
    }

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';

    .participateButton {
        @include buttonStyle;
    }
</style>