<template>

    <div class="backOfficeAdminPage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="adminPage">
            
            <AdminPageHeader />

            <div class="adminOperations_container">

                <div class="adminOperations">

                    <div class="adminPasswordUpdating-section adminOperations-section">
                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Modifier votre mot de passe</p>
                            <div class="line"></div>
                        </div>
                        <AdminUpdatePasswordForm class="adminUpdatePasswordForm"/>
                    </div>

                </div>  

            </div>
        </div>
    </div>

    <BackOfficeNavMobile />
    
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import AdminUpdatePasswordForm from '@/components/AdminUpdatePasswordForm.vue';
    import AdminPageHeader from '@/components/AdminPageHeader.vue';
    import BackOfficeNavMobile from '@/components/BackOfficeNavMobile.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/adminPagesStyle.scss';
    @import '@/assets/sass/mixins.scss';
    .adminUpdatePasswordForm {
        @include adminForm;
    }
  
</style>