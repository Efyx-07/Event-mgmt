<template>
    <div class="removeEventModal" :class="{ hiddenRemoveEventModal: !isRemoveEventModalVisible }">
        <div class="optionBox">
            <p>Etes-vous sûr de vouloir supprimer l'evenement: eventTitle ?</p>
            <div class="alertMention">
                <Icon icon="mdi:alert-outline" class="alertIcon"/>
                <p>Cette opération est irréversible et supprimera l'évènement et toutes ses données</p>
            </div>
            <div class="buttons_container">
                <button class="cancelButton" @click="closeRemoveEventModal">
                    <p>Annuler</p>
                </button>
                <button class="confirmButton">
                    <p>Confirmer</p>
                </button>
            </div>
        </div>
    </div>  
</template>

<script setup>
    import { Icon } from '@iconify/vue';
    import { ref, onMounted } from 'vue';

    // statut par défaut de la visibilité de la fenetre
    const isRemoveEventModalVisible  = ref(false);

    // permet la fermeture de la fenetre au click du bouton Annuler
    const closeRemoveEventModal = () => {
        isRemoveEventModalVisible.value = false;
    };

    // ecoute l'événement personnalisé (créé sur 'BackOfficeEventCard') pour réafficher la fenetre
    onMounted(() => {
        window.addEventListener('show-removeEventModal', () => {
            isRemoveEventModalVisible.value = true;
        });
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .hiddenRemoveEventModal { 
        visibility: hidden;
        opacity: 0;
    }
    .removeEventModal {
        background: rgba($darkColor, .25);
        backdrop-filter: blur(2.5px);
        height: 100vh;
        width: 100vw;
        position: fixed;
        z-index: 999;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity .3s ease-in-out;
        .optionBox {
            width: 25rem;
            background: $darkColorBackOf;
            color: $lightColor;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            gap: 1rem;

            p {
                margin: 0;
                text-align: center;
                font-size: 1.2rem;
                font-weight: 400;
            }
            .alertMention {
                display: flex;
                align-items: center;
                color: $errorColor;
                .alertIcon {
                    font-size: 3rem;
                    color: $errorColor;
                }

                p {
                    font-size: .8rem;
                    font-weight: 200;
                }
            }

            .buttons_container {
                display: flex;
                gap: 1.5rem;

                button {
                    width: 8rem;
                    margin-top: 1rem;
                    padding: .5rem;
                    background: transparent;
                    border: solid 1px $lightColor;
                    cursor: pointer;

                    &:hover {
                        background: $accentColorBackof2;
                    }

                    p {
                        margin: 0;
                        color: $lightColor;
                        font-weight: 600;
                        font-size: 1rem;
                    }
                }
            }

        }
    }

    
</style>
