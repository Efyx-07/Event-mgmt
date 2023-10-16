<template>

    <div class="backOfficeNavAside">

        <div class="head-section">
            <PlatformLogo />
        </div>
        <router-link to="/admin_homepage" class="item-section" :class="{ 'active-link': $route.path === '/admin_homepage' }">
                <Icon icon="material-symbols:home-outline" class="icon"/>
                <p>Vos évènements</p>
                <div class="active-bar"></div>
        </router-link>
        <router-link to="/admin_new-event" class="item-section" :class="{ 'active-link': $route.path === '/admin_new-event' }">
                <Icon icon="ic:outline-create" class="icon"/>
                <p>Nouvel évènement</p>
                <div class="active-bar"></div>
        </router-link>
        <router-link to="/admin_admin-accounts" class="item-section" :class="{ 'active-link': $route.path === '/admin_admin-accounts' }">
                <Icon icon="material-symbols:manage-accounts-outline" class="icon"/>
                <p>Compte administrateur</p>
                <div class="active-bar"></div>
        </router-link>

        <div class="footer-section">
            <p>Nom admin</p>
            <Icon icon="mdi:power" class="icon"/>
        </div>


    </div>
    
</template>

<script setup>

        import PlatformLogo from '@/sub-components/PlatformLogo.vue';
        import { Icon } from '@iconify/vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .backOfficeNavAside {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 25vw;
        background: $darkColorBackOf;
        z-index: 199;
        .head-section {
            height: 6rem;
            display: flex;
            justify-content: center;
        }
        .head-section, .item-section {
            border-bottom: solid 1px $accentColorBackof3;
        }
        .item-section {
            text-decoration: none;
            height: 5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            color: $lightColor;
            padding-left: 2rem;
            cursor: pointer;
            position: relative;
            .icon {
                font-size: 2.25rem;
            }

            p {
                margin: 0;
                font-size: 1.5rem;
            }
            .active-bar {
                position: absolute;
                top: 0;
                left: 0;
                width: .25rem;
                height: 100%;
                background-color: transparent;
            }

            &:hover,
            &.active-link {
                background-color: $accentColorBackof4;
            }

            &:hover>.active-bar,
            &.active-link>.active-bar {
                background-color: $accentColorBackof2;
            }
        
        }
        .footer-section {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 6rem;
            background: $accentColorBackof4;
            color: $lightColor;
            border-top: solid 1px $accentColorBackof3;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;

            p {
                margin: 0;
                font-size: 1.2rem;
            }
            .icon {
                font-size: 2.25rem;
                cursor: pointer;

                &:hover {
                    color: $accentColorBackof2;
                }
            }

        }
    }
    
</style>
