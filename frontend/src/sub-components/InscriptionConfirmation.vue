<template>

    <div class="inscriptionConfirmation">
        <p>Merci, nous avons bien enregistré votre inscription !</p>
        <Icon icon="ooui:success" class="validateIcon"/>
    </div>
    
</template>

<script setup>

    import { Icon } from '@iconify/vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .inscriptionConfirmation {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            font-size: 1.3rem;
            text-align: center;
        }
        .validateIcon {
            color: $validColor;
            font-size: 2rem;
        }
    }
    
</style>
