<template>

  <div class="backOfficeEventCard" v-for="event in events" :key="event.title">

    <div class="eventImage_container">
      <img :src="hostName + event.image.source" :alt="event.image.alt" class="eventImage">
    </div>

    <div class="eventCard-titleAndActions_container">

      <h1 class="eventTitle">{{ event.title }}</h1>

      <div class="actionIcons_container">

        <div class="icon_container">
          <Icon icon="mdi:eye" class="icon" @click="navigateToEvent(event.slug)"/>
        </div>

        <div class="icon_container">
          <Icon icon="ic:baseline-edit" class="icon" @click="navigateToEventUpdatePage(event.slug)"/>
        </div>

        <div class="icon_container">
          <Icon icon="akar-icons:statistic-up" class="icon" @click="navigateToParticipantsList(event.slug)"/>
        </div>

        <div class="icon_container">
          <Icon icon="mdi:trash" class="icon" @click="openRemoveEventConfirmationModal(event)"/>
        </div>

      </div>

    </div>



    <!-- <p class="creationDate">créé le {{ formatDateShort(event.creationDate) }} <span v-if="event.admin.id">par {{ event.admin.prenom }}</span></p> -->

    <div class="dateCard">
      <p class="dateCard-day"> {{ formatDateDay(event.date) }} </p>
      <div class="monthYear_container">
        <p class="dateCard-month"> {{ formatDateMonth(event.date) }} </p>
        <p class="dateCard-year"> {{ formatDateYear(event.date) }} </p>
      </div> 
    </div>

  </div>

</template>

<script setup>

  import { Icon } from '@iconify/vue';
  import { useEventStore } from '@/stores/EventStore';
  import { useGlobalDataStore } from '@/stores/GlobalDataStore';
  import { useRouter } from 'vue-router';

  const eventStore = useEventStore();
  const events = eventStore.events;

  const { hostName } = useGlobalDataStore();

  const router = useRouter();

  // formate la date de création de l'évènement sous la forme dd-mm-yy
  /*
  const formatDateShort = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return new Date(date).toLocaleDateString('fr-FR', options).replace(/\//g, '-');
  };
  */
 
  // reformate la date et sépare jour / mois / année
  const formatDateDay = (date) => {
      const options = { day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
  };
  const formatDateMonth = (date) => {
      const options = { month: 'short' };
      return new Date(date).toLocaleDateString('fr-FR', options);
  };
  const formatDateYear = (date) => {
      const options = { year: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
  };


  // permet de naviguer vers la page de l'evenement selectionné
  const navigateToEvent = (eventSlug) => {
    router.push({
      name: 'EventDetail',
      params: { eventSlug }
    });
  };

  // permet de naviguer vers la page de modification de l'évènement selectionné
  const navigateToEventUpdatePage = (eventSlug) => {
    router.push({
      name: 'EventToUpdate',
      params: { eventSlug }
    });
  };

  // permet de naviguer vers la page affichant la liste des participants à l'évènement sélectionné
  const navigateToParticipantsList = (eventSlug) => {
    router.push({
      name: 'ParticipantsList',
      params: { eventSlug }
    });
  };

  // ouvre la fenetre 'RemoveEventConfirmationModal' au clic de l'icone
  const openRemoveEventConfirmationModal = (event) => {
      const eventDetail = { eventTitle: event.title, eventId: event.id };
      // crée un nouvel evenement personnalisé 
      const showRemoveEventConfirmationModalEvent = new CustomEvent('show-removeEventConfirmationModal', {
        detail: eventDetail,
      });
      // déclenche l'événement 'show-removeEventConfirmationModal' sur l'objet window
      window.dispatchEvent(showRemoveEventConfirmationModalEvent);
  }

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .backOfficeEventCard {
        width: 24rem;
        height: 21rem;
        background: $ultraLightColor;
        box-shadow: $shadow;
        border-radius: $containerRadius 0 $containerRadius 0;
        position: relative;
        .eventImage_container {
            width: 100%;
            height: 12rem;
            display: inline-block;
            position: relative;
            overflow: hidden;
            border-radius: $containerRadius 0 0 0;
            .eventImage {
                width: 100%;
                height: 100%;
                display: block;
                position: relative;
                object-fit: cover;
            }
        }
        .eventCard-titleAndActions_container {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            .eventTitle {
              margin: 0;
              font-size: 1.25rem;
            }
            .actionIcons_container {
                display: flex;
                gap: 1.5rem;
                position: absolute;
                right: 1rem;
                bottom: 1rem;
                .icon_container {
                    .icon {
                        font-size: 1.5rem;
                        cursor: pointer;

                        &:hover {
                            color: $accentColorBackof2;
                        }
                    }

                }
            }
        }
        .creationDate {
          display: none;
          position: absolute;
          top: .5rem;
          left: .5rem;
          font-size: .7rem;
          font-weight: 600;
          margin: 0;
          background: $ultraLightColor;
          box-shadow: $shadow;
          border-radius: 10px 0 0 0;
          padding: .25rem;
        }
        .dateCard {
          background: rgba($ultraLightColor, .8);
          border-radius: 10px 0;
          display: flex;
          align-items: center;
          gap:.2rem;
          position: absolute;
          top: .5rem;
          right: .5rem;
          padding: .3rem;

          p {
            margin: 0;
          }
          .dateCard-day {
            font-size: 2rem;
          }
          .monthYear_container {
            display: flex;
            flex-direction: column;
            line-height: 1;
            .dateCard-month {
              font-size: .8rem;
            }
            .dateCard-year {
              font-size: .9rem;
            }

          }
        }
    }
    
</style>
