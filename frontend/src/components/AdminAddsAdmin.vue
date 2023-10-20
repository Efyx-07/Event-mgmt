<template>
    <form class="adminAddsAdmin-form">

        <div class="inputs_wrapper">

            <div class="input_container">
                <label for="mot_de_passe_actuel">Votre mot de passe actuel</label>
                <input type="password" name="adminAddsAdminCurrentPassword" id="adminAddsAdminCurrentPassword" v-model="adminAddsAdminCurrentPassword">
            </div>

            <div class="input_container">
                <label for="nouvel_admin_nom">Nom du nouvel administrateur</label>
                <input type="text" name="newAdminFirstName" id="newAdminFirstName" v-model="newAdminFirstName">
            </div>

            <div class="input_container">
                <label for="nouvel_admin_prenom">Prénom du nouvel administrateur</label>
                <input type="text" name="newAdminLastName" id="newAdminLastName" v-model="newAdminLastName">
            </div>

            <div class="input_container">
                <label for="nouvel_admin_email">Adresse mail du nouvel administrateur</label>
                <input type="email" name="newAdminMailAddress" id="newAdminMailAddress" v-model="newAdminMailAddress">
            </div>

            <div class="input_container">
                <div class="label_container">
                    <label for="nouvel_admin_mot_de_passe">Mot de passe du nouvel administrateur</label>
                    <p class="newPassword-instruction">
                        (doit contenir au moins 8 caractères dont: 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial)
                    </p>
                </div>
                <input type="password" name="newAdminPassword" id="newAdminPassword" v-model="newAdminPassword">
            </div>

            <div class="input_container">
                <label for="confirmer_nouvel_admin_mot_de_passe">Confirmez le mot de passe du nouvel administrateur</label>
                <input type="password" name="confirmNewAdminPassword" id="confirmNewAdminPassword" v-model="confirmNewAdminPassword">
            </div>

        </div>

        <button class="addNewAdmin-button" type="submit">
            <p>Ajouter</p>
        </button>

    </form>
</template>

<script setup>

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .adminAddsAdmin-form {
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
    }
    
</style>