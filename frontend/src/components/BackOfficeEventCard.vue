<template>

    <div class="backOfficeEventCard">

      <div class="eventImage_container">
        <img src="src/assets/images/Event1-banner.jpg" alt="" class="eventImage">
      </div>

      <div class="eventCard-titleAndActions_container">

        <EventTitle class="eventTitle" />

        <div class="actionIcons_container">

          <div class="icon_container" @mouseover="changeCursorText('Voir')" @mouseout="changeCursorText('')">
            <Icon icon="mdi:eye" class="icon" />
            <div v-if="cursorText === 'Voir'" class="cursor-text">{{ cursorText }}</div>
          </div>
  
          <div class="icon_container" @mouseover="changeCursorText('Editer')" @mouseout="changeCursorText('')">
            <Icon icon="ic:baseline-edit" class="icon" />
            <div v-if="cursorText === 'Editer'" class="cursor-text">{{ cursorText }}</div>
          </div>
  
          <div class="icon_container" @mouseover="changeCursorText('Suivi')" @mouseout="changeCursorText('')">
            <Icon icon="akar-icons:statistic-up" class="icon" />
            <div v-if="cursorText === 'Suivi'" class="cursor-text">{{ cursorText }}</div>
          </div>
  
          <div class="icon_container" @mouseover="changeCursorText('Supprimer')" @mouseout="changeCursorText('')">
            <Icon icon="mdi:trash" class="icon" />
            <div v-if="cursorText === 'Supprimer'" class="cursor-text">{{ cursorText }}</div>
          </div>

        </div>

      </div>

    </div>

  </template>
  
  <script setup>

    import { Icon } from '@iconify/vue';
    import EventTitle from '@/sub-components/EventTitle.vue';
    import { ref } from 'vue';
    
    const cursorText = ref('');
    
    const changeCursorText = (text) => {
        cursorText.value = text;
    };

  </script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .backOfficeEventCard {
        width: 24rem;
        height: 21rem;
        background: $ultraLightColor;
        box-shadow: $shadow;
        position: relative;
        .eventImage_container {
            width: 100%;
            height: 12rem;
            display: inline-block;
            position: relative;
            overflow: hidden;
            .eventImage {
                width: 100%;
                height: 100%;
                display: block;
                position: relative;
                object-fit: cover;
            }
        }
        .eventCard-titleAndActions_container {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            .eventTitle {
                font-size: 1.25rem;
            }
            .actionIcons_container {
                display: flex;
                gap: 1.5rem;
                position: absolute;
                right: 1rem;
                bottom: 1rem;

                .icon_container {

                    .icon {
                        font-size: 1.5rem;
                        cursor: pointer;

                        &:hover {
                            color: $accentColorBackof2;
                        }
                    }
                    .cursor-text {
                        position: absolute;
                        background:rgba($darkColorBackOf, .5);
                        color: $lightColor;
                        padding: .2rem .4rem;
                        border-radius: 5px;
                        font-size: .8rem;
                        pointer-events: none;
                    }
                }
            }
        }
    }
    
</style>
