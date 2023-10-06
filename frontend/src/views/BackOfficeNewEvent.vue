<template>
    
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
    
</template>

<script setup>

    import CreateEventForm from '@/components/CreateEventForm.vue'

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
        .newEventPage {
            display: flex;
            flex-direction: column;
            align-items: center;

            .newEventPageHeader {
                background: $darkColorBackOf;
                padding: 1rem 3rem;
                width: 100%;
                display: flex;
                justify-content: center;

                &_content {
                    width: 100%;
                    max-width: $contentMaxWidth;
                    
                    h1 {
                        margin: 0;
                        font-size: 3rem;
                        color: $lightColor;
                    }
                }
            }

            &_content {
                width: 100%;
                padding: 3rem 0;
                max-width: $contentMaxWidth;
            }
        }
    
</style>
