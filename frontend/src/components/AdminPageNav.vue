<template>

    <div id="adminPageNav" class="boHeaderNav">

        <router-link to="/admin_your-account" class="navItem" :class="{ 'active-link': $route.path === '/admin_your-account' }">
            <p>Votre compte</p>
            <div class="activeBar"></div>
        </router-link>

        <router-link to="/admin_add-admin" class="navItem" :class="{ 'active-link': $route.path === '/admin_add-admin' }">
            <p>Ajouter administrateur</p>
            <div class="activeBar"></div>
        </router-link>

        <router-link to="/admin_delete-admin" class="navItem" :class="{ 'active-link': $route.path === '/admin_delete-admin' }">
            <p>Supprimer administrateur</p>
            <div class="activeBar"></div>
        </router-link>

    </div>
    
</template>

<script setup>

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/boHeaderNavStyle.scss';
    
</style>
