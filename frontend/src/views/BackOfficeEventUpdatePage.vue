<template>

    <div class="backOfficeEventUpdatePage">

        <BackOfficeNavAside class="backOfficeNavAside"/>

        <div class="eventUpdatePage">

            <header class="eventUpdatePageHeader">
                <div class="eventUpdatePageHeader_content">
                    <h1>Modifier votre évènement</h1>
                    <BackToEventsButtonVue class="backToEventsButton"/>
                </div>
            </header>

            <div class="eventUpdatePage_content">
                
            </div>

        </div>

    </div>
    
    
</template>

<script setup>

    import BackOfficeNavAside from '@/components/BackOfficeNavAside.vue';
    import BackToEventsButtonVue from '@/sub-components/BackToEventsButton.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .backOfficeEventUpdatePage {
        display: grid;
        grid-template-columns: 1fr 3fr;
        .eventUpdatePage {
            grid-column: 2 / -1;
            display: flex;
            flex-direction: column;
            align-items: center;

            .eventUpdatePageHeader {
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
                    display: grid;
                    align-items: center;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                    width: 100%;
                    max-width: $contentMaxWidth;
                    
                    h1 {
                        grid-column: 1 / -2;
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
