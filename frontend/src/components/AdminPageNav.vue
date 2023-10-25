<template>

    <div class="adminPageNav">

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

    @import '@/assets/sass/variables.scss';
    .adminPageNav {
        display: flex;
        align-items: center;
        gap: 2rem;
        .navItem {
            text-decoration: none;
            display: flex;
            flex-direction: column;
            color: $darkColor;

            p {
                margin: 0;
            }
            .activeBar {
                height: 1px;
                width: 100%;
                background-color: $accentColorBackof2;
                clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
                transition: clip-path .2s ease-in-out;
            }

            &:hover,
            &.active-link {
                color: $accentColorBackof2;
            }

            &:hover>.activeBar {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
            }
            &.active-link>.activeBar {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
            }
        }
    }
    
</style>
