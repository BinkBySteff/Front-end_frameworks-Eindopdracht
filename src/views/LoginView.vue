<template>
  <ion-page>
    <ion-content class="ion-padding recare-bg">
      <div class="login-container">

        <img src="@/assets/Logo-Dashboard.png" alt="RealEstateCare logo" class="logo" />

        <div class="login-card">
          <h1>Inloggen</h1>
          <p class="intro-text">
            Log in bij RealEstateCare om de inspectie-app te openen.
          </p>

          <div class="form-group">
            <label>E-mailadres</label>
            <ion-item class="custom-input" lines="none">
              <ion-input
                v-model="email"
                type="email"
                placeholder="Voer je e-mailadres in"
              ></ion-input>
            </ion-item>
          </div>

          <div class="form-group">
            <label>Wachtwoord</label>
            <ion-item class="custom-input" lines="none">
              <ion-input
                v-model="password"
                type="password"
                placeholder="Voer je wachtwoord in"
              ></ion-input>
            </ion-item>
          </div>

          <p v-if="errorMessage" class="error">
            {{ errorMessage }}
          </p>

          <ion-button
            expand="block"
            class="login-button"
            :disabled="!email || !password || loading"
            @click="handleLogin"
          >
            <ion-spinner v-if="loading" name="crescent"></ion-spinner>
            <span v-else>Inloggen</span>
          </ion-button>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonSpinner
} from '@ionic/vue'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const router = useRouter()

function handleLogin() {

  loading.value = true
  errorMessage.value = ''

  setTimeout(() => {

    if (
      email.value === 'inspecteur@recare.nl' &&
      password.value === 'inspectie'
    ) {
      router.push('/verify')
    } else {
      errorMessage.value = 'Onjuist e-mailadres of wachtwoord'
    }

    loading.value = false

  }, 1000)
}
</script>

<style scoped>

ion-content.recare-bg {
  --background: transparent;

  background-image:
    url('@/assets/Achtergrondafbeeldingboven.png'),
    url('@/assets/Achtergrondafbeeldingonder.png');

  background-repeat: no-repeat, no-repeat;
  background-position: top center, bottom center;
  background-size: 100% auto, 100% auto;
}

.login-container {
  max-width: 420px;
  margin: 40px auto 80px;
}

.logo {
  display: block;
  max-width: 180px;
  margin: 0 auto 28px;
}

.login-card {
  background: rgba(255,255,255,0.96);
  border-radius: 24px;
  padding: 28px 22px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.intro-text {
  margin-bottom: 24px;
  color: #3c4856;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.custom-input {
  --background: #f5f7f8;
  --border-radius: 14px;
  --padding-start: 14px;
  --inner-padding-end: 14px;
  --min-height: 56px;

  border: 1px solid #d9e0e6;
  border-radius: 14px;
}

.login-button {
  margin-top: 10px;
  --background: #18b3b0;
  --background-hover: #149c99;
  --border-radius: 14px;
  height: 52px;
  font-size: 1rem;
  letter-spacing: 0.04em;
}

.error {
  color: #d93025;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

</style>