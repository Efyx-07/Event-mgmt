<template>

    <div class="backOfficeAdminPage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="adminPage">
            
            <BO_AdminPage_header />

            <div class="adminOperations_container">

                <div class="adminOperations">

                    <div class="adminRegistration-section adminOperations-section">
                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Ajouter un nouvel administrateur</p>
                            <ReusableSeparator/>
                        </div>
                        <div class="aboutNotification">
                            <p>
                                Notification: Un administrateur actuellement connecté peut créer un nouvel administrateur ici. L’administrateur nouvellement créé pourra modifier son mot de passe lors de sa future connexion et bénèficiera de tous les mêmes droits que l’administrateur actuellement connecté.
                            </p>
                        </div>
                        <BO_AdminForm_register class="adminRegisterForm"/>
                    </div>

                </div>  

            </div>
        </div>
    </div>

    <BackOfficeNavMobile />
    
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import BO_AdminForm_register from '@/components/BO_AdminForm_register.vue';
    import BO_AdminPage_header from '@/components/BO_AdminPage_header.vue';
    import BackOfficeNavMobile from '@/components/BackOfficeNavMobile.vue';
    import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

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