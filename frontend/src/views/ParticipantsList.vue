<template>
  <div class="participantsListPage">

    <BackOfficeNavAside class="backOfficeNavAside"/>

    <div class="participantsListPage_content">

      <header>
        <div class="header_content">
          <h1 class="page-title">Vos participants</h1>
          <BackToEventsButton class="backToEventsButton"/>
          <MobileMenuIcon class="mobileMenuIcon"/>
        </div>
      </header>

      <div class="participantsListPage_content_container">

        <div class="eventTitle-banner">
          <p class="eventTitle"> {{eventTitle}} </p>
          <p class="participantsCountMention"> nombre de participants: {{ participantsCount }}</p>
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

  <BackOfficeNavMobile />
  
</template>

<script setup>

  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchParticipantsData } from '@/services/api'; // importe la fonction à partir de api.js
  import { useEventStore } from '@/stores/EventStore'; 
  import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
  import BackToEventsButton from '@/sub-components/BackToEventsButton.vue';
  import MobileMenuIcon from '@/sub-components/MobileMenuIcon.vue';
  import BackOfficeNavMobile from '@/components/BackOfficeNavMobile.vue';

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
  @import '@/assets/sass/varMediaQueries.scss';
  @import '@/assets/sass/mixins.scss';
  .participantsListPage {

    header {
      @include headersMobileBasicSettings;
      .header_content{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .page-title {
          margin: 0;
          font-size: 1.5rem;
        }
        .backToEventsButton {
          display: none;
        }
      }
    }
    .participantsListPage_content_container {
      width: 100%;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .eventTitle-banner {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: .5rem;
      padding: .5rem 1rem;
      background: $darkColorBackOf;
      color: $lightColor;
      .eventTitle {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 700;
      }
      .participantsCountMention {
        margin: 0;
      }
    }
    .participantsList-array_container {
      overflow-x: scroll;
      background: $ultraLightColor;
      box-shadow: $shadow;
      border-radiuS: $containerRadius;
      padding: 1rem 2rem 2rem 2rem;
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

  @media screen and (min-width: $breakpointDesktop) {
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
        @include headersBasicSettings;
        .header_content{
          display: grid;
          align-items: center;
          grid-template-columns: 6fr 1fr;
          max-width: $contentMaxWidth;
          .page-title {
            grid-column: 1 / -2;
            @include pageTitlesBasicSettings;
          }
          .backToEventsButton {
            display: block;
          }
        }
      }
      .participantsListPage_content_container {
        padding: 2rem 3rem;
        gap: 2rem;
      }
      .eventTitle-banner {
        width: 95%;
        align-self: center;
        position: sticky;
        top: 6.5rem;
        justify-content: space-between;
        align-items: center;
      }
      .participantsList-array_container {
        overflow-x: unset;
      } 
    }
  }

</style>



