<template>

    <div class="backOfficeNavAside">

        <div class="head-section">
            <PlatformLogo />
        </div>

        <router-link to="/admin_homepage" class="item-section" :class="{ 'active-link': $route.path === '/admin_homepage' }">
                <Icon icon="material-symbols:home-outline" class="icon"/>
                <p>Vos évènements</p>
                <div class="active-bar"></div>
        </router-link>

        <router-link to="/admin_new-event" class="item-section" :class="{ 'active-link': $route.path === '/admin_new-event' }">
                <Icon icon="ic:outline-create" class="icon"/>
                <p>Nouvel évènement</p>
                <div class="active-bar"></div>
        </router-link>

        <router-link 
            to="/admin_your-account" 
            class="item-section" 
            :class="{ 'active-link': $route.path === '/admin_your-account' || $route.path === '/admin_add-admin' || $route.path === '/admin_delete-admin' }">
                <Icon icon="material-symbols:manage-accounts-outline" class="icon"/>
                <p>Compte administrateur</p>
                <div class="active-bar"></div>
        </router-link>

        <div class="footer-section">
            <p v-if="adminData">{{ adminData.firstName }} {{ adminData.lastName }}</p>
            <Icon icon="mdi:power" class="icon" @click="openLogoutConfirmationModal()"/>
        </div>

        <LogoutConfirmationModal />

    </div>
    
</template>

<script setup>

    import PlatformLogo from '@/sub-components/PlatformLogo.vue';
    import LogoutConfirmationModal from '@/sub-components/LogoutConfirmationModal.vue';
    import { Icon } from '@iconify/vue';
    import { useAdminStore } from '@/stores/AdminStore';
    import { ref, onMounted, watch } from 'vue';

    // ouvre la fenetre 'LogoutModal' au clic de l'icone
    const openLogoutConfirmationModal = () => {
        // crée un nouvel evenement personnalisé 
        const showLogoutConfirmationModalEvent = new CustomEvent('show-logoutConfirmationModal');
        window.dispatchEvent(showLogoutConfirmationModalEvent);
    };

    const adminStore = useAdminStore();

    // ref par défaut des données de l'administrateur connecté
    const adminData = ref(null);

    // charge adminData depuis le localStorage avant le rendu du composant et utilise méthode de AdminStore
    onMounted(async () => {
        await adminStore.loadAdminDataFromLocalStorage();
    });

    // surveille les changements de adminData dans le store et met à jour adminData
    watch(() => adminStore.adminData, (newAdminData) => {
        adminData.value = newAdminData;
    });
    
</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';

    .backOfficeNavAside {
        display: none;
    }

    @media screen and (min-width: $breakpointDesktop) {
        .backOfficeNavAside {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 25vw;
            background: $darkColorBackOf;
            z-index: 199;
            .head-section {
                height: 6rem;
                display: flex;
                justify-content: center;
            }
            .head-section, .item-section {
                border-bottom: solid 1px $accentColorBackof3;
            }
            .item-section {
                text-decoration: none;
                height: 5rem;
                display: flex;
                align-items: center;
                gap: .5rem;
                color: $lightColor;
                padding-left: 1rem;
                cursor: pointer;
                position: relative;
                .icon {
                    font-size: 1.5rem;
                }

                p {
                    margin: 0;
                    font-size: clamp(1.5vw, 1.1rem, 1.5vw);
                }
                .active-bar {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: .25rem;
                    height: 100%;
                    background-color: transparent;
                }

                &:hover,
                &.active-link {
                    background-color: $accentColorBackof4;
                }
                &.active-link>.active-bar {
                    background-color: $accentColorBackof2;
                }
            
            }
            .footer-section {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 6rem;
                background: $accentColorBackof4;
                color: $lightColor;
                border-top: solid 1px $accentColorBackof3;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 2rem;

                p {
                    margin: 0;
                    font-size: clamp(1.5vw, 1.1rem, 1.5vw);
                }
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

    @media screen and (min-width: $breakpointLargeDesktop) {
        .backOfficeNavAside {
            .item-section {
                gap: 1rem;
                padding-left: 2rem;
                .icon {
                    font-size: 2.25rem;
                }

                p {
                    font-size: 1.5rem;
                }
            
            }
            .footer-section {

                p {
                    font-size: 1.2rem;
                }
                .icon {
                    font-size: 2.25rem;
                }

            }
        }

    }
    
</style>
