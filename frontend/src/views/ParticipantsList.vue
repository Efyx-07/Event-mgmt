<template>
    <div>
      <div v-if="loading">Chargement des données en cours...</div>
      <div v-else>
        <div v-for="participant in participants" :key="participant.email">
          <p>Nom de l'entreprise : {{ participant.nom_entreprise }}</p>
          <p>Nom du participant : {{ participant.nom }}</p>
          <!-- Ajoutez d'autres propriétés que vous souhaitez afficher ici -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/userStore';
  import { useRoute } from 'vue-router';
  
  const userStore = useUserStore();
  const participants = ref([]);
  const loading = ref(true);
  
  const route = useRoute();
  
  // Appeler loadParticipantsData lorsque le composant est monté
  onMounted(async () => {
    try {
      const eventSlug = route.params.eventSlug;
      console.log('Event Slug:', eventSlug);
      await userStore.loadParticipantsData(eventSlug);
      console.log('Participants in Store:', userStore.participants);
      participants.value = userStore.participants;
      console.log('Participants in Component:', participants.value);
      loading.value = false; // Indiquer que le chargement est terminé
    } catch (error) {
      console.error('Erreur lors du chargement des participants :', error);
      loading.value = false; // Assurez-vous de gérer les erreurs correctement
    }
  });
  </script>


