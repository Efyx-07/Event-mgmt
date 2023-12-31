<template>

    <form class="adminLogin-form" @submit.prevent="handleAdminLogin">
        <div class="inputs_wrapper">
            <div class="input_container">
                <label for="email">Email</label>
                <input type="email" name="email" id="adminLogin_email" v-model="email">
            </div>
            <div class="input_container">
                <label for="mot_de_passe">Mot de passe</label>
                <input type="password" name="adminPassword" id="adminLogin_password" v-model="password">
            </div>
        </div>

        <div class="registration-result_message" v-if="wrongIds">
            <div class="text_container">
                <Icon icon="mdi:alert-outline" class="alertIcon"/>
                <p>Identifiants invalides !</p>
            </div>
        </div>

        <button class="adminLogin-button" type="submit" v-else>
            <p>Se connecter</p>
        </button>
    </form>
    
</template>

<script setup>

    import { ref } from 'vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import { useRouter } from 'vue-router';
    import { useAdminStore } from '@/stores/AdminStore';
    import { Icon } from '@iconify/vue';

    const router = useRouter();
    const adminStore = useAdminStore();

    // visibilité par défaut du message d'erreur
    const wrongIds = ref(false)

    // propriétés du formulaire
    const email = ref('');
    const password = ref('');

    // valide le formulaire
    const handleAdminLogin = async () => {

        // extrait les valeurs des objets ref
        const emailValue = email.value;
        const passwordValue = password.value;

        try {

            const { hostName } = useGlobalDataStore();

            const response = await fetch(`${hostName}/admins/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue,
                }),
            });

            if (response.ok) {

                // connexion réussie, redirection vers page d'accueil du back-office
                router.push('/admin_homepage');

                // récupère les données de l'administrateur depuis la réponse du serveur et affiche le message de connexion réussie
                const data = await response.json();
                console.log(data.message);
                adminStore.setAdminData(data.admin);

                // si connexion réussie, obtient le token du serveur et le stocke dans le localStorage 
                const token = data.token;
                localStorage.setItem('token', token);

                // stocke également le token dans AdminStore
                adminStore.setToken(token);
                adminStore.isConnected = true; // passe le statut de l'administrateur sur 'connecté'
                
            } else {

                // affiche une erreur et empêche la redirection
                console.error('Erreur lors de la connexion: ', response.statusText);
                wrongIds.value = true;
                // Réinitialise wrongIds après 3 secondes
                setTimeout(() => {
                    wrongIds.value = false;
                    resetForm();
                }, 3000);

            }

        } catch (error) {
            // affiche une erreur en cas d'echec de la requete
            console.error('Erreur lors de la connexion: ', error);
        }
    };

    // réinitialise le formulaire
    const resetForm = () => {
        email.value = '';
        password.value = '';
    }

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/varMediaQueries.scss';
    @import '@/assets/sass/mixins.scss';

    .adminLogin-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        width: 90vw;
        padding: 1rem;
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

        .registration-result_message {
            margin-top: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: $errorColor;
            .text_container {
                display: flex;
                align-items: center;
                gap: 1rem;

                p {
                margin: 0;
                }
                .alertIcon {
                    font-size: 1.3rem;
                }
            }
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .adminLogin-form {
            width: 25rem;
            padding: 2rem;
        }
    }
    
</style>
