<template>

    <div class="backOfficeAdminPage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="adminPage">
            
            <BO_AdminPage_header />

            <div class="adminOperations_container">

                <div class="adminOperations">

                    <div class="adminDeleting-section adminOperations-section">
                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Supprimer un administrateur</p>
                            <ReusableSeparator/>
                        </div>
                        <BO_AdminForm_delete class="adminsToDelete"/>
                    </div>

                </div>  

            </div>
        </div>
    </div>

    <BackOfficeNavMobile />
    
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import BO_AdminForm_delete from '@/components/BO_AdminForm_delete.vue';
    import BO_AdminPage_header from '@/components/BO_AdminPage_header.vue';
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