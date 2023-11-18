<template>

    <div class="backOfficeAdminPage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="adminPage">
            
            <BO_AdminPage_header />

            <div class="adminOperations_container">

                <div class="adminOperations">

                    <div class="adminPasswordUpdating-section adminOperations-section">
                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Modifier votre mot de passe</p>
                            <ReusableSeparator/>
                        </div>
                        <BO_AdminForm_updatePassword class="adminUpdatePasswordForm"/>
                    </div>

                </div>  

            </div>
        </div>
    </div>

    <BackOfficeNavMobile />
    
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import BO_AdminForm_updatePassword from '@/components/BO_AdminForm_updatePassword.vue';
    import BO_AdminPage_header from '@/components/BO_AdminPage_header.vue';
    import BackOfficeNavMobile from '@/components/BackOfficeNavMobile.vue';
    import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/adminPagesStyle.scss';
    @import '@/assets/sass/mixins.scss';
    .adminUpdatePasswordForm {
        @include adminForm;
    }
  
</style>