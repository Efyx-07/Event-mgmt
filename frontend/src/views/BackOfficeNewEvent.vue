<template>

    <div class="backOfficeEventHandlingPage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="eventHandlingPage">

            <header class="eventHandlingPageHeader">
                <div class="eventHandlingPageHeader_content">
                    <h1>Nouvel évènement</h1>
                    <BackToEventsButton class="backToEventsButton"/>
                    <MobileMenuIcon />
                </div>
            </header>

            <div class="eventHandlingOperations_container">

                <div class="eventHandlingOperations">

                    <div class="eventHandlingOperations-section">

                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Données de l'évènement</p>
                            <ReusableSeparator/>
                        </div>

                        <BO_EventForm_create class="eventForm"/>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <BackOfficeNavMobile />
      
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import BackToEventsButton from '@/sub-components/BackToEventsButton.vue';
    import BO_EventForm_create from '@/components/BO_EventForm_create.vue';
    import MobileMenuIcon from '@/sub-components/MobileMenuIcon.vue';
    import BackOfficeNavMobile from '@/components/BackOfficeNavMobile.vue';
    import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/backOfficeEventHandlingPageStyle.scss';
    
</style>
