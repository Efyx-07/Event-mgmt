<template>

    <div class="publicationConfirmation">
        <div class="publicationConfirmation_content">
            <p>Bravo, votre évènement a été publié avec succès !</p>
            <Icon icon="streamline-emojis:ok-hand-2" class="icon"/>
            <div type="submit" class="toEvents_button" @click="navigateToHomepageAndReload">
                <p>Retour à vos évènements</p>
            </div>
        </div>
    </div>

    
</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const navigateToHomepageAndReload = () => {
        router.push('/admin_homepage');
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .publicationConfirmation {
        position:relative;
        min-height: 100vh;
        .publicationConfirmation_content {
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
                font-size: 1.4rem;
            }
            .icon {
                font-size: 6rem;
            }

            .toEvents_button {
                text-decoration: none;
                justify-self: center;
                background: transparent;
                color: $darkColorBackOf;
                border: 2px solid $darkColorBackOf;
                cursor: pointer;

                &:hover {
                    border-color: $accentColorBackof2;
                    color: $accentColorBackof2;
                }

                p {
                    margin: 0;
                    font-size: 1.4rem;
                    font-weight: 700;
                    padding: 1rem 2rem;
                }
                        
            }
        }
    }
    
    
</style>
