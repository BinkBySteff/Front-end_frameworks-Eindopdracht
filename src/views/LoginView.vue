<template>
  <ion-page>
    <ion-content class="recare-bg">
      <div class="login-container">

        <!-- Logo -->
        <div class="logo-wrapper">
          <img src="@/assets/Logo-Dashboard.png" alt="RealEstateCare logo" class="logo" />
          <h1 class="app-name">RealEstateCare</h1>
          <p class="app-sub">Inspectie-applicatie voor professionals</p>
        </div>

        <!-- Loginkaart -->
        <div class="login-card">
          <h2 class="card-title">Inloggen</h2>
          <p class="intro-text">Voer uw gegevens in om toegang te krijgen tot de inspectieomgeving.</p>

          <!-- E-mail -->
          <div class="form-group">
            <label class="form-label">
              <ion-icon :icon="mailOutline" class="label-icon" />
              E-mailadres
            </label>
            <ion-item class="custom-input" lines="none">
              <ion-input
                v-model="email"
                type="email"
                placeholder="LOI-inspecteur@recare.nl"
                :clear-input="true"
              />
            </ion-item>
          </div>

          <!-- Wachtwoord -->
          <div class="form-group">
            <label class="form-label">
              <ion-icon :icon="lockClosedOutline" class="label-icon" />
              Wachtwoord
            </label>
            <ion-item class="custom-input" lines="none">
              <ion-input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
              />
              <ion-button fill="clear" slot="end" @click="showPassword = !showPassword" class="eye-btn">
                <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline" />
              </ion-button>
            </ion-item>
          </div>

          <!-- Foutmelding -->
          <div v-if="errorMessage" class="error-box">
            <ion-icon :icon="alertCircleOutline" class="error-icon" />
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Inlogknop -->
          <ion-button
            expand="block"
            class="login-button"
            :disabled="!email || !password || loading"
            @click="handleLogin"
          >
            <ion-spinner v-if="loading" name="crescent" />
            <span v-else>Inloggen</span>
          </ion-button>

          <!-- Demo-hint -->
          <div class="demo-hint">
            <ion-icon :icon="informationCircleOutline" class="hint-icon" />
            <p>
              Demo: <strong>LOI-inspecteur@recare.nl</strong> / <strong>inspectie</strong>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <p class="footer-text">© 2026 RealEstateCare · Alle rechten voorbehouden</p>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage, IonContent, IonItem, IonInput,
  IonButton, IonSpinner, IonIcon,
} from '@ionic/vue'
import {
  mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline,
  alertCircleOutline, informationCircleOutline,
} from 'ionicons/icons'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

const router = useRouter()

function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  setTimeout(() => {
    if (
      email.value === 'LOI-inspecteur@recare.nl' &&
      password.value === 'inspectie'
    ) {
      router.push('/verify')
    } else {
      errorMessage.value = 'Onjuist e-mailadres of wachtwoord. Probeer het opnieuw.'
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
  margin: 0 auto;
  padding: 48px 20px 40px 20px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Logo sectie */
.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}

.logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 12px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

.app-name {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 700;
  color: rgb(20, 27, 31);
  letter-spacing: -0.3px;
}

.app-sub {
  margin: 0;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.55);
}

/* Loginkaart */
.login-card {
  background: rgba(255, 255, 255, 0.97);
  border-radius: 24px;
  padding: 28px 22px;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.10),
    0 4px 16px rgba(0, 0, 0, 0.06);
}

.card-title {
  margin: 0 0 6px 0;
  font-size: 20px;
  font-weight: 700;
  color: rgb(20, 27, 31);
}

.intro-text {
  margin: 0 0 22px 0;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.6);
  line-height: 1.5;
}

/* Formulier */
.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: rgb(20, 27, 31);
  margin-bottom: 8px;
}

.label-icon {
  font-size: 15px;
  color: rgb(0, 170, 162);
}

.custom-input {
  --background: #f4f7f9;
  --border-radius: 12px;
  --padding-start: 14px;
  --inner-padding-end: 8px;
  --min-height: 52px;
  border: 1.5px solid #dde3e8;
  border-radius: 12px;
  transition: border-color 150ms ease;
}

.custom-input:focus-within {
  border-color: rgb(0, 170, 162);
}

.eye-btn {
  --color: rgba(20, 27, 31, 0.45);
  margin: 0;
}

/* Foutmelding */
.error-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fdf0ef;
  border: 1px solid #f5c6c3;
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 14px;
  font-size: 13px;
  color: #c0392b;
}

.error-icon {
  font-size: 16px;
  flex-shrink: 0;
}

/* Inlogknop */
.login-button {
  --background: rgb(0, 170, 162);
  --background-activated: rgb(0, 150, 143);
  --border-radius: 12px;
  height: 52px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin-top: 4px;
}

/* Demo hint */
.demo-hint {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 16px;
  background: rgba(0, 170, 162, 0.08);
  border-radius: 10px;
  padding: 10px 12px;
}

.hint-icon {
  font-size: 16px;
  color: rgb(0, 170, 162);
  flex-shrink: 0;
  margin-top: 1px;
}

.demo-hint p {
  margin: 0;
  font-size: 12px;
  color: rgba(20, 27, 31, 0.65);
  line-height: 1.5;
}

.demo-hint strong {
  color: rgb(20, 27, 31);
}

/* Footer */
.footer-text {
  margin: 24px 0 0 0;
  text-align: center;
  font-size: 11px;
  color: rgba(20, 27, 31, 0.4);
}
</style>