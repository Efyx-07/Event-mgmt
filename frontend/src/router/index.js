import { createRouter, createWebHistory } from 'vue-router';
import EventPage from '@/views/EventPage.vue';
import BackOfficeLoginPage from '@/views/BackOfficeLoginPage.vue';
import BackOfficeHomePage from '@/views/BackOfficeHomePage.vue';
import BackOfficeNewEvent from '@/views/BackOfficeNewEvent.vue';



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'EventPage',
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
    ]
});

//permet qu'à chaque changement de route la nouvelle page est affichée à partir du haut
router.afterEach(() => {
    window.scrollTo(0, 0);
});
  
export default router;