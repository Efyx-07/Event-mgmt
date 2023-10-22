<template>

    <form class="adminUpdatePasswordForm">

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
                <input type="password" name="adminNewPassword" id="adminNewPassword" v-model="adminNewPassword">
            </div>

            <div class="input_container">
                <label for="confirmer_nouveau_mot_de_passe">Confirmez votre nouveau mot de passe</label>
                <input type="password" name="adminConfirmNewPassword" id="adminConfirmNewPassword" v-model="adminConfirmNewPassword">
            </div>

        </div>
    
        <button class="adminUpdatePasswordForm-button" type="submit">
            <p>Modifier</p>
        </button>

    </form>

</template>

<script setup>

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
