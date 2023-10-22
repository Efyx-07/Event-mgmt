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
          <Icon icon="ic:baseline-edit" class="icon" />
        </div>

        <div class="icon_container">
          <Icon icon="akar-icons:statistic-up" class="icon" @click="navigateToParticipantsList(event.slug)"/>
        </div>

        <div class="icon_container">
          <Icon icon="mdi:trash" class="icon" @click="openRemoveEventConfirmationModal(event)"/>
        </div>

      </div>

    </div>

    <p class="creationDate">créé le {{ event.creationDate }}</p>

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

  // permet de naviguer vers la page de l'evenement selectionné
  const navigateToEvent = (eventSlug) => {
    router.push({
      name: 'EventDetail',
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
        position: relative;
        .eventImage_container {
            width: 100%;
            height: 12rem;
            display: inline-block;
            position: relative;
            overflow: hidden;
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
          position: absolute;
          top: .25rem;
          left: .25rem;
          font-size: .7rem;
          margin: 0;
          background: $lightColor;
          padding: .25rem;
        }
    }
    
</style>
