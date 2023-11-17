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

    import { ref, onMounted } from 'vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);
    // rend reactif le lien google maps
    const embedUrl = ref('');

    // fetch l'URL du lieu via le backend pour mettre à jour la carte
    onMounted(async() => {
        try {

            const { hostName } = useGlobalDataStore();

            if (selectedEvent.location) {
                const response = await fetch(`${hostName}/maps?location=${encodeURIComponent(selectedEvent.location)}`);
                if (response.ok) {
                    const data = await response.json();
                    embedUrl.value = data.embedUrl;
                } else {
                    console.error('Erreur lors de la récupération de l\'URL sécurisée de la carte.');
                }
            }
            
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'URL sécurisée de la carte :', error);
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