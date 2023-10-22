<template>

    <div class="participantsInscriptionModal_container" :class="{ hiddenParticipantsInscriptionModal: !isParticipantsInscriptionModalVisible }">
        <div class="participantsInscriptionModal">
            <Icon 
                icon="ei:close" 
                width="30" 
                class="closeIcon" 
                @click="closeParticipantsInscriptionModalAndOverlay"
            />
            <h1 class="eventTitle">{{ selectedEvent.title }}</h1>
            <ParticipantsInscriptionForm />
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
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: $lightColor;
            padding: 0 3rem;

            @media screen and (min-width: $breakpointTablet) {
                width: 36rem;
            }
            .closeIcon {
                position: absolute;
                z-index: 1000;
                top: 1rem;
                right: 1rem;
                cursor: pointer;
                transition: transform .15s ease-in-out;

                &:hover {
                    transform: rotate(90deg);
                }
            }

            .eventTitle {
                position: absolute;
                top: 0;
                padding: 4rem 3rem;
                text-align: center;
                font-size: 1.6rem;
            }

            footer {
                width: 100%;
                position: absolute;
                bottom: 0;
                .legalLinks_container {
                    display: flex;
                    gap: 2rem;
                    justify-content: end;
                    padding: 0 3rem 1rem 0;
                    font-size: .8rem;
                }

            }
        }
    }


    
</style>