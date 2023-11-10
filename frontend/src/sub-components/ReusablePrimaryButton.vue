<template>

    <button class="primaryBtn">
        <slot></slot>
    </button>

</template>

<script setup>

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

    .primaryBtn {
        font-size: 1rem;
        padding: .6rem 1.1rem;
        border: none;
        background: $accentColorBackof2;
        color: $ultraLightColor;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background: $darkColorBackOf;
        }
    }

</style>