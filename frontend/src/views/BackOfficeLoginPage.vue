<template>
    <div class="backOffice">
        <AdminLoginForm />
    </div>
    
</template>

<script setup>

    import AdminLoginForm from '@/components/AdminLoginForm.vue';
    
</script>

<style lang="scss" scoped>
    
    @import '@/assets/sass/variables.scss';
    .backOffice {
        height: 100vh;
        background: $darkColorBackOf;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
