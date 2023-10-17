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
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .platformLogo {
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
        }
    }

</style>
