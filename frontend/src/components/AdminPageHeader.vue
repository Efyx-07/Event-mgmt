<template>

    <header>
        <div class="header_content">
            <h1>Gestion compte administrateur</h1>
            <AdminPageNav />
        </div>   
    </header>
    
</template>

<script setup>

    import AdminPageNav from '@/components/AdminPageNav.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

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
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    
                    h1 {
                        margin: 0;
                        font-size: 2rem;
                        color: $darkColor;
                    }
                }
            }

    
</style>