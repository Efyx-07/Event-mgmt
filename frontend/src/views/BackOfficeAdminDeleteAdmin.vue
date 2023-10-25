<template>

    <div class="backOfficeAdminPage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="adminPage">
            
            <AdminPageHeader />

            <div class="adminOperations_container">

                <div class="adminOperations">

                    <div class="adminDeleting-section adminOperations-section">
                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Supprimer un administrateur</p>
                            <div class="line"></div>
                        </div>
                        <AdminsToDelete class="adminsToDelete"/>
                    </div>

                </div>  

            </div>
        </div>
    </div>
    
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import AdminsToDelete from '@/components/AdminsToDelete.vue';
    import AdminPageHeader from '@/components/AdminPageHeader.vue';

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
                    .adminUpdatePasswordForm, 
                    .adminRegisterForm,
                    .adminsToDelete {
                        align-self: center;
                        margin-top: 3rem;
                    }
                }
                .adminRegistration-section {
                    .aboutNotification {
                        border: solid 1px rgba($accentColorBackof3, .25);
                        padding: 1rem;
                        margin-top: 2rem;

                        p {
                            margin: 0;
                            font-size: .75rem;
                            font-weight: 600;
                        }
                    }
                }        
            }
        }

        
    }

    
</style>