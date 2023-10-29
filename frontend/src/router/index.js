import { createRouter, createWebHistory } from 'vue-router';
import authGuard from './authGuard';

import EventPage from '@/views/EventPage.vue';
import BackOfficeLoginPage from '@/views/BackOfficeLoginPage.vue';
import BackOfficeHomePage from '@/views/BackOfficeHomePage.vue';
import BackOfficeNewEvent from '@/views/BackOfficeNewEvent.vue';
import BackOfficeEventUpdatePage from '@/views/BackOfficeEventUpdatePage.vue';
import PublicationConfirmation from '@/views/PublicationConfirmation.vue';
import UpdateConfirmation from '@/views/UpdateConfirmation.vue';
import RemoveConfirmation from '@/views/RemoveConfirmation.vue';
import ParticipantsList from '@/views/ParticipantsList.vue';
import BackOfficeAdminYourAccount from '@/views/BackOfficeAdminYourAccount.vue';
import BackOfficeAdminAddAdmin from '@/views/BackOfficeAdminAddAdmin.vue';
import BackOfficeAdminDeleteAdmin from '@/views/BackOfficeAdminDeleteAdmin.vue';


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
        path: '/',
        name: 'BackOfficeLoginPage',
        component: BackOfficeLoginPage
      },
      {
        path: '/admin_homepage',
        name: 'BackOfficeHomePage',
        component: BackOfficeHomePage,
        beforeEnter: authGuard,
      },
      {
        path: '/admin_new-event',
        name: 'BackOfficeNewEvent',
        component: BackOfficeNewEvent,
        beforeEnter: authGuard,
      },
      {
        path: '/admin_event-update',
        name: 'BackOfficeEventUpdatePage',
        component: BackOfficeEventUpdatePage,
        beforeEnter: authGuard,
      },
      {
        path: '/admin_event-update/:eventSlug',
        name: 'EventToUpdate',
        component: BackOfficeEventUpdatePage,
        beforeEnter: authGuard,
      },
      {
        path: '/admin_your-account',
        name: 'BackOfficeAdminYourAccount',
        component: BackOfficeAdminYourAccount,
        beforeEnter: authGuard,
      },
      {
        path: '/admin_add-admin',
        name: 'BackOfficeAdminAddAdmin',
        component: BackOfficeAdminAddAdmin,
        beforeEnter: authGuard,
      },
      {
        path: '/admin_delete-admin',
        name: 'BackOfficeAdminDeleteAdmin',
        component: BackOfficeAdminDeleteAdmin,
        beforeEnter: authGuard,
      },
      {
        path: '/admin_participants-list/:eventSlug',
        name: 'ParticipantsList',
        component: ParticipantsList,
        beforeEnter: authGuard,
      },

      // pages de confirmation
      {
        path: '/admin_publication-confirmation',
        name: 'PublicationConfirmation',
        component: PublicationConfirmation,
        beforeEnter: authGuard,
      },
      {
        path: '/admin_update-confirmation',
        name: 'UpdateConfirmation',
        component: UpdateConfirmation,
        beforeEnter: authGuard,
      }, 
      {
        path: '/admin_remove-confirmation',
        name: 'RemoveConfirmation',
        component: RemoveConfirmation,
        beforeEnter: authGuard,
      },

    ]
});

//permet qu'à chaque changement de route la nouvelle page est affichée à partir du haut
router.afterEach(() => {
    window.scrollTo(0, 0);
});
  
export default router;