<template>
    <div class="backOffice">
        <PlatformLogo class="platformLogo"/>
        <BO_AdminForm_login />
    </div>
    
</template>

<script setup>

    import BO_AdminForm_login from '@/components/BO_AdminForm_login.vue';
    import PlatformLogo from '@/sub-components/PlatformLogo.vue';
    
</script>

<style lang="scss" scoped>
    
    @import '@/assets/sass/variables.scss';
    .backOffice {
        height: 100vh;
        background: $darkColorBackOf;
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 2rem;
        justify-content: center;
        .platformLogo {
            grid-row: 1 / -3;
            align-self: end;
        }
    }

</style>
