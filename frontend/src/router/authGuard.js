import { useAdminStore } from '@/stores/AdminStore';

const authGuard = (to, from, next) => {
  const adminStore = useAdminStore();

  // vérifie si l'administrateur est connecté
  if (adminStore.isConnected) {
    // si connecté, autorise l'accès à la route demandée
    next();
  } else {
    // si non connecté, redirige vers la page de connexion
    next('/'); 
  }
};

export default authGuard;
