<template>

    <div class="searchIcon_container">
        <Icon icon="ic:sharp-search" class="searchIcon"/>
    </div>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .searchIcon_container {
        width: 2rem;
        height: 2rem;
        background: $secondaryButtonColor;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .searchIcon {
            color: $lightColor;
        }
    }
</style>