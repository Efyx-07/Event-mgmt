<template>
    <button class="participateButton">
        <p>Je participe</p>
    </button>
</template>

<script setup></script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

    .participateButton {
        width: 12rem;
        height: 3.5rem;
        background: $accentColor2;
        border: none;
        border-radius: $containerRadius * 2;
        box-shadow: $shadow;
        cursor: pointer;

        &:hover {
            background: rgba($accentColor2, .8);
        }

        p {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: $lightColor;
        }
    }
</style>