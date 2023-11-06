<template>

    <header>
        <div class="header_content">
            <h1>Gestion compte administrateur</h1>
            <AdminPageNav />
            <MobileMenuIcon class="mobileMenuIcon"/>
        </div>   
    </header>
    
</template>

<script setup>

    import AdminPageNav from '@/components/AdminPageNav.vue';
    import MobileMenuIcon from '@/sub-components/MobileMenuIcon.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';

    header {
        @include headersBasicSettings;
        .header_content {
            width: 100%;
            max-width: $contentMaxWidth;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
                    
            h1 {
                @include pageTitlesBasicSettings;
            }
        }
    }

    
</style>