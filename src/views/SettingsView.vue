<template>
  <ion-page>
    <AppHeader title="Instellingen" />

    <ion-content class="recare-bg" fullscreen>
      <div class="settings-wrapper">
        <div class="settings-card">
          <h3 class="card-title">Meldingen</h3>

          <ion-list lines="none">
            <ion-item>
              <ion-label>Pushmeldingen</ion-label>
              <ion-toggle v-model="pushEnabled" />
            </ion-item>

            <ion-item>
              <ion-label>E-mailupdates</ion-label>
              <ion-toggle v-model="emailEnabled" />
            </ion-item>
          </ion-list>
        </div>

        <div class="settings-card">
          <h3 class="card-title">Weergave</h3>

          <ion-list lines="none">
            <ion-item>
              <ion-label>Donkere modus</ion-label>
              <ion-toggle v-model="darkMode" />
            </ion-item>

            <ion-item>
              <ion-label>Taal</ion-label>
              <ion-select v-model="language" interface="popover">
                <ion-select-option value="nl">Nederlands</ion-select-option>
                <ion-select-option value="en">English</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
        </div>

        <div class="settings-card">
          <h3 class="card-title">Account</h3>

          <ion-list lines="none">
            <ion-item button detail>
              <ion-label>Profiel</ion-label>
            </ion-item>

            <ion-item button detail @click="logout">
              <ion-label>Uitloggen</ion-label>
            </ion-item>
          </ion-list>
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
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue'
import AppHeader from '@/components/AppHeader.vue'

const router = useRouter()

const pushEnabled = ref(true)
const emailEnabled = ref(false)
const darkMode = ref(false)
const language = ref('nl')

function logout() {
  router.replace('/login')
}
</script>

<style scoped>
.settings-wrapper {
  padding: 24px 16px;
}

.settings-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow:
    0 10px 26px rgba(20, 27, 31, 0.08),
    0 2px 8px rgba(20, 27, 31, 0.06);
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: rgb(20, 27, 31);
}

ion-item {
  --background: transparent;
  --padding-start: 0px;
  --inner-padding-end: 0px;
}
</style>