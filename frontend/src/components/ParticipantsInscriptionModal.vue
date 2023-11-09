<template>

    <div class="participantsInscriptionModal_container" :class="{ hiddenParticipantsInscriptionModal: !isParticipantsInscriptionModalVisible }">

        <div class="participantsInscriptionModal">

            <header>
                <Icon 
                    icon="ei:close" 
                    width="30" 
                    class="closeIcon" 
                    @click="closeParticipantsInscriptionModalAndOverlay"
                />
            </header>
    
            <div class="modal_content">

                <div class="titleAndForm_container">
                    <h1 class="eventTitle">{{ selectedEvent.title }}</h1>
                    <ParticipantsInscriptionForm />
                </div>

            </div>

            <footer>
                <div class="legalLinks_container">
                    <p>Conditions d'utilisation</p>
                    <p>Contact</p>
                </div>
            </footer>

        </div>  

    </div>

    <Overlay 
        :showOverlay="isParticipantsInscriptionModalVisible" 
        class="pageOverlay" 
        v-show="isParticipantsInscriptionModalVisible" 
    >
    </Overlay>

</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import Overlay from '@/components/Overlay.vue';
    import ParticipantsInscriptionForm from '@/sub-components/ParticipantsInscriptionForm.vue';
    import { ref, onMounted } from 'vue';
    

    // statut par défaut de la visibilité de la fenetre
    const isParticipantsInscriptionModalVisible = ref(false);

    // permet la fermeture de la fenetre au click sur l'icone
    const closeParticipantsInscriptionModal = () => {
        isParticipantsInscriptionModalVisible.value = false;
    };

    // déclenche evenement personnalisé 'hide-overlay' et ferme fenetre userLogin
    const closeParticipantsInscriptionModalAndOverlay = () => {
        window.dispatchEvent(new Event('hide-overlay'));
        closeParticipantsInscriptionModal();
    }

    // ecoute l'événement personnalisé (créé sur 'ParticipateButton') pour réafficher la fenetre
    onMounted(() => {
        window.addEventListener('show-participantsInscriptionModal', () => {
            isParticipantsInscriptionModalVisible.value = true;
        });
        window.addEventListener('hide-overlay', () => {
            isParticipantsInscriptionModalVisible.value = true; 
        });
    });

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';

    .hiddenParticipantsInscriptionModal { 
        transform: translateX(100%);
    }
    .participantsInscriptionModal_container {
        position: fixed;
        z-index: 999;
        top: 0;
        right: 0;
        box-shadow: -3px 0px 5px #33333341;
        transition: transform .3s ease-in-out;
        .participantsInscriptionModal {
            position: relative;
            width: 100vw;
            height: 100vh;
            background: $lightColor;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow-y: scroll;
            scrollbar-width: none;
            -ms-overflow-style: none;

            &::-webkit-scrollbar {
                display: none;
            }
            
            @media screen and (min-width: $breakpointTablet) {
                width: 30rem;
            }

            @media screen and (min-width: 1440px) {
                width: 36rem;
            }

            header {
                position: sticky;
                top: 0;
                z-index: 9999;
                width: 100%;
                padding: .5rem 1rem;
                display: flex;
                justify-content: flex-end;
                .closeIcon {
                    cursor: pointer;
                    transition: transform .15s ease-in-out;

                    &:hover {
                        transform: rotate(90deg);
                    }
                }
            }
            .modal_content {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .titleAndForm_container {
                    width: 100%;
                    padding: 0rem 2rem 6rem 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    .eventTitle {
                        margin: 0;
                        text-align: center;
                        font-size: 1.5rem;
                    }
                }
            }

            footer {
                width: 100%;
                max-width: 30rem;
                position: fixed;
                bottom: 0;
                display: flex;
                justify-content: center;
                padding: 0 2rem;
                background: $lightColor;

                @media screen and (min-width: 1440px) {
                    max-width: 36rem;
                    padding: 0 3rem;
                }

                .legalLinks_container {
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 2rem;
                    font-size: .8rem;
                    margin: 0;
                    padding: .5rem 0;
                }
            }

        }     
    }


    
</style>