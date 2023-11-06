<template>

    <header>
        <div class="header_content">
            <h1>Gestion compte administrateur</h1>
            <AdminPageNav class="desktopAdminNav"/>
            <MobileMenuIcon class="mobileMenuIcon"/>
        </div>  
        <AdminPageNavMobile class="mobileAdminNav"/>
    </header>
    
</template>

<script setup>

    import AdminPageNav from '@/components/AdminPageNav.vue';
    import AdminPageNavMobile from '@/components/AdminPageNavMobile.vue';
    import MobileMenuIcon from '@/sub-components/MobileMenuIcon.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';
    @import '@/assets/sass/mixins.scss';

    header {
        @include headersMobileBasicSettings;
        flex-direction: column;
        gap: 1rem;
        align-items: center;

        .header_content {
            width: 100%;
            display: grid;
            grid-template-columns: 4fr 1fr;
            align-items: center;
                    
            h1 {
                margin: 0;
                font-size: 1.5rem;
            }
            .desktopAdminNav {
                display: none;
            }
            .mobileMenuIcon {
                justify-self: right;
            }
        }
    }

    @media screen and (min-width: $breakpointDesktop) {

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
                .desktopAdminNav {
                    display: flex;
                }
            }
            .mobileAdminNav {
                display: none;
            }
        }
    }

    
</style>