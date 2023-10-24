<template>

    <form class="adminUpdatePasswordForm" @submit.prevent="validateAdminPasswordUpdating">

        <div class="fields_wrapper">

            <div class="field_container">
                <label for="mot_de_passe_actuel">Votre mot de passe actuel</label>
                <input type="password" name="adminCurrentPassword" id="adminCurrentPassword" v-model="adminCurrentPassword">
            </div>

            <div class="field_container">
                <div class="label_container">
                    <label for="nouveau_mot_de_passe">Votre nouveau mot de passe</label>
                    <p class="newPassword-instruction">
                        (doit contenir au moins 8 caractères dont: 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial)
                    </p>
                </div>
                <div class="input_container">
                    <input type="password" name="adminNewPassword" id="adminNewPassword" v-model="adminNewPassword" @input="validateAdminNewPassword">
                    <Icon v-if="adminNewPasswordValid && adminNewPassword !== ''"  icon="ooui:success" class="validateIcon"/>
                </div>
                <p v-if="!adminNewPasswordValid && adminNewPassword !== ''" class="error-message">Merci d'entrer un nouveau mot de passe conforme</p>
            </div>

            <div class="field_container">
                <label for="confirmer_nouveau_mot_de_passe">Confirmez votre nouveau mot de passe</label>
                <div class="input_container">
                    <input type="password" name="confirmAdminNewPassword" id="confirmAdminNewPassword" v-model="confirmAdminNewPassword" @input="validateConfirmAdminNewPassword">
                    <Icon v-if="confirmAdminNewPasswordValid && confirmAdminNewPassword !== ''"  icon="ooui:success" class="validateIcon"/>
                </div>
                <p v-if="!confirmAdminNewPasswordValid && confirmAdminNewPassword !== ''" class="error-message">N'est pas identique à votre nouveau mot de passe</p>
            </div>

        </div>

        <div class="registration-result_message" v-if="successMessage">
            <div class="text_container">
                <Icon icon="ooui:success" class="successIcon"/>
                <p>Mot de passe modifié avec succés !</p>
            </div>
            <button @click="disconnectToReconnect" class="okBtn">
                <p>Connexion</p>
            </button>
        </div>
        <div class="registration-result_message" v-else-if="updateErrorMessage">
            <div class="text_container">
                <Icon icon="mdi:alert-outline" class="alertIcon"/>
                <p>Erreur lors de la mise à jour du mot de passe !</p>
            </div>
            <button @click="resetForm" class="okBtn">
                <p>Compris</p>
            </button>
        </div>
    
        <button class="adminUpdatePasswordForm-button" type="submit" v-else>
            <p>Modifier</p>
        </button>

    </form>

</template>

<script setup>

    import { ref } from 'vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import { Icon } from '@iconify/vue';
    import { useAdminStore } from '@/stores/AdminStore';
    import { useRouter } from 'vue-router';

    // visibilité par défaut des messages de succés ou d'erreur
    const successMessage = ref(false);
    const updateErrorMessage = ref(false)

    // propriétés du formulaire
    const adminCurrentPassword = ref('');
    const adminNewPassword = ref('');
    const confirmAdminNewPassword = ref('');

    // états de validation
    const adminNewPasswordValid = ref(true);
    const confirmAdminNewPasswordValid = ref(true);

    // Regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*]).{8,}$/;

    // fonctions de validation des champs
    const validateAdminNewPassword = () => {
        adminNewPasswordValid.value = passwordRegex.test(adminNewPassword.value);
        console.log('Validation du nouveau mot de passe :', adminNewPasswordValid.value);
    };
    const validateConfirmAdminNewPassword = () => {
        confirmAdminNewPasswordValid.value = adminNewPassword.value === confirmAdminNewPassword.value;
        console.log('Validation de la confirmation du nouveau mot de passe :', confirmAdminNewPasswordValid.value);
    };

    // valide le formulaire
    const validateAdminPasswordUpdating = async () => {
        console.log('Soumission du formulaire');

        // valide les champs individuels
        validateAdminNewPassword();
        validateConfirmAdminNewPassword();

        // extrait les valeurs des objets ref
        const adminCurrentPasswordValue = adminCurrentPassword.value;
        const adminNewPasswordValue = adminNewPassword.value;

        // détermine les chapms requis pour soumettre le formulaire
        const requiredFieldsValid = 
            adminNewPasswordValid.value &&
            confirmAdminNewPasswordValid.value;

        // soumet le formulaire avec les champs requis
        if(requiredFieldsValid) {

            try {

                // obtient le token du localStorage
                const token = localStorage.getItem('token'); 

                if(!token) {
                    console.error('Token introuvable dans le localStorage');
                    return;
                }

                // décode le token pour obtenir adminId
                const tokenParts = token.split('.');
                // décode la partie payload
                const tokenPayload = JSON.parse(atob(tokenParts[1]));
                // extrait adminId du payload
                const adminIdValue = tokenPayload.adminId;

                const { hostName } = useGlobalDataStore();

                const response = await fetch (`${hostName}/admins/updatePassword`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // utilise le token dans l'en-tête de la requête
                    },
                    body: JSON.stringify({
                        adminId: adminIdValue,
                        adminCurrentPassword: adminCurrentPasswordValue,
                        adminNewPassword: adminNewPasswordValue,

                    }),
                });

                if (response.ok) {

                    // mise à jour du mot de passe réussie
                    const data = await response.json();
                    console.log(data.message);

                    successMessage.value = true;

                } else {
                    // affiche un message d'erreur à l'utilisateur
                    console.error('Erreur lors de la modification du mot de passe', response.statusText)
                    updateErrorMessage.value = true;
                }
            } catch (error) {
                console.error('Erreur lors de la modification du mot de passe: ', error);
            }
        }
    }

    // modification valdé, fonction pour deconnecter la session en cours et rediriger vers la page de connexion
    const adminStore = useAdminStore();
    const router = useRouter();

    const disconnectToReconnect = () => {

        // supprime le token du localStorage
        localStorage.removeItem('token');
        // supprime les données administrateur du localStorage
        localStorage.removeItem('adminData');
        // réinitialise le store
        adminStore.clearToken();
        // passe le statut de l'administrateur sur 'déconnecté'
        adminStore.isConnected = false;

        // redirige vers la page de connexion
        router.push('/');
    }

    // fonction qui efface le message d'erreur et réinitialise tous les champs
    const resetForm = () => {
        updateErrorMessage.value = false;
        adminCurrentPassword.value = '';
        adminNewPassword.value = '';
        confirmAdminNewPassword.value = '';
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .adminUpdatePasswordForm {
        width: 33,33%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        .fields_wrapper {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            .field_container {
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
                    font-size: 1rem;
                    outline: none;

                    &:focus {
                        border: solid 1px $accentColorBackof2;
                    }
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
        .adminUpdatePasswordForm-button {
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
