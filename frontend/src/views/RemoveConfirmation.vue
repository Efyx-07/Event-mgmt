<template>

    <div class="removeConfirmation">
        <BackOfficeNavAside class="backOfficeNavAside"/>
        <div class="removeConfirmation_content">
            <p>Bravo, votre évènement a été supprimé avec succès !</p>
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
    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';

    const router = useRouter();

    // reconduis vers la page 'vos évènements'
    const navigateToHomepageAndReload = () => {
        router.push('/admin_homepage');
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .removeConfirmation {
        position:relative;
        min-height: 100vh;
        display: grid;
        grid-template-columns: 1fr 3fr;
        .removeConfirmation_content {
            grid-column: 2 / -1;
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
                border: none;
                background: $darkColorBackOf;
                cursor: pointer;

                &:hover {
                    background: $accentColorBackof2;
                }

                p {
                    margin: 0;
                    color: $lightColor;
                    font-size: 1.3rem;
                    font-weight: 700;
                    padding: .7rem 1rem;
                }
                        
            }
        }
    }
      
</style>