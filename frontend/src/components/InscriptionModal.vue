<template>
    <div class="inscriptionModal_container" :class="{ hiddenInscriptionModal: !isInscriptionModalVisible }">
        <div class="inscriptionModal">
            <Icon 
                icon="carbon:close" 
                width="40" 
                class="closeIcon" 
                @click="closeInscriptionModal"
            />
        </div>  
    </div>

    <!-- <Overlay 
        :showOverlay="isUserAccountVisible" 
        class="pageOverlay" 
        v-show="isUserAccountVisible" 
    >
    </Overlay> -->
</template>
<script setup>

    import { Icon } from '@iconify/vue';
    //import Overlay from '@/components/Overlay.vue';
    import { ref, onMounted } from 'vue';
    

    // statut par défaut de la visibilité de la fenetre
    const isInscriptionModalVisible = ref(false);

    // permet la fermeture de la fenetre au click sur l'icone
    const closeInscriptionModal = () => {
        isInscriptionModalVisible.value = false;
    };

    // déclenche evenement personnalisé 'hide-overlay4' et ferme fenetre userLogin
   /* const closeinscriptionModalAndOverlay = () => {
        window.dispatchEvent(new Event('hide-overlay4'));
        closeinscriptionModal();
    };*/

    // ecoute l'événement personnalisé (créé sur 'UserIconLogged') pour réafficher la fenetre
    onMounted(() => {
        window.addEventListener('show-inscriptionModal', () => {
            isInscriptionModalVisible.value = true;
        });
        // window.addEventListener('hide-overlay4', () => {
        //     isInscriptionModalVisible.value = true; 
        // });
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

    .hiddenInscriptionModal { // nommage unique pour eviter conflit avec classe des composants similaires
        transform: translateX(100%);
    }
    .inscriptionModal_container {
        position: fixed;
        z-index: 999;
        top: 0;
        right: 0;
        box-shadow: -3px 0px 5px #33333341;
        transition: transform .3s ease-in-out;
        display: flex;
        justify-content: end;
        .inscriptionModal {
            position: relative;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5rem;
            background: $lightColor;

            @media screen and (min-width: $breakpointTablet) {
                width: 31rem;
            }
            .closeIcon {
                position: absolute;
                top: 1rem;
                right: 1rem;
                cursor: pointer;
                transition: transform .2s ease-in-out;

                &:hover {
                    transform: rotate(90deg);
                }
            }
        }
    }


    
</style>