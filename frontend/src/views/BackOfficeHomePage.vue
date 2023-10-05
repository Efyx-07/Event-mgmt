<template>

    <div class="adminHomePage">
        <header class="adminHomePageHeader">
            <h1>Vos évènements</h1>
            <button type="submit" class="toNewEvent_button">
                <p>Nouvel évènement</p>
            </button>
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
                justify-self: center;
                background: $darkColorBackOf;
                border: 2px solid $lightColor;
                cursor: pointer;

                &:hover {
                    background: #394084;
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
