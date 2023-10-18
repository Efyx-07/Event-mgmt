<template>

    <form class="inscriptionForm" ref="registrationForm" @submit.prevent="validate">

        <div class="input-container">
            <label for="entreprise">Entreprise / Organisation <span>{{requiredFieldMention}}</span></label>
            <input type="text" 
                   name="entreprise_organisation"
                   required 
                   id="inscription_entreprise-organisation" 
                   v-model="entrepriseOrganisation" 
                   @input="validateEntrepriseOrganisation"
            >
            <p class="error-message" v-if="!entrepriseOrganisationValid && entrepriseOrganisation  !== ''">Merci d'entrer un nom valide</p>   
        </div>

        <div class="input-container">
            <label for="nom">Nom <span>{{requiredFieldMention}}</span></label>
            <input type="text" 
                   name="nom" 
                   required 
                   id="inscription_nom" 
                   v-model="nom" 
                   @input="validateNom"
            >
            <p class="error-message" v-if="!nomValid && nom !== ''">Merci d'entrer un nom valide</p>  
        </div>

        <div class="input-container">
            <label for="prenom">Prénom <span>{{requiredFieldMention}}</span></label>
            <input type="text" 
                   name="prenom" 
                   required 
                   id="inscription_prenom" 
                   v-model="prenom" 
                   @input="validatePrenom"
            >
            <p class="error-message" v-if="!prenomValid && prenom !== ''">Merci d'entrer un prénom valide</p>  
        </div>

        <div class="input-container">
            <label for="telephone">Téléphone</label>
            <input type="tel" 
                   name="telephone"
                   id="inscription_telephone" 
                   v-model="telephone" 
                   @input="validateTelephone"
            >
            <p class="error-message" v-if="!telephoneValid && telephone !== ''">Merci d'entrer un numéro de téléphone valide</p>  
        </div>

        <div class="input-container">
            <label for="email">Email <span>{{requiredFieldMention}}</span></label>
            <input type="email" 
                   name="email" 
                   required 
                   id="inscription_email" 
                   v-model="email" 
                   @input="validateEmail"
            >
            <p class="error-message" v-if="!emailValid && email !== ''">Merci d'entrer un email valide</p>  
        </div>

        <p class="requiredFields-info"><span>{{requiredFieldMention}}</span> Champs obligatoires</p>

        <button class="inscription-button" type="submit">
            <p>Je m'inscris</p>
        </button>

    </form>
    
</template>

<script setup>

    import { ref } from 'vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';

    //datas
    const requiredFieldMention = '*';

    // propriétés du formulaire
    const entrepriseOrganisation = ref('');
    const nom = ref('');
    const prenom = ref('');
    const telephone = ref('');
    const email = ref('');
    const registrationForm = ref(null);

    // etats de validation
    const entrepriseOrganisationValid = ref(true);
    const nomValid = ref(true);
    const prenomValid = ref(true);
    const telephoneValid = ref(true);
    const emailValid = ref(true);

    // RegExp
    const companyNameRegex = /^[a-zA-Z0-9\s\.,'-]*$/;
    const nameRegex = /^[\p{L}\sçÇ'-]+$/u;
    const phoneFrenchNumbersRegex = /^(?!0[013]).{10}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    // fonctions de validation pour chaque champ
    const validateEntrepriseOrganisation = () => {
        entrepriseOrganisationValid.value = companyNameRegex.test(entrepriseOrganisation.value);   
    };
    const validateNom = () => {
        nomValid.value = nameRegex.test(nom.value);
    };
    const validatePrenom = () => {
        prenomValid.value = nameRegex.test(prenom.value);
    };
    const validateTelephone = () => {
        telephoneValid.value = phoneFrenchNumbersRegex.test(telephone.value);
    };
    const validateEmail = () => {
        emailValid.value = emailRegex.test(email.value);
    };

    // valide le formulaire
    const validate = async(event) => {
        event.preventDefault();

        // valide chaque champ individuellement
        validateEntrepriseOrganisation();
        validateNom();
        validatePrenom();
        validateTelephone();
        validateEmail();

        // extrait les valeurs des objets ref
        
        const entrepriseOrganisationValue = entrepriseOrganisation.value;
        const nomValue = nom.value;
        const prenomValue = prenom.value;
        const telephoneValue = telephone.value;
        const emailValue = email.value;

        // détermine les champs requis pour soumettre le formulaire
        const requiredFieldsValid = 
            entrepriseOrganisationValid.value &&
            nomValid.value &&
            prenomValid.value &&
            emailValid.value;

        // soumet le formulaire avec les champs requis
        if (requiredFieldsValid) {
            console.log('Formulaire validé');
            // soumission du formulaire
            registrationForm.value.submit();

            try {

                const { hostName } = useGlobalDataStore();
                const eventSlug = window.location.pathname.split('/').pop(); // récupère le slug de l'événement depuis l'URL

                const response = await fetch(`${hostName}/users/${eventSlug}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        entrepriseOrganisation: entrepriseOrganisationValue,
                        nom: nomValue,
                        prenom: prenomValue,
                        telephone: telephoneValue,
                        email: emailValue,
                    }),
                });

                if (response.ok) {
                    // affiche le message d'inscription réussie ici
                    const data = await response.json();
                    console.log(data.message); 
                    
                } else {
                    // affiche un message d'erreur à l'utilisateur.
                    console.error('Erreur lors de l\'inscription :', response.statusText);
                }

            } catch (error) {
                console.error('Erreur lors de l\inscription: ', error);
            }

        } else {
            console.log('Formulaire non valide');
        }

    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';
    .inscriptionForm {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .5rem;
        width: 100%;
        .input-container {
            display: flex;
            flex-direction: column;
            gap: .5rem;
            width: 100%;
            position: relative;

            label {
                font-size: 1rem;
                color: rgba($darkColor, .8);
                span {
                    color: $accentColor2;
                }
            }

            input {
                width: 100%;
                height: 3rem;
                font-size: 1rem;
                background: $lightColor;
                border: solid 1px rgba($darkColor, .25);

                &:focus {
                    border-color: $accentColor2 !important;
                    outline: none;
                }
            }
            .error-message {
                @include errorMessage;
                position: absolute;
                right: .5rem;
                bottom: .5rem;
            }
        }
        .requiredFields-info {
            font-size: .7rem;
            margin: 0;
            align-self: flex-end;

            span {
                color: $accentColor2;
            }
        }
        .inscription-button {
            @include buttonStyle;
            margin-top: 1rem;
        }
    }
    
</style>
