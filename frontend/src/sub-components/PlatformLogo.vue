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
    @import '@/assets/sass/varMediaQueries.scss';

    @media screen and (min-width: $breakpointDesktop) {
        .platformLogo {
            font-family: 'Blinker', sans-serif;
            color: $lightColor;
            display: flex;
            align-items: center;
            gap: 1rem;
            .icon {
                font-size: 1.5rem;
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
                    font-size: 1.5rem;
                    font-weight: 300;
                }
                .subName {
                    font-size: .8rem;
                    color: $accentColorBackof3;
                    font-weight: 400;
                }
            }
        }
    }

    @media screen and (min-width: 1440px) {
    .platformLogo {
        .icon {
            font-size: 2.5rem;
        }
        .platformName {
            .mainName {
                font-size: 2.5rem;
            }
            .subName {
                font-size: 1rem;
            }
        }
    }
}
    
</style>
