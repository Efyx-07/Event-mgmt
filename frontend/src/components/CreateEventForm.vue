<template>
    
    <form class="createEventForm" @submit.prevent="validateEventCreation" enctype="multipart/form-data">

        <div class="inputs_wrapper">

            <div class="input-container">
                <label for="event-title">Titre de l'évènement</label>
                <input 
                    type="text"
                    name="eventTitle"
                    required
                    id="create_eventTitle"
                    class="input-text"
                    v-model="eventTitle"
                >
            </div>

            <div class="coverImageInputAndPreview_container">
                <div class="input-container" >
                    <label for="event-coverImage">Image de couverture</label>
                        <div class="image-input_container" v-if="!coverImagePreview">
                            <input 
                            type="file"
                            name="eventCoverImage"
                            required
                            accept="image/jpg, image/jpeg, image/png"
                            class="image-input"
                            id="create_coverImage"
                            @change="handleCoverImageFileChange"
                        >
                    </div>
                    <div class="coverImagePreview_container" v-else>
                        <img :src="coverImagePreview" class="coverImagePreview">
                        <div class="trashIcon_container" @click="deleteCoverImageFromPreview">
                            <Icon icon="ph:trash" class="trashIcon"/>
                        </div>
                    </div>
                </div> 
                
            </div>
            

            <div class="input-container">
                <label for="event-date">Date de l'évènement</label>
                <input 
                    type="date"
                    name="eventDate"
                    required
                    id="create_eventDate"
                    class="input-text"
                    v-model="eventDate"
                >
            </div>

            <div class="input-container">
                <label for="event-location">Lieu de l'évènement</label>
                <input 
                    type="text"
                    name="eventLocation"
                    required
                    id="create_eventLocation"
                    class="input-text"
                    v-model="eventLocation"
                >
            </div>

            <div class="input-container">
                <label for="event-presentation">Présentation de l'évènement</label>
                <ckeditor :editor="editor" v-model="editorDataPresentation" :config="editorConfig" @input="updateEventPresentation"></ckeditor>
            </div>

            <div class="input-container">
                <label for="event-programme">Programme de l'évènement</label>
                <ckeditor :editor="editor" v-model="editorDataProgramme" :config="editorConfig" @input="updateEventProgramme"></ckeditor>
            </div>

            <div class="input-container">
                <label for="event-practicalInformations">Informations pratiques</label>
                <ckeditor :editor="editor" v-model="editorDataPracticalInformations" :config="editorConfig" @input="updateEventPracticalInformations"></ckeditor>
            </div>

            <div class="input-container">
                <label for="event-organizerName">Nom de l'organisateur</label>
                <input 
                    type="text"
                    name="eventOrganizerName"
                    required
                    id="create_eventOrganizerName"
                    class="input-text"
                    v-model="eventOrganizerName"
                >
            </div>

            <div class="input-container">
                <label for="event-organizerLogo">Logo de l'organisateur</label>
                <input 
                    type="file"
                    name="eventOrganizerLogo"
                    required
                    accept="image/jpg, image/jpeg, image/png"
                    class="image-input"
                    id="create_eventOrganizerLogo"
                    @change="handleOrganizerLogoFileChange"
                >
            </div> 

            <div class="input-container">
                <label for="event-organizerWebsite">Site web de l'organisateur</label>
                <input 
                    type="url"
                    name="eventOrganizerWebsite"
                    placeholder="https://www.example.com"
                    required
                    id="create_eventOrganizerWebsite"
                    class="input-text"
                    v-model="eventOrganizerWebsite"
                >
            </div>

        </div>

        <div class="createEventForm-buttons_container">
            <ReusableSecondaryButton  @click="navigateToHomepage">Annuler</ReusableSecondaryButton> 
            <ReusablePrimaryButton type="submit">Publier l'évènement</ReusablePrimaryButton>
        </div>

    </form>

</template>

<script setup>

    import { ref, onMounted } from 'vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import { useEventStore } from '@/stores/EventStore';
    import { useAdminStore } from '@/stores/AdminStore';
    import { useRouter } from 'vue-router';
    import { Icon } from '@iconify/vue';
    import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
    import ReusableSecondaryButton from '@/sub-components/ReusableSecondaryButton.vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    // propriétés du formulaire
    const eventTitle = ref('');
    const eventCoverImage = ref('');
    const eventDate = ref('');
    const eventLocation = ref('');
    const eventPresentation = ref('');
    const eventProgramme = ref('');
    const eventPracticalInformations = ref('');
    const eventOrganizerName = ref('');
    const eventOrganizerLogo = ref('');
    const eventOrganizerWebsite  = ref('');

    // propriété de la preview de l'image de couverture
    const coverImagePreview = ref('');

    // gère le téléchargement du fichier image de couverture et stocke le fichier selectionné
    const handleCoverImageFileChange = (event) => {
        eventCoverImage.value = event.target.files[0];

        // permet la preview de l'image de couverture
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                coverImagePreview.value = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    // supprime l'image de couverture en preview
    const deleteCoverImageFromPreview = () => {
        coverImagePreview.value = '';
    };

    // gère le téléchargement du fichier logo de l'organisateur et stocke le fichier selectionné
    const handleOrganizerLogoFileChange = (event) => {
        eventOrganizerLogo.value = event.target.files[0];
    };

    // crée une instance CKEditor
    const editor = ClassicEditor;
    let editorDataPresentation = '';
    let editorDataProgramme = '';
    let editorDataPracticalInformations = '';
    const editorConfig = {
        toolbar: {
        items: [
            'bold', 
            'italic',
            'bulletedList', 
            'numberedList', 
            'undo', 
            'redo'
        ]
        },
        language: 'fr',
    };

    // lie les editorData aux propriétés du formulaire envoyées
    onMounted(() => {
        editorDataPresentation = eventPresentation.value;
        editorDataProgramme = eventProgramme.value;
        editorDataPracticalInformations = eventPracticalInformations.value;
    });

    // fonctions pour mettre à jour les propriétés du formulaires quand le contenu de l'éditeur change
    const updateEventPresentation = (event) => {
        eventPresentation.value = event;
    }
    const updateEventProgramme = (event) => {
        eventProgramme.value = event;
    };
    const updateEventPracticalInformations = (event) => {
        eventPracticalInformations.value = event;
    };

    const eventStore = useEventStore();
    const adminStore = useAdminStore();
    const router = useRouter();

    // soumet le formulaire
    const validateEventCreation = async () => {
        
        const formData = new FormData();
        formData.append('eventTitle', eventTitle.value);
        formData.append('eventCoverImage', eventCoverImage.value);
        formData.append('eventDate', eventDate.value);
        formData.append('eventLocation', eventLocation.value);
        formData.append('eventPresentation', eventPresentation.value);
        formData.append('eventProgramme', eventProgramme.value);
        formData.append('eventPracticalInformations', eventPracticalInformations.value);
        formData.append('eventOrganizerName', eventOrganizerName.value);
        formData.append('eventOrganizerLogo', eventOrganizerLogo.value);
        formData.append('eventOrganizerWebsite', eventOrganizerWebsite.value);

        const adminId = adminStore.adminData.id;

        formData.append('adminId', adminId);

        // affiche les valeurs dans la console
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {

            const { hostName } = useGlobalDataStore();
            
            const response = await fetch (`${hostName}/events/create`, {
                method: 'POST', 
                body: formData,          
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Réponse de l\'API:', data.message);

                // ajoute le nouvel evenement dans la liste d'evenements dans le store
                eventStore.events.push(data.event);

                // charge les données des évènements
                await eventStore.loadEventsData();

                // renvoie vers une page de redirection
                router.push('/admin_publication-confirmation');
                        
            } else {
                console.error('Erreur lors de la création d\'evenement :', response.statusText);
            }

        } catch(error) {
            console.error('Erreur lors de la création d\'evenement :', error);
        }  

    };

    // reconduis vers la page 'vos évènements'
    const navigateToHomepage = () => {
        router.push('/admin_homepage');
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';
    .createEventForm {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        .inputs_wrapper {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            .input-container {
                display: flex;
                flex-direction: column;
                gap: .5rem;

                label {
                    margin: 0;
                    font-weight: 700;
                }

                input {
                    width: 100%;
                    height: 3rem;
                    border: solid 1px rgba($accentColorBackof3, .25);
                    border-radius: $containerRadiusS;
                    font-size: 1rem;
                    outline: none;

                    &:focus {
                        background: transparent;
                        border: solid 1px $accentColorBackof2;
                    }
                }
                .input-text {
                    padding: 1rem;
                }
                .image-input {
                    border: none;
                    border-radius: unset;

                    &::file-selector-button {
                        height: 2.5rem;
                        padding: 0 1rem;
                        margin-right: 1rem;
                        border: solid 1px rgba($accentColorBackof3, .25);
                        border-radius: $containerRadiusS;
                        background: transparent;
                        color: $darkColor;
                        cursor: pointer;

                        &:hover {
                            color: $accentColorBackof2;
                            border: solid 1px $accentColorBackof2;
                        }

                    }

                    &:focus {
                        border: none
                    }
                }  
            }
            .coverImageInputAndPreview_container {
                .coverImagePreview_container {
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    position: relative;
                    overflow: hidden;
                    border-radius: $containerRadiusS;
                    box-shadow: $shadow;
                    .coverImagePreview {
                        width: 100%;
                        height: 100%;
                        display: block;
                        position: relative;
                        object-fit: cover;
                    }
                    .trashIcon_container {
                        position: absolute;
                        top: .5rem;
                        right: .5rem;
                        width: 3rem;
                        height: 3rem;
                        background: $accentColorBackof4;
                        border-radius: 100%;
                        border: solid 2px $accentColorBackof2;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;

                        &:hover {
                            background: $accentColorBackof2;
                        }
                        .trashIcon {
                            color: $lightColor;
                            font-size: 1.5rem;
                        }
                    }
                }
            }
        }
        .createEventForm-buttons_container {
            display: flex;
            flex-wrap: wrap;
            justify-content: end;
            gap: 1rem;
        }
    
    }

    @media screen and (min-width: $breakpointDesktop) {
        .createEventForm {  
            .inputs_wrapper {
                .coverImageInputAndPreview_container {
                    .coverImagePreview_container {
                        width: 60%;
                        max-height: 17rem;
                        align-self: center;
                        .trashIcon_container {
                            top: 1rem;
                            right: 1rem;
                        }
                    }
                    
                }
            }
        }
    }

    @media screen and (min-width: $breakpointLargeDesktop) {
        .createEventForm {   
            width: 75%;
        }
    }
    
</style>
