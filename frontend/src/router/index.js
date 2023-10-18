import { createRouter, createWebHistory } from 'vue-router';
import EventPage from '@/views/EventPage.vue';
import BackOfficeLoginPage from '@/views/BackOfficeLoginPage.vue';
import BackOfficeHomePage from '@/views/BackOfficeHomePage.vue';
import BackOfficeNewEvent from '@/views/BackOfficeNewEvent.vue';
import BackOfficeAdminPage from '@/views/BackOfficeAdminPage.vue';
import PublicationConfirmation from '@/views/PublicationConfirmation.vue';
import ParticipantsList from '@/views/ParticipantsList.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/event-page',
        name: 'EventPage',
        component: EventPage
      },
      {
        path: '/event-page/:eventSlug', // création d'une route dynamique pour afficher la page de l'evenement
        name: 'EventDetail',
        component: EventPage
      },
      {
        path: '/admin',
        name: 'BackOfficeLoginPage',
        component: BackOfficeLoginPage
      },
      {
        path: '/admin_homepage',
        name: 'BackOfficeHomePage',
        component: BackOfficeHomePage
      },
      {
        path: '/admin_new-event',
        name: 'BackOfficeNewEvent',
        component: BackOfficeNewEvent
      },
      {
        path: '/admin_admin-accounts',
        name: 'BackOfficeAdminPage',
        component: BackOfficeAdminPage
      },
      {
        path: '/admin_publication-confirmation',
        name: 'PublicationConfirmation',
        component: PublicationConfirmation
      },
      {
        path: '/admin_participants-list/:eventSlug',
        name: 'ParticipantsList',
        component: ParticipantsList
      },
      
    ]
});

//permet qu'à chaque changement de route la nouvelle page est affichée à partir du haut
router.afterEach(() => {
    window.scrollTo(0, 0);
});
  
export default router;