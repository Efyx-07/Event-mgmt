<template>
    <div class="backOffice">
        <PlatformLogo class="platformLogo"/>
        <AdminLoginForm />
    </div>
    
</template>

<script setup>

    import AdminLoginForm from '@/components/AdminLoginForm.vue';
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
