<template>
  <div>
    <h1>Participants List</h1>
    <ul>
      <li v-for="participant in participants" :key="participant.email">
        <!-- Affiche les détails du participant -->
        <p>Nom de l'entreprise: {{ participant.nom_entreprise }}</p>
        <p>Nom du participant: {{ participant.nom }}</p>
        <!-- Ajoutez d'autres propriétés que vous souhaitez afficher ici -->
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchParticipantsData } from '@/services/api';

const route = useRoute();
const participants = ref([]);

onMounted(async () => {
  const eventSlug = route.params.eventSlug;
  try {
    const response = await fetchParticipantsData(eventSlug); // Utilisez votre fonction fetch ici
    participants.value = response.participants;
  } catch (error) {
    console.error('Erreur lors du chargement des participants :', error);
  }
});

</script>





