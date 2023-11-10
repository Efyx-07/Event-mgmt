<template>

    <button class="primaryBtn">
        <slot></slot>
    </button>

</template>

<script setup>

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';
    .primaryBtn {
        @include backOfficeButtonStyle;
        background: $accentColorBackof2;
    }

</style>