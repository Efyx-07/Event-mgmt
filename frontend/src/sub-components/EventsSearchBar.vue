<template>

    <div class="searchBar_container">
        <input type="search" id="searchEventByKeyword" name="searchEventByKeyword" class="searchBar" placeholder="Rechercher par mot-clé" v-model="searchEventByKeyword">
        <div class="searchIcon_container">
            <Icon icon="ic:sharp-search" class="searchIcon"/>
        </div>
    </div>
    
</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';

    const searchEventByKeyword = ref('');

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .searchBar_container {
        width: 20rem;
        height: 2.5rem;
        position: relative;
        .searchBar {
            width: 100%;
            height: 100%;
            background: $lightColor;
            border-radius: $containerRadius;
            border: solid 1px $lightColor;
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
            border-radius: 0 $containerRadius $containerRadius 0;
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

</style>