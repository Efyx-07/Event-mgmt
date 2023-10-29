<template>

    <div class="EventPageSectionProgramme">
        <div class="title_container">
            <h2>Programme</h2>
            <div class="separator"></div>
        </div>
        <div class="programme_container">
            <p v-html="formattedProgramme"></p>
        </div>
    </div>
    
</template>

<script setup>

    import { computed } from 'vue';

    // recupère la props de selectedEvents en provenance de EventPage
    const { selectedEvent } = defineProps(['selectedEvent']);

    // Fonction pour formater les sauts de ligne en balises <br> et [b] en <strong>
  const formattedProgramme = computed(() => {
    const text = selectedEvent.programme;

    // Remplacer les balises [b] par <strong>
    const formattedText = text.replace(/\[b\]/g, '<strong>').replace(/\[\/b\]/g, '</strong>');

    // Remplacer les sauts de ligne par <br>
    return formattedText.replace(/\r\n/g, '<br>');
  });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .EventPageSectionProgramme {
        .title_container {

            display: flex;
            flex-direction: column;
            gap: 1rem;

            h2 {
                margin: 0;
                font-size: 1.5rem;
            }
            .separator {
                width: 100%;
                height: 1px;
                background: rgba($accentColor1, .25);
            }

        }
        .programme_container {
            padding: 2rem 0;
            display: flex;
            justify-content: center;
            
            p {
                margin: 0;
                text-align: center;
            }
        }
    }
    
    
</style>