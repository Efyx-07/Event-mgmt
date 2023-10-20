<template>

    <div class="backOfficeAdminPage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="adminPage">
            <header>
                <div class="header_content">
                    <h1>Gestion compte administrateur</h1>
                </div>   
            </header>

            <div class="adminOperations_container">

                <div class="adminOperations">

                    <div class="passwordModification-section adminOperations-section">
                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Modifier votre mot de passe</p>
                            <div class="line"></div>
                        </div>
                        <AdminModifPassword class="adminModifPassword"/>
                    </div>

                    <div class="adminCreation-section adminOperations-section">
                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Ajouter un nouvel administrateur</p>
                            <div class="line"></div>
                        </div>
                        <div class="aboutNotification">
                            <p>
                                Notification: Un administrateur actuellement connecté peut créer un nouvel administrateur ici. L’administrateur nouvellement créé pourra modifier son mot de passe lors de sa future connexion et bénèficiera de tous les mêmes droits que l’administrateur actuellement connecté.
                            </p>
                        </div>
                        <AdminAddsAdmin class="adminAddsAdmin"/>
                    </div>

                    <div class="adminDelete-section adminOperations-section">
                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Supprimer un administrateur</p>
                            <div class="line"></div>
                        </div>
                        <AdminDeletesAdmin class="adminDeletesAdmin"/>
                    </div>

                </div>  

            </div>
        </div>
    </div>
    
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import AdminModifPassword from '@/components/AdminModifPassword.vue';
    import AdminAddsAdmin from '@/components/AdminAddsAdmin.vue';
    import AdminDeletesAdmin from '@/components/AdminDeletesAdmin.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .backOfficeAdminPage {
        display: grid;
        grid-template-columns: 1fr 3fr;
        .adminPage {
            grid-column: 2 / -1;

            header {
                background: $ultraLightColor;
                box-shadow: $shadow;
                padding: 1rem 3rem;
                width: 100%;
                display: flex;
                justify-content: center;
                position: sticky;
                top: 0;
                z-index: 99;
                .header_content {
                    width: 100%;
                    max-width: $contentMaxWidth;
                    
                    h1 {
                        margin: 0;
                        font-size: 2rem;
                        color: $darkColor;
                    }
                }
            }
        }
        .adminOperations_container {
            width: 100%;
            padding: 2rem 3rem;
            .adminOperations {
                background: $ultraLightColor;
                box-shadow: $shadow;
                border-radiuS: $containerRadius;
                padding: 2rem;
                display: flex;
                flex-direction: column;
                gap: 3rem;

                &-section {
                    display: flex;
                    flex-direction: column;
                    .sectionTitle_container {
                        display: flex;
                        align-items: baseline;
                        gap: 1rem;
                        .sectionTitle {
                            margin: 0;
                            font-size: 1.25rem;
                            font-weight: 700;
                            white-space: nowrap;
                        }
                        .line {
                            width: 100%;
                            height: 1px;
                            background: $accentColorBackof3;
                        }
                    }
                    .adminModifPassword, 
                    .adminAddsAdmin,
                    .adminDeletesAdmin {
                        align-self: center;
                        margin-top: 3rem;
                    }
                }
                .adminCreation-section {
                    .aboutNotification {
                        border: solid 1px rgba($accentColorBackof3, .25);
                        padding: 1rem;
                        margin-top: 2rem;

                        p {
                            margin: 0;
                            font-size: .75rem;
                            font-weight: 400;
                        }
                    }
                }        
            }
        }

        
    }

    
</style>
