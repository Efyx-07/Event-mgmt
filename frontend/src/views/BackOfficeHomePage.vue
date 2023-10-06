<template>

    <div class="adminHomePage">
        <header class="adminHomePageHeader">
            <div class="adminHomePageHeader_content">
                <h1>Vos évènements</h1>
                <router-link to="/admin_new-event" type="submit" class="toNewEvent_button">
                    <p>Nouvel évènement</p>
                </router-link>
            </div>
        </header>

        <div class="eventCards_container">
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
            <BackOfficeEventCard />
        </div>
    </div>
    
</template>

<script setup>
    
    import BackOfficeEventCard from '@/components/BackOfficeEventCard.vue'; 

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .adminHomePage {
        .adminHomePageHeader {
            background: $darkColorBackOf;
            padding: 1rem 3rem;
            display: flex;
            justify-content: center;
            position: sticky;
            top: 0;
            z-index: 99;

            &_content {
                display: grid;
                align-items: center;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                width: 100%;
                max-width: 102rem;

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
        .eventCards_container {
            padding: 3rem;
            display: flex;
            gap: 2rem;
            justify-content: center;
            flex-wrap: wrap;
        }
    }

    
</style>
