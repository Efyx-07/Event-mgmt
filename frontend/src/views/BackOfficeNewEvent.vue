<template>
    
    <div class="newEventPage">
        <header class="newEventPageHeader">
            <h1>Nouvel évènement</h1>
        </header>
    </div>
    
</template>

<script setup>

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
        .newEventPage {
            .newEventPageHeader {
                background: $darkColorBackOf;
                padding: 1rem 3rem;

                h1 {
                    margin: 0;
                    font-size: 3rem;
                    color: $lightColor;
                }
            }
        }
    
</style>
