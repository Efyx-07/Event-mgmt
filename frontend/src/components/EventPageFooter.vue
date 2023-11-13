<template>

    <div class="footer">

        <div class="content">

            <div class="links_container">
                <p>Conditions d'utilisation</p>
                <p>Contact</p>
            </div>

            <div class="toTopButton_container"  @click="scrollToTop">
                <Icon icon="iconamoon:arrow-up-2-duotone" class="toTopIcon"/>
            </div>

        </div>

    </div>

    <div class="footer_mobile">
        <ParticipateButton class="footer_mobile-button"/>
        <div class="mobileToTopButton_container"  @click="scrollToTop">
            <Icon icon="iconamoon:arrow-up-2-duotone" class="mobileToTopIcon"/>
        </div>
    </div>
    
</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import ParticipateButton from '@/sub-components/ParticipateButton.vue';

     // permet le retour vers le haut de page
     const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';

    .footer {
        display: none;
        color: $darkColor;
    }
    .footer_mobile {
        width: 100%;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        position: fixed;
        bottom: 0;
        background: $ultraLightColor;
        box-shadow: $shadow;
        padding: 0 1rem;
        .mobileToTopButton_container {
            padding: .3rem;
            color: rgba($darkColor, .75);
            border: solid 1px rgba($darkColor, .25);
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &:hover {
                color: $accentColor1;
                border-color: $accentColor1;
            }
            .mobileToTopIcon {
                font-size: 2rem;
            }
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .footer_mobile {
            display: none;
        }
        .footer {
            width: 100%;
            height: 8rem;
            background: $lightColor;
            border-top: solid 1px rgba($darkColor, .25);
            display: flex;
            justify-content: center;
            .content {
                width: 100%;
                max-width: 77rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 1rem;
                .links_container {
                    display: flex;
                    gap: 3rem;

                    p {
                        margin: 0;
                        font-size: .9rem ;
                    }
                }
                .toTopButton_container {
                    width: 3rem;
                    height: 3rem;
                    background: $accentColor2;
                    box-shadow: $shadow;
                    border-radius: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;

                    &:hover {
                        background: $accentColor1;
                    }
                    .toTopIcon {
                        color: $lightColor;
                        font-size: 2.5rem;
                    }
                }
            }
        }
    }
    
</style>
