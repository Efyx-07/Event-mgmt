<template>

    <div class="searchBar_container" :class="{ hiddenEventsSearchBar: !isEventsSearchBarVisible }">
        <div class="searchBar_content">
            <input type="search" id="searchEventByKeyword" name="searchEventByKeyword" class="searchBar" placeholder="Rechercher par mot-clé" v-model="searchEventByKeyword">
            <div class="searchIcon_container">
                <Icon icon="ic:sharp-search" class="searchIcon"/>
            </div>
        </div>
        <div class="closing-overlay" @click="closeEventsSearchBar"></div>
    </div>
    
    
</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import { ref, onMounted } from 'vue';

    const searchEventByKeyword = ref('');

    // statut par défaut de la visibilité de la searchbar
    const isEventsSearchBarVisible = ref(false);

    // permet la fermeture de la searchbar et réinitialise la valeur du champ de recherche
    const closeEventsSearchBar = () => {
        isEventsSearchBarVisible.value = false;
        searchEventByKeyword.value = '';
    }

    // ecoute l'événement personnalisé (créé sur 'SearchIcon') pour réafficher la fenetre
    onMounted(() => {
        window.addEventListener('show-eventsSearchBar', () => {
            isEventsSearchBarVisible.value = true;
        });
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';

    .hiddenEventsSearchBar {
        transform: translate(100%, -100%);
    }
    .searchBar_container {
        width: 100%;
        height: 100%;
        background: rgba($darkColorBackOf, .97);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform .2s ease-in-out;
        position: relative;
        .searchBar_content {
            width: 25rem;
            height: 2.5rem;
            margin: 0 1rem;
            position: relative;
            .searchBar {
                width: 100%;
                height: 100%;
                background: $lightColor;
                border-radius: $containerRadiusS;
                border: none;
                //border: solid 3px $darkColorBackOf;
                outline: none;
                padding-left: 1rem;
                font-size: 1rem;
                display: flex;
                align-items: center;

                &:focus {
                    border: solid 1px $accentColorBackof2;
                }
            }
            .searchIcon_container {
                width: 2.5rem;
                height: 100%;
                background: $secondaryButtonColor;
                border-radius: 0 $containerRadiusS $containerRadiusS 0;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                right: 0;
                cursor: pointer;

                &:hover {
                    background: rgba($secondaryButtonColor, .7);
                }
                .searchIcon {
                    color: $lightColor;
                    font-size: 1.5rem;
                }
            }
        }
        .closing-overlay {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
    }

    @media screen and (min-width: $breakpointDesktop) {

        .searchBar_container {
            .searchBar_content {
                width: 25rem;
                height: 2.7rem;
                .searchBar {
                    font-size: 1.2rem;
                }
            }
        }
    }
    

</style>