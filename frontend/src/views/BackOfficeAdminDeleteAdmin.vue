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
                            <ReusableSeparator/>
                        </div>
                        <AdminsToDelete class="adminsToDelete"/>
                    </div>

                </div>  

            </div>
        </div>
    </div>

    <BackOfficeNavMobile />
    
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import AdminsToDelete from '@/components/AdminsToDelete.vue';
    import AdminPageHeader from '@/components/AdminPageHeader.vue';
    import BackOfficeNavMobile from '@/components/BackOfficeNavMobile.vue';
    import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/adminPagesStyle.scss';
    @import '@/assets/sass/mixins.scss';
    .adminsToDelete {
        @include adminForm;
    }
   
</style>