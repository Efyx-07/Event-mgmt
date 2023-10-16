<template>
    <div class="platformLogo">

        <Icon icon="solar:planet-3-broken" class="icon"/>
        <div class="platformName">
            <p class="mainName">O X Y E V E N T S</p>
            <p class="subName">M A N A G E R</p>
        </div>

    </div>
</template>

<script setup>

    import { Icon } from '@iconify/vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .platformLogo {
        font-family: 'Blinker', sans-serif;
        color: $lightColor;
        display: flex;
        align-items: center;
        gap: 1rem;
        .icon {
            font-size: 2.5rem;
        }
        .platformName {
            display: flex;
            flex-direction: column;
            align-items:flex-end;

            p {
                margin: 0;
                line-height: 1;
            }

            .mainName {
                font-size: 2.5rem;
                font-weight: 300;
            }
            .subName {
                font-size: 1rem;
                color: $accentColorBackof3;
                font-weight: 400;
            }
        }

        


    }
    
</style>
