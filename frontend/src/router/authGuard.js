import { useAdminStore } from '@/stores/AdminStore';

const authGuard = (to, from, next) => {
  const adminStore = useAdminStore();

  // Vérifie si l'administrateur est connecté
  if (adminStore.isConnected) {
    // Si connecté, autorise l'accès à la route demandée
    next();
  } else {
    // Si non connecté, redirige vers la page de connexion ou une page d'erreur
    next('/'); // Modifiez "/login" en l'URL de votre page de connexion
  }
};

export default authGuard;