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

    .participateButton {
        width: 12rem;
        height: 3.5rem;
        background: $accentColor2;
        border: none;
        border-radius: $containerRadius * 2;
        box-shadow: $shadow;
        cursor: pointer;

        &:hover {
            background: rgba($accentColor2, .8);
        }

        p {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: $lightColor;
        }
    }
</style>