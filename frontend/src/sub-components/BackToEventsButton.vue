<template>

    <router-link to="/admin_homepage" class="backToEventsButton">
        <p>Retour à vos évènements</p>
    </router-link>
    
</template>

<script setup>

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .backToEventsButton {
        text-decoration: none;
        background: transparent;
        color: $darkColor;
        border: 1px solid $darkColorBackOf;
        display: flex;
        justify-content: center;
        text-align: center;
        cursor: pointer;

        &:hover {
        color: $accentColorBackof2;
        border-color: $accentColorBackof2;
        }

        p {
        margin: 0;
        font-size: .8rem;
        font-weight: 700;
        padding: .5rem;
        }
    }
    
</style>
