<template>

    <div class="backOfficeAdminPage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="adminPage">
            <header>
                <div class="header_content">
                    <h1>Gestion compte administrateur</h1>
                </div>   
            </header>
        </div>
    </div>
    
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';

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
    }

    
</style>
