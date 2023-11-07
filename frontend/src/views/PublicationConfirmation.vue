<template>

    <div class="publicationConfirmation">

        <BackOfficeNavAside class="backOfficeNavAside"/>
        <MobileMenuIcon class="mobileMenuIcon"/>

        <div class="publicationConfirmation_content">
            <p>Bravo, votre évènement a été publié avec succès !</p>
            <Icon icon="streamline-emojis:ok-hand-2" class="icon"/>
            <div type="submit" class="toEvents_button" @click="navigateToHomepage">
                <p>Retour à vos évènements</p>
            </div>
        </div>

    </div>

    <BackOfficeNavMobile />
   
</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import { useRouter } from 'vue-router';
    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import MobileMenuIcon from '@/sub-components/MobileMenuIcon.vue';
    import BackOfficeNavMobile from '@/components/BackOfficeNavMobile.vue';

    const router = useRouter();

    // reconduis vers la page 'vos évènements'
    const navigateToHomepage = () => {
        router.push('/admin_homepage');
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';
    .publicationConfirmation {
        position:relative;
        min-height: 100vh;
        .mobileMenuIcon {
            position: absolute;
            top: 1rem;
            right: 1rem;
        }
        .publicationConfirmation_content {
            width: 100%;
            padding: 1rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;

            p {
                margin: 0;
                font-size: 1rem;
                text-align: center;
            }
            .icon {
                font-size: 4rem;
            }

            .toEvents_button {
                max-width: 90%;
                text-decoration: none;
                border: none;
                background: $darkColorBackOf;
                cursor: pointer;

                &:hover {
                    background: $accentColorBackof2;
                }

                p {
                    margin: 0;
                    color: $lightColor;
                    font-size: 1rem;
                    font-weight: 700;
                    padding: .7rem;
                }
                        
            }
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .publicationConfirmation {
            display: grid;
            grid-template-columns: 1fr 3fr;
            .publicationConfirmation_content {
                grid-column: 2 / -1;
                width: unset;
                padding: unset;

                p {
                    font-size: 1.4rem;
                }
                .icon {
                    font-size: 6rem;
                }

                .toEvents_button {
                    max-width: unset;

                    p {
                        font-size: 1.3rem;
                        padding: .7rem 1rem;
                    }
                            
                }
            }
        }
    }
      
</style>
