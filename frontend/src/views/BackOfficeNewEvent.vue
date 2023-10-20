<template>

    <div class="backOfficeNewEventPage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="newEventPage">

            <header class="newEventPageHeader">
                <div class="newEventPageHeader_content">
                    <h1>Nouvel évènement</h1>
                </div>
            </header>

            <div class="newEventPage_content">
                <CreateEventForm />
            </div>

        </div>

    </div>
    
    
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import CreateEventForm from '@/components/CreateEventForm.vue'

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .backOfficeNewEventPage {
        display: grid;
        grid-template-columns: 1fr 3fr;
        .newEventPage {
            grid-column: 2 / -1;
            display: flex;
            flex-direction: column;
            align-items: center;

            .newEventPageHeader {
                background: $ultraLightColor;
                box-shadow: $shadow;
                padding: 1rem 3rem;
                width: 100%;
                display: flex;
                justify-content: center;
                position: sticky;
                top: 0;
                z-index: 99;

                &_content {
                    width: 100%;
                    max-width: $contentMaxWidth;
                    
                    h1 {
                        margin: 0;
                        font-size: 2rem;
                        color: $darkColor;
                    }
                }
            }

            &_content {
                width: 100%;
                padding: 3rem;
                max-width: $contentMaxWidth;
            }
        }
    }
    
</style>
