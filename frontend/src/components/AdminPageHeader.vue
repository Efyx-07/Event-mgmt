<template>

    <header>
        <div class="header_content">
            <h1>Gestion compte administrateur</h1>
            <AdminPageNav class="desktopAdminNav"/>
            <AdminPageNavMobile class="mobileAdminNav2"/>
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
            .mobileAdminNav2 {
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

                h1 {
                    @include pageTitlesBasicSettings;
                }
            }
            
        }
    }

    @media screen and (min-width: 1148px) {

        header {
            .header_content {
                display: flex;
                justify-content: space-between;
                align-items: baseline;

                h1 {
                    flex: 2;
                }
                .mobileAdminNav2 {
                    display: flex;
                    justify-content: space-between;
                    flex:1;
                } 
            }
            .mobileAdminNav {
                display: none;
            }
        }
               
    }

    @media screen and (min-width: 1525px) {

        header {
            .header_content {
                max-width: $contentMaxWidth;
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                .desktopAdminNav {
                    display: flex;
                }
                .mobileAdminNav2 {
                    display: none;
                }
            }
        }
    }

</style>