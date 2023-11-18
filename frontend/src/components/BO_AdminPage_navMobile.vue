<template>

    <div class="adminPageNavMobile">

        <router-link to="/admin_your-account" class="navIcon" :class="{ 'active-link': $route.path === '/admin_your-account' }">
            <Icon icon="subway:admin" />
        </router-link>

        <router-link to="/admin_add-admin" class="navIcon" :class="{ 'active-link': $route.path === '/admin_add-admin' }">
            <Icon icon="subway:admin-1" />
        </router-link>

        <router-link to="/admin_delete-admin" class="navIcon" :class="{ 'active-link': $route.path === '/admin_delete-admin' }">
            <Icon icon="subway:admin-2" />
        </router-link>

    </div>
    
</template>

<script setup>

    import { Icon } from '@iconify/vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .adminPageNavMobile {
        width: 100%;
        display: flex;
        justify-content: space-around;
        .navIcon {
            text-decoration: none;
            color: $darkColor;
            font-size: 1.5rem;

            &:hover,
            &.active-link {
                color: $accentColorBackof2;
            }
        }
    }
</style>