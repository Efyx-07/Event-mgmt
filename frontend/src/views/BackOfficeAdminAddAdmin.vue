<template>

    <div class="backOfficeAdminPage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="adminPage">
            
            <AdminPageHeader />

            <div class="adminOperations_container">

                <div class="adminOperations">

                    <div class="adminRegistration-section adminOperations-section">
                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Ajouter un nouvel administrateur</p>
                            <div class="line"></div>
                        </div>
                        <div class="aboutNotification">
                            <p>
                                Notification: Un administrateur actuellement connecté peut créer un nouvel administrateur ici. L’administrateur nouvellement créé pourra modifier son mot de passe lors de sa future connexion et bénèficiera de tous les mêmes droits que l’administrateur actuellement connecté.
                            </p>
                        </div>
                        <AdminRegisterForm class="adminRegisterForm"/>
                    </div>

                </div>  

            </div>
        </div>
    </div>
    
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import AdminRegisterForm from '@/components/AdminRegisterForm.vue';
    import AdminPageHeader from '@/components/AdminPageHeader.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/adminPagesStyle.scss';
    @import '@/assets/sass/mixins.scss';

    .adminRegisterForm {
        @include adminForm;
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
        
</style>