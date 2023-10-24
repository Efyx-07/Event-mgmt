<template>

    <form class="adminUpdatePasswordForm" @submit.prevent="validateAdminPasswordUpdating">

        <div class="inputs_wrapper">

            <div class="input_container">
                <label for="mot_de_passe_actuel">Votre mot de passe actuel</label>
                <input type="password" name="adminCurrentPassword" id="adminCurrentPassword" v-model="adminCurrentPassword">
            </div>

            <div class="input_container">
                <div class="label_container">
                    <label for="nouveau_mot_de_passe">Votre nouveau mot de passe</label>
                    <p class="newPassword-instruction">
                        (doit contenir au moins 8 caractères dont: 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial)
                    </p>
                </div>
                <input type="password" name="adminNewPassword" id="adminNewPassword" v-model="adminNewPassword" @input="validateAdminNewPassword">
            </div>

            <div class="input_container">
                <label for="confirmer_nouveau_mot_de_passe">Confirmez votre nouveau mot de passe</label>
                <input type="password" name="confirmAdminNewPassword" id="confirmAdminNewPassword" v-model="confirmAdminNewPassword" @input="validateConfirmAdminNewPassword">
            </div>

        </div>
    
        <button class="adminUpdatePasswordForm-button" type="submit">
            <p>Modifier</p>
        </button>

    </form>

</template>

<script setup>

    import { ref } from 'vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';

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

                const response = await fetch (`${hostName}/admins/update`, {
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

                } else {
                    // affiche un message d'erreur à l'utilisateur
                    console.error('Erreur lors de la modification du mot de passe', response.statusText)
                }
            } catch (error) {
                console.error('Erreur lors de la modification du mot de passe: ', error);
            }
        }
    }

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .adminUpdatePasswordForm {
        width: 33,33%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        .inputs_wrapper {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            .input_container {
                display: flex;
                flex-direction: column;
                gap: .5rem;

                label {
                    margin: 0;
                    font-weight: 700;
                }

                input {
                    height: 3rem;
                    border: solid 1px rgba($accentColorBackof3, .25);
                    font-size: 1rem;
                    outline: none;

                    &:focus {
                        border: solid 1px $accentColorBackof2;
                    }
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
        
    }
    
</style>
