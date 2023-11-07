<template>

    <iframe 
        class="locationMap" 
        width="600"
        height="450"
        style="border:0"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        :src="embedUrl">
    </iframe>

</template>

<script setup>

    import { computed } from 'vue';

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

    // clé google maps (à remplacer par la clé du client)
    const googleMapsEmbedApiKey = 'AIzaSyBZqDbBpqGQwhdR34PVpRViRe1oFcvj4Mk';

    // récupère le locationUrl de l'API evenements et le reformate avec la clé API selon format googleMaps
    const embedUrl = computed(() => {
        if (selectedEvent.locationUrl) {
            const urlWithApiKey = `https://www.google.com/maps/embed/v1/place?key=${googleMapsEmbedApiKey}&q=${encodeURIComponent(selectedEvent.location)}`;
            return urlWithApiKey;
            // si aucun n'est trouvé renvoie une chaine de caractères vide
        } else {
            return '';
        }
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/varMediaQueries.scss';

    .locationMap {
        width: 100%;
        height: 20rem;
    }

    @media screen and (min-width: $breakpointDesktop) {
        .locationMap {
            height: 30rem;
        }
    }

</style>