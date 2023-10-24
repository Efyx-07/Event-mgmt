<template>

    <form class="adminRegisterForm" @submit.prevent="validateAdminRegistration">

        <div class="inputs_wrapper">

            <div class="field_container">
                <label for="nouvel_admin_nom">Nom du nouvel administrateur</label>
                <div class="input_container">
                    <input type="text" name="lastName" required id="newAdminLastName" v-model="lastName" @input="validateLastName">
                    <Icon v-if="lastNameValid && lastName !== ''" icon="ooui:success" class="validateIcon"/>
                </div>
                <p v-if="!lastNameValid && lastName !== ''" class="error-message">Merci d'entrer un nom valide</p>
            </div>

            <div class="field_container">
                <label for="nouvel_admin_prenom">Prénom du nouvel administrateur</label>
                <div class="input_container">
                    <input type="text" name="firstName" required id="newAdminFirstName" v-model="firstName" @input="validateFirstName">
                    <Icon v-if="firstNameValid && firstName !== ''" icon="ooui:success" class="validateIcon"/>
                </div>
                <p v-if="!firstNameValid && firstName !== ''" class="error-message">Merci d'entrer un prénom valide</p>
            </div>

            <div class="field_container">
                <label for="nouvel_admin_email">Adresse mail du nouvel administrateur</label>
                <div class="input_container">
                    <input type="email" name="email" required id="newAdminMailAddress" v-model="email" @input="validateEmail">
                    <Icon v-if="emailValid && email !== ''" icon="ooui:success" class="validateIcon"/>
                </div>
                <p v-if="!emailValid && email !== ''" class="error-message">Merci d'entrer un email valide, par exemple utilsateur@mail.com</p>
            </div>

            <div class="field_container">
                <div class="label_container">
                    <label for="nouvel_admin_mot_de_passe">Mot de passe du nouvel administrateur</label>
                    <p class="newPassword-instruction">
                        (doit contenir au moins 8 caractères dont: 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial)
                    </p>
                </div>
                <div class="input_container">
                    <input type="password" name="password" required id="newAdminPassword" v-model="password" @input="validatePassword">
                    <Icon v-if="passwordValid && password !== ''" icon="ooui:success" class="validateIcon"/>
                </div>
                <p v-if="!passwordValid && password !== ''" class="error-message">Merci d'entrer un mot de passe conforme</p>
            </div>

            <div class="field_container">
                <label for="confirmer_nouvel_admin_mot_de_passe">Confirmez le mot de passe du nouvel administrateur</label>
                <div class="input_container">
                    <input type="password" name="confirmPassword" required id="confirmNewAdminPassword" v-model="confirmPassword" @input="validateConfirmPassword">
                    <Icon v-if="confirmPasswordValid && confirmPassword !== ''" icon="ooui:success" class="validateIcon"/>
                </div>
                <p v-if="!confirmPasswordValid && confirmPassword !== ''" class="error-message">N'est pas identique à votre mot de passe</p>
            </div>

        </div>

        <div class="registration-result_message" v-if="successMessage">
            <div class="text_container">
                <Icon icon="ooui:success" class="successIcon"/>
                <p>Nouvel administrateur inscrit avec succés !</p>
            </div>
            <button @click="resetForm" class="okBtn">
                <p>OK</p>
            </button>
        </div>
        <div class="registration-result_message" v-else-if="emailAlreadyExistsMessage">
            <div class="text_container">
                <Icon icon="mdi:alert-outline" class="alertIcon"/>
                <p>Un administrateur existe déjà avec cet email !</p>
            </div>
            <button @click="resetForm" class="okBtn">
                <p>Compris</p>
            </button>
        </div>

        <button class="addNewAdmin-button" type="submit" v-else>
            <p>Ajouter</p>
        </button>

    </form>

</template>

<script setup>

    import { ref } from 'vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import { Icon } from '@iconify/vue';
    import { useAdminStore } from '@/stores/AdminStore';

    // visibilité par défaut des messages de succés ou d'erreur
    const successMessage = ref(false);
    const emailAlreadyExistsMessage = ref(false);

    // propriétés du formulaire
    const lastName = ref('');
    const firstName = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    // états de validation
    const lastNameValid = ref(true);
    const firstNameValid = ref(true);
    const emailValid = ref (true);
    const passwordValid = ref (true);
    const confirmPasswordValid = ref (true);

    // Regex
    const nameTypeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/;
    const emailRegex = /^[a-z0-9.-]+@[a-z0-9._-]{2,}\.[a-z]{2,8}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*]).{8,}$/;

    // fonctions de validation pour chaque champ
    const validateLastName = () => {
        lastNameValid.value = nameTypeRegex.test(lastName.value);
    };
    const validateFirstName = () => {
        firstNameValid.value = nameTypeRegex.test(firstName.value);
    };
    const validateEmail = () => {
        emailValid.value = emailRegex.test(email.value);
    };
    const validatePassword = () => {
        passwordValid.value = passwordRegex.test(password.value);
    };
    const validateConfirmPassword = () => {
        confirmPasswordValid.value = password.value === confirmPassword.value;
    };

    // valide le formulaire
    const validateAdminRegistration = async () => {

        // valide chaque champ individuellement
        validateLastName(); 
        validateFirstName();
        validateEmail();
        validatePassword();
        validateConfirmPassword();

        // extrait les valeurs des objets ref
        const lastNameValue = lastName.value;
        const firstNameValue = firstName.value;
        const emailValue = email.value;
        const passwordValue = password.value;

        // détermine les champs requis pour soumettre le formulaire
        const requiredFieldsValid = 
            lastNameValid.value &&
            firstNameValid.value &&
            emailValid.value &&
            passwordValid.value &&
            confirmPasswordValid.value;

        // soumet le formulaire avec les champs requis
        if (requiredFieldsValid) {

            try {

                const { hostName } = useGlobalDataStore();

                const response = await fetch (`${hostName}/admins/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        lastName: lastNameValue,
                        firstName: firstNameValue,
                        email: emailValue,
                        password: passwordValue,
                    }),
                });

                if (response.ok) {

                    // inscription réussie 
                    const data = await response.json();
                    console.log('Réponse complète du serveur :', data);
                    console.log(data.message);

                    // met à jour la liste des administrateurs
                    const adminStore = useAdminStore();
                    adminStore.addToAdmins(data.admin);

                    console.log('les donnees nouvel admin sont: ', data.admin)

                    successMessage.value = true;
                
                } else if (response.status === 409) {
                    // administrateur existe déjà avec un même email
                    console.error('Cet administrateur existe déjà.');
                    emailAlreadyExistsMessage.value = true

                } else {
                    // affiche un message d'erreur à l'utilisateur.
                    console.error('Erreur lors de l\'inscription du nouvel administrateur: ', response.statusText);
                }

            } catch (error) {
                console.error('Erreur lors de l\'inscription du nouvel administrateur: ', error);
            }
        } else {
            // Affiche un message d'erreur à l'utilisateur si le formulaire n'est pas valide
            console.error('Veuillez corriger les erreurs dans le formulaire.');
        }
    };

    // fonction qui efface les messages succès ou alerte et réinitialise tous les champs
    const resetForm = () => {
        successMessage.value = false;
        emailAlreadyExistsMessage.value = false;
        lastName.value = '';
        firstName.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';
        lastNameValid.value = true;
        firstNameValid.value = true;
        emailValid.value = true;
        passwordValid.value = true;
        confirmPasswordValid.value = true;
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .adminRegisterForm {
        width: 33,33%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        .inputs_wrapper {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            .field_container {
                display: flex;
                flex-direction: column;
                gap: .5rem;
                position: relative;

                label {
                    margin: 0;
                    font-weight: 700;
                }
                .input_container {
                    position: relative;

                    input {
                        width: 100%;
                        height: 3rem;
                        border: solid 1px rgba($accentColorBackof3, .25);
                        font-size: 1rem;
                        outline: none;

                        &:focus {
                            background: transparent;
                            border: solid 1px $accentColorBackof2;
                        }
                    }
                    .validateIcon {
                        position: absolute;
                        right: 1rem;
                        top: 50%;
                        transform: translateY(-50%);
                        color: $validColor;
                        font-size: .8rem;
                    }
                }
                .error-message {
                    margin: 0;
                    color: $errorColor;
                    font-size: .7rem;
                    text-align: end;
                }
                .label_container {
                    display: flex;
                    flex-direction: column;
                    .newPassword-instruction {
                        margin: 0;
                        font-size: .7rem;
                        font-weight: 400;
                    }
                }
            }
        }
        .addNewAdmin-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 8rem;
            height: 2rem;
            border: none;
            background: $darkColorBackOf;
            color: $lightColor;
            align-self: end;
            cursor: pointer;

            &:hover {
                background: $accentColorBackof2;
            }

            p {
                margin: 0;
                font-weight: 700;
            }
        }
        .registration-result_message {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .text_container {
                display: flex;
                align-items: center;
                gap: 1rem;

                p {
                margin: 0;
                }
                .succesIcon, .alertIcon {
                    font-size: 1.3rem;
                }
                .successIcon {
                    color: $validColor;
                }
                .alertIcon {
                    color: $errorColor;
                }
            }
            .okBtn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 6rem;
                height: 1.5rem;
                border: none;
                background: $darkColorBackOf;
                color: $lightColor;
                justify-self: end;
                cursor: pointer;

                &:hover {
                    background: $accentColorBackof2;
                }

                p {
                    margin: 0;
                }
            }
        }
    }
    
</style>