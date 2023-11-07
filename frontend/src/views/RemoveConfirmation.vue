<template>

    <div class="confirmation">

        <BackOfficeNavAside class="backOfficeNavAside"/>
        <MobileMenuIcon class="mobileMenuIcon"/>

        <div class="confirmation_content">
            <p>Bravo, votre évènement a été supprimé avec succès !</p>
            <Icon icon="streamline-emojis:ok-hand-2" class="icon"/>
            <div type="submit" class="toEvents_button" @click="navigateToHomepageAndReload">
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
    const navigateToHomepageAndReload = () => {
        router.push('/admin_homepage');
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/confirmationPagesStyle.scss';
      
</style>