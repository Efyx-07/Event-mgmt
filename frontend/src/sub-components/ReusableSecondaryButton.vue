<template>

    <button class="secondaryBtn">
        <slot></slot>
    </button>

</template>

<script setup>

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';
    .secondaryBtn {
        @include backOfficeButtonStyle;
        background: $secondaryButtonColor;

        &:hover {
            background: rgba($secondaryButtonColor, .7);
        }
    }

</style>