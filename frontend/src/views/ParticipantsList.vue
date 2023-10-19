<template>
  <div class="participantsListPage">

    <BackOfficeNavAside class="backOfficeNavAside"/>

    <div class="participantsListPage_content">

      <header>
        <div class="header_content">
          <h1 class="page-title">Vos participants</h1>
        </div>
      </header>

      <div class="participantsListPage_content_container">

        <div class="eventTitle-banner">
          <p class="eventTitle"> {{eventTitle}} </p>
          <p class="participantsCountMention"> nbre de participants: {{ participantsCount }}</p>
        </div>

        <div class="participantsList-array_container">
          <table class="participantsList-array">
            <thead>
              <tr>
                <th style="width: 20%;">Entreprise / Organisation</th>
                <th style="width: 20%;">Nom</th>
                <th style="width: 20%;">Prénom</th>
                <th style="width: 20%;">Email</th>
                <th style="width: 20%;">Téléphone</th>
              </tr> 
            </thead>
            
            <tbody v-for="participant in participants" :key="participant.email">
              <tr>
                <td>{{ participant.nom_entreprise }}</td>
                <td>{{ participant.nom }}</td>
                <td>{{ participant.prenom }}</td>
                <td>{{ participant.email }}</td>
                <td v-if="participant.telephone && participant.telephone.length > 0">{{ participant.telephone }}</td>
                <td v-else>Non renseigné</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      
    </div>

  </div>
  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { fetchParticipantsData } from '@/services/api'; // importe la fonction à partir de api.js
import { useEventStore } from '@/stores/EventStore'; 
import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';

const route = useRoute();
const participants = ref([]);
const eventTitle = ref(''); // titre de l'évènement sélectionné
const eventStore = useEventStore();

const participantsCount = computed(() => participants.value.length); // detecte le nombre de participants

onMounted(async () => {
  const eventSlug = route.params.eventSlug;
   // utilise la route pour récupérer le slug et le titre de l'évènement correspondant
   const event = eventStore.events.find((event) => event.slug === eventSlug);
   if (event) {
    eventTitle.value = event.title;
   }
  try {
    // fetch les données des participants selon le slug de l'evenement selectionné
    const response = await fetchParticipantsData(eventSlug); 
    participants.value = response.participants;
  } catch (error) {
    console.error('Erreur lors du chargement des participants :', error);
  }
});

</script>

<style lang="scss" scoped>

  @import '@/assets/sass/variables.scss';
  .participantsListPage {
    display: grid;
    grid-template-columns: 1fr 3fr;

    &_content {
      grid-column: 2 / -1;
      position:relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    header {
      width: 100%;
      background: $lightColor;
      box-shadow: $shadow;
      padding: 1rem 3rem;
      display: flex;
      justify-content: center;
      position: sticky;
      top: 0;
      z-index: 99;
      .header_content{
        display: grid;
        align-items: center;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        width: 100%;
        max-width: $contentMaxWidth;
        .page-title {
          grid-column: 1 / -2;
          margin: 0;
          font-size: 2rem;
          color: $darkColor;
        }
      }
    }
    .participantsListPage_content_container {
      width: 100%;
      padding: 3rem;
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
    .eventTitle-banner {
      position: sticky;
      top: 7.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: $darkColorBackOf;
      color: $lightColor;
      .eventTitle {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 700;
      }
      .participantsCountMention {
        margin: 0;
      }
    }

    .participantsList-array_container {
      background: $ultraLightColor;
      box-shadow: $shadow;
      padding: 2rem;
      .participantsList-array {
        width: 100%;
        text-align: center;
        border-collapse: collapse;

        th, td {
          text-align: center;
          padding: 1rem;
          
        }

        thead tr, tbody tr {
          border-bottom: 1px solid rgba($accentColorBackof3, .25);
        }

        tbody:hover {
          background: $darkColorBackOf;
          color: $lightColor;
        }
      } 
    }
 
  }

</style>



