<template>
  <ion-page>
    <AppHeader title="Instellingen" />

    <ion-content class="recare-bg">
      <div class="settings-wrapper">

        <!-- Profiel kaart -->
        <div class="profile-card">
          <div class="avatar">
            <ion-icon :icon="personOutline" class="avatar-icon" />
          </div>
          <div class="profile-info">
            <div class="profile-name">LOI - inspecteur</div>
            <div class="profile-email">inspecteur@recare.nl</div>
            <div class="profile-role">Inspecteur · RealEstateCare</div>
          </div>
          <ion-button fill="clear" size="small" class="edit-btn" @click="showToast('Profiel bewerken komt binnenkort')">
            <ion-icon :icon="createOutline" />
          </ion-button>
        </div>

        <!-- Meldingen -->
        <div class="settings-card">
          <div class="settings-card-header">
            <ion-icon :icon="notificationsOutline" class="section-icon" />
            <h3 class="card-title">Meldingen</h3>
          </div>
          <ion-list lines="none">
            <ion-item>
              <ion-icon :icon="phonePortraitOutline" slot="start" class="item-icon" />
              <ion-label>Pushmeldingen</ion-label>
              <ion-toggle v-model="pushEnabled" />
            </ion-item>
            <ion-item>
              <ion-icon :icon="mailOutline" slot="start" class="item-icon" />
              <ion-label>E-mailupdates</ion-label>
              <ion-toggle v-model="emailEnabled" />
            </ion-item>
            <ion-item>
              <ion-icon :icon="volumeHighOutline" slot="start" class="item-icon" />
              <ion-label>Geluidsmelding</ion-label>
              <ion-toggle v-model="soundEnabled" />
            </ion-item>
          </ion-list>
        </div>

        <!-- Weergave -->
        <div class="settings-card">
          <div class="settings-card-header">
            <ion-icon :icon="colorPaletteOutline" class="section-icon" />
            <h3 class="card-title">Weergave</h3>
          </div>
          <ion-list lines="none">
            <ion-item>
              <ion-icon :icon="moonOutline" slot="start" class="item-icon" />
              <ion-label>Donkere modus</ion-label>
              <ion-toggle v-model="darkMode" @ionChange="showToast('Donkere modus is nog niet beschikbaar')" />
            </ion-item>
            <ion-item>
              <ion-icon :icon="languageOutline" slot="start" class="item-icon" />
              <ion-label>Taal</ion-label>
              <ion-select v-model="language" interface="popover">
                <ion-select-option value="nl">Nederlands</ion-select-option>
                <ion-select-option value="en">English</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-icon :icon="textOutline" slot="start" class="item-icon" />
              <ion-label>Tekstgrootte</ion-label>
              <ion-select v-model="fontSize" interface="popover">
                <ion-select-option value="small">Klein</ion-select-option>
                <ion-select-option value="medium">Normaal</ion-select-option>
                <ion-select-option value="large">Groot</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
        </div>

        <!-- Beveiliging -->
        <div class="settings-card">
          <div class="settings-card-header">
            <ion-icon :icon="shieldCheckmarkOutline" class="section-icon" />
            <h3 class="card-title">Beveiliging</h3>
          </div>
          <ion-list lines="none">
            <ion-item button detail @click="showToast('Wachtwoord wijzigen komt binnenkort')">
              <ion-icon :icon="lockClosedOutline" slot="start" class="item-icon" />
              <ion-label>Wachtwoord wijzigen</ion-label>
            </ion-item>
            <ion-item button detail @click="showToast('2FA-instellingen komen binnenkort')">
              <ion-icon :icon="keyOutline" slot="start" class="item-icon" />
              <ion-label>Twee-factor authenticatie</ion-label>
            </ion-item>
          </ion-list>
        </div>

        <!-- Uitloggen -->
        <div class="settings-card">
          <div class="settings-card-header">
            <ion-icon :icon="logOutOutline" class="section-icon danger" />
            <h3 class="card-title danger">Account</h3>
          </div>
          <ion-list lines="none">
            <ion-item button @click="handleLogout" class="logout-item">
              <ion-icon :icon="logOutOutline" slot="start" class="item-icon danger" />
              <ion-label class="danger">Uitloggen</ion-label>
            </ion-item>
          </ion-list>
        </div>

      </div>
    </ion-content>

    <!-- Toast melding -->
    <ion-toast
      :is-open="toastOpen"
      :message="toastMessage"
      :duration="2000"
      position="bottom"
      @did-dismiss="toastOpen = false"
    />

  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage, IonContent, IonList, IonItem, IonLabel,
  IonToggle, IonSelect, IonSelectOption, IonIcon,
  IonButton, IonToast,
} from '@ionic/vue'
import {
  personOutline, createOutline, notificationsOutline,
  phonePortraitOutline, mailOutline, volumeHighOutline,
  colorPaletteOutline, moonOutline, languageOutline, textOutline,
  shieldCheckmarkOutline, lockClosedOutline, keyOutline,
  logOutOutline,
} from 'ionicons/icons'
import AppHeader from '@/components/AppHeader.vue'

const router = useRouter()

const pushEnabled = ref(true)
const emailEnabled = ref(false)
const soundEnabled = ref(true)
const darkMode = ref(false)
const language = ref('nl')
const fontSize = ref('medium')

const toastOpen = ref(false)
const toastMessage = ref('')

function showToast(message: string) {
  toastMessage.value = message
  toastOpen.value = true
}

function handleLogout() {
  router.replace('/login')
}
</script>

<style scoped>
.settings-wrapper {
  padding: 20px 16px 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Profielkaart */
.profile-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow:
    0 8px 20px rgba(20, 27, 31, 0.08),
    0 2px 6px rgba(20, 27, 31, 0.05);
  border-left: 4px solid rgb(0, 170, 162);
}

.avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(0, 170, 162, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-icon {
  font-size: 26px;
  color: rgb(0, 170, 162);
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 16px;
  font-weight: 600;
  color: rgb(20, 27, 31);
  margin-bottom: 2px;
}

.profile-email {
  font-size: 13px;
  color: rgba(20, 27, 31, 0.6);
  margin-bottom: 2px;
}

.profile-role {
  font-size: 12px;
  color: rgb(0, 170, 162);
  font-weight: 500;
}

.edit-btn {
  --color: rgba(20, 27, 31, 0.4);
  flex-shrink: 0;
}

/* Instellingenkaarten */
.settings-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow:
    0 8px 20px rgba(20, 27, 31, 0.08),
    0 2px 6px rgba(20, 27, 31, 0.05);
}

.settings-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.section-icon {
  font-size: 18px;
  color: rgb(0, 170, 162);
}

.section-icon.danger {
  color: #e74c3c;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: rgb(20, 27, 31);
}

.card-title.danger {
  color: #e74c3c;
}

ion-item {
  --background: transparent;
  --padding-start: 0;
  --inner-padding-end: 0;
}

.item-icon {
  font-size: 18px;
  color: rgba(20, 27, 31, 0.45);
  margin-right: 4px;
}

.item-icon.danger {
  color: #e74c3c;
}

.logout-item {
  --color: #e74c3c;
}

.danger {
  color: #e74c3c;
}
</style>