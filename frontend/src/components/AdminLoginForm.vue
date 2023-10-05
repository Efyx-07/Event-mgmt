<template>

    <form class="adminLogin-form" @submit.prevent="handleAdminLogin">
        <div class="inputs_wrapper">
            <div class="input_container">
                <label>Identifiant</label>
                <input type="text" name="adminId" id="adminLogin_id" v-model="adminId">
            </div>
            <div class="input_container">
                <label>Mot de passe</label>
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
        background: $lightColor;
        border-radius: $containerRadius;
        width: 25rem;
        padding: 2rem;

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
            }

            input {
                height: 3rem;
                background: $lightColor;
                border: solid 1px rgba($darkColor, .25);
                font-size: 1rem;
            }
        }
        .error-message {
            @include errorMessage;
        }
        .adminLogin-button {
            margin-top: 1rem;
            padding: .5rem 1rem;
            background: $darkColorBackOf;
            border: none;
            align-self: self-end;
            cursor: pointer;

            &:hover {
                background: rgba($darkColorBackOf, .8);
            }

            p {
                margin: 0;
                color: $lightColor;
                font-weight: 600;
                font-size: .9rem;
            }
        }
    }
    
</style>
