<template>

    <div class="logoutConfirmationModal_container" :class="{ hiddenLogoutConfirmationModal: !isLogoutConfirmationModalVisible }">

        <div class="logoutConfirmationModal">
            <p>Souhaitez-vous vous déconnecter ?</p>
            <div class="buttons_container">
                <button class="cancelBtn" @click="closeLogoutConfirmationModal">
                    <p>Annuler</p>
                </button>
                <button class="confirmBtn" @click="handleSignOut">
                    <p>Déconnexion</p>
                </button>
            </div>
        </div>

    </div>
  
</template>

<script setup>

    import { ref, onMounted } from 'vue';
    import { useAdminStore } from '@/stores/AdminStore';
    import { useRouter } from 'vue-router'

    // statut par défaut de la visibilité de la fenetre
    const isLogoutConfirmationModalVisible  = ref(false);

    // permet la fermeture de la fenetre au click du bouton Annuler
    const closeLogoutConfirmationModal = () => {
        isLogoutConfirmationModalVisible.value = false;
    };

    // ecoute l'événement personnalisé (créé sur 'BackOfficeNavAside') pour réafficher la fenetre
    onMounted(() => {
        window.addEventListener('show-logoutConfirmationModal', () => {
            isLogoutConfirmationModalVisible.value = true;
        });
    });

    // gère le bouton de déconnexion et renvoie sur la page de connexion
    const adminStore = useAdminStore();
    const router = useRouter();

    const handleSignOut = () => {

        // supprime le token du localStorage
        localStorage.removeItem('token');
        // supprime les données administrateur du localStorage
        localStorage.removeItem('adminData');
        // réinitialise le store
        adminStore.clearToken();
        // passe le statut de l'administrateur sur 'déconnecté'
        adminStore.isConnected = false;

        // redirige vers la page de connexion
        router.push('/');
    }

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .hiddenLogoutConfirmationModal {
        visibility: hidden;
        opacity: 0;
    }
    .logoutConfirmationModal_container {
        background: rgba($darkColor, .25);
        backdrop-filter: blur(2.5px);
        position: fixed;
        top: 0;
        width: 25vw;
        height: 100%;
        transition: opacity .1s ease-in-out;
        .logoutConfirmationModal {
            background: $accentColorBackof4;
            border: solid 1px $accentColorBackof3;
            border-radius: $containerRadius;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding: 2rem;
            position: absolute;
            bottom: 3rem;
            left: 50%;
            transform: translate(-50%, -50%);

            p {
                margin: 0;
                color: $lightColor;
            }
            .buttons_container {
                display: flex;
                gap: 1rem;

                button {
                    width: 8rem;
                    background: transparent;
                    border: solid 1px $accentColorBackof3;
                    padding: .5rem;
                    cursor: pointer;

                    &:hover {
                        border-color: $accentColorBackof2;
                        background: $accentColorBackof2;
                    }
                }
            }
        }
    }

    
</style>
