<template>

    <form class="adminLogin-form" @submit.prevent="handleAdminLogin">
        <div class="inputs_wrapper">
            <div class="input_container">
                <label for="identifiant">Identifiant</label>
                <input type="text" name="adminId" id="adminLogin_id" v-model="adminId">
            </div>
            <div class="input_container">
                <label for="mot_de_passe">Mot de passe</label>
                <input type="password" name="adminPassword" id="adminLogin_password" v-model="adminPassword">
            </div>
        </div>
        <div class="error-message" v-if="error">Email or password are incorrect</div>
        <button class="adminLogin-button" type="submit">
            <p>Se connecter</p>
        </button>
    </form>
    
</template>

<script setup>

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';

    .adminLogin-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        width: 25rem;
        padding: 2rem;
        border: 1px solid $accentColorBackof3;
        border-radius: $containerRadius;
        .inputs_wrapper {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            width: 100%;
        }

        .input_container {
            display: flex;
            flex-direction: column;
            gap: .25rem;
            width: 100%;

            label {
                font-size: 1rem;
                color: $lightColor;
                font-weight: 200;
            }

            input {
                height: 3rem;
                outline: none;
                background: transparent;
                border: solid 1px $accentColorBackof3;
                font-size: 1rem;
                color: $lightColor;

                &:focus {
                    border: solid 1px $accentColorBackof2;
                }
            }
        }
        .error-message {
            @include errorMessage;
        }
        .adminLogin-button {
            margin-top: 1rem;
            padding: .5rem 1rem;
            background: $darkColorBackOf;
            border: solid 1px $accentColorBackof3;
            align-self: self-end;
            cursor: pointer;

            &:hover {
                border-color: $accentColorBackof2;
                background: $accentColorBackof2;
            }

            p {
                margin: 0;
                color: $lightColor;
                font-weight: 200;
                font-size: 1rem;
            }
        }
    }
    
</style>
