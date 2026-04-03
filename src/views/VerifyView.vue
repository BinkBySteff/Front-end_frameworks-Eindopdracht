<template>
  <ion-page>
    <ion-content class="recare-bg">
      <div class="verify-container">

        <!-- Logo -->
        <div class="logo-wrapper">
          <img src="@/assets/Logo-Dashboard.png" alt="RealEstateCare logo" class="logo" />
        </div>

        <!-- Kaart -->
        <div class="verify-card">

          <div class="shield-wrapper">
            <ion-icon :icon="shieldCheckmarkOutline" class="shield-icon" />
          </div>

          <h2 class="card-title">Twee-factor verificatie</h2>
          <p class="card-sub">
            Er is een 6-cijferige code verstuurd naar<br />
            <strong>inspecteur@recare.nl</strong>
          </p>

          <!-- 6 losse invoervakken -->
          <div class="code-inputs">
            <input
              v-for="(_, i) in 6"
              :key="i"
              :ref="el => { if (el) inputRefs[i] = el as HTMLInputElement }"
              v-model="digits[i]"
              type="text"
              inputmode="numeric"
              maxlength="1"
              class="code-box"
              :class="{ filled: digits[i] }"
              @input="onInput(i)"
              @keydown="onKeydown($event, i)"
              @paste="onPaste"
            />
          </div>

          <!-- Foutmelding -->
          <div v-if="errorMessage" class="error-box">
            <ion-icon :icon="alertCircleOutline" class="error-icon" />
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Bevestigen knop -->
          <ion-button
            expand="block"
            class="verify-button"
            :disabled="fullCode.length < 6 || loading"
            @click="handleVerify"
          >
            <ion-spinner v-if="loading" name="crescent" />
            <span v-else>Bevestigen</span>
          </ion-button>

          <!-- Opnieuw verzenden -->
          <p class="resend-text">
            Code niet ontvangen?
            <span class="resend-link" @click="showResendToast">Opnieuw verzenden</span>
          </p>

          <!-- Demo hint -->
          <div class="demo-hint">
            <ion-icon :icon="informationCircleOutline" class="hint-icon" />
            <p>Demo: voer willekeurig <strong>6 cijfers</strong> in</p>
          </div>

        </div>

        <!-- Terug naar login -->
        <p class="back-link" @click="router.replace('/login')">
          ← Terug naar inloggen
        </p>

      </div>
    </ion-content>

    <!-- Toast -->
    <ion-toast
      :is-open="toastOpen"
      message="Verificatiecode opnieuw verzonden"
      :duration="2500"
      position="bottom"
      @did-dismiss="toastOpen = false"
    />
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage, IonContent, IonButton, IonSpinner, IonIcon, IonToast,
} from '@ionic/vue'
import {
  shieldCheckmarkOutline, alertCircleOutline, informationCircleOutline,
} from 'ionicons/icons'

const router = useRouter()

const digits = ref<string[]>(['', '', '', '', '', ''])
const inputRefs = ref<HTMLInputElement[]>([])
const loading = ref(false)
const errorMessage = ref('')
const toastOpen = ref(false)

const fullCode = computed(() => digits.value.join(''))

function onInput(index: number) {
  const val = digits.value[index]
  // Alleen cijfers toestaan
  if (!/^\d$/.test(val ?? '')) {
    digits.value[index] = ''
    return
  }
  // Automatisch naar volgend vak
  if (index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

function onKeydown(event: KeyboardEvent, index: number) {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}

function onPaste(event: ClipboardEvent) {
  const pasted = event.clipboardData?.getData('text') ?? ''
  const nums = pasted.replace(/\D/g, '').slice(0, 6).split('')
  nums.forEach((n, i) => {
    digits.value[i] = n
  })
  inputRefs.value[Math.min(nums.length, 5)]?.focus()
  event.preventDefault()
}

function handleVerify() {
  if (fullCode.value.length < 6) return
  loading.value = true
  errorMessage.value = ''

  setTimeout(() => {
    loading.value = false
    router.push('/tabs/dashboard')
  }, 1000)
}

function showResendToast() {
  toastOpen.value = true
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

.verify-container {
  max-width: 420px;
  margin: 0 auto;
  padding: 48px 20px 40px 20px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}

.logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.12));
}

/* Kaart */
.verify-card {
  background: rgba(255, 255, 255, 0.97);
  border-radius: 24px;
  padding: 28px 22px;
  box-shadow:
    0 20px 50px rgba(0,0,0,0.10),
    0 4px 16px rgba(0,0,0,0.06);
  text-align: center;
}

.shield-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 14px;
}

.shield-icon {
  font-size: 48px;
  color: rgb(0, 170, 162);
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 700;
  color: rgb(20, 27, 31);
}

.card-sub {
  margin: 0 0 24px 0;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.6);
  line-height: 1.6;
}

/* 6 invoervakken */
.code-inputs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.code-box {
  width: 46px;
  height: 56px;
  border: 2px solid #dde3e8;
  border-radius: 12px;
  background: #f4f7f9;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  color: rgb(20, 27, 31);
  outline: none;
  transition: border-color 150ms ease, background 150ms ease;
  caret-color: rgb(0, 170, 162);
}

.code-box:focus {
  border-color: rgb(0, 170, 162);
  background: #ffffff;
}

.code-box.filled {
  border-color: rgb(0, 170, 162);
  background: rgba(0, 170, 162, 0.05);
}

/* Foutmelding */
.error-box {
  display: flex;
  align-items: center;
  justify-content: center;
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

/* Knop */
.verify-button {
  --background: rgb(0, 170, 162);
  --background-activated: rgb(0, 150, 143);
  --border-radius: 12px;
  height: 52px;
  font-size: 15px;
  font-weight: 600;
}

/* Opnieuw verzenden */
.resend-text {
  margin: 14px 0 0 0;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.55);
}

.resend-link {
  color: rgb(0, 170, 162);
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}

/* Demo hint */
.demo-hint {
  display: flex;
  align-items: center;
  justify-content: center;
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
}

.demo-hint p {
  margin: 0;
  font-size: 12px;
  color: rgba(20, 27, 31, 0.65);
}

.demo-hint strong {
  color: rgb(20, 27, 31);
}

/* Terug link */
.back-link {
  margin: 20px 0 0 0;
  text-align: center;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.5);
  cursor: pointer;
}

.back-link:hover {
  color: rgb(0, 170, 162);
}
</style>