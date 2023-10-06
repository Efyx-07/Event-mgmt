<template>

    <div class="adminHomePage">
        <header class="adminHomePageHeader">
            <h1>Vos évènements</h1>
            <router-link to="/admin/new-event" type="submit" class="toNewEvent_button">
                <p>Nouvel évènement</p>
            </router-link>
        </header>
    </div>
    
</template>

<script setup>

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .adminHomePage {
        .adminHomePageHeader {
            background: $darkColorBackOf;
            display: grid;
            align-items: center;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            padding: 1rem 3rem;

            h1 {
                grid-column: 1 / -2;
                margin: 0;
                font-size: 6rem;
                color: $lightColor;
            }
            .toNewEvent_button {
                text-decoration: none;
                justify-self: center;
                background: $darkColorBackOf;
                border: 2px solid $lightColor;
                cursor: pointer;

                &:hover {
                    background: $accentColorBackof;
                }
                
                p {
                    margin: 0;
                    color: $lightColor;
                    font-size: 1.4rem;
                    font-weight: 700;
                    padding: 1rem 2rem;
                }
            }
        }
    }

    
</style>
