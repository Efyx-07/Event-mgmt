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
    @import '@/assets/sass/mixins.scss';
    .backOfficeNewEventPage {
        display: grid;
        grid-template-columns: 1fr 3fr;
        .newEventPage {
            grid-column: 2 / -1;
            .newEventPageHeader {
                @include headersBasicSettings;

                &_content {
                    width: 100%;
                    max-width: $contentMaxWidth;
                    
                    h1 {
                        @include pageTitlesBasicSettings
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
