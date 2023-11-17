<template>
    
    <div class="navigationPart">
        <div class="navItem_container" @click="scrollToSection('presentation')">
            <p>Présentation</p>
            <div class="activeBar"></div>
        </div>
        <div class="navItem_container" @click="scrollToSection('programme')">
            <p>Programme</p>
            <div class="activeBar"></div>
        </div>
        <div class="navItem_container" @click="scrollToSection('practicalInformations')">
            <p>Informations-pratiques</p>
            <div class="activeBar"></div>
        </div>
    </div>


</template>

<script setup>

    // fonction pour lier item à la section ancrée
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .navigationPart {
        width: 100%;
        display: flex;
        gap: 3rem;
        justify-content: end;
        .navItem_container {
            text-decoration: none;
            display: flex;
            flex-direction: column;
            color: $darkColor;
            cursor: pointer;

            p {
                margin: 0;
            }
            .activeBar {
                height: 1px;
                width: 100%;
                background-color: $accentColor1;
                clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
                transition: clip-path .2s ease-in-out;
            }

            &:hover {
                color: $accentColor1;
            }

            &:hover>.activeBar {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
            }
        }
        
    }

</style>