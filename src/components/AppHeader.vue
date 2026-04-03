<template>
  <ion-header>
    <ion-toolbar class="recare-toolbar">
      <ion-title class="recare-title">{{ title }}</ion-title>

      <ion-buttons :slot="'end'">
        <ion-button aria-label="Notificaties" @click="showNotifications">
          <ion-icon :icon="notificationsOutline" />
        </ion-button>

        <ion-button router-link="/tabs/settings" aria-label="Instellingen">
          <ion-icon :icon="settingsOutline" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <!-- Notificaties popup -->
  <ion-modal :is-open="modalOpen" @did-dismiss="closeModal" :breakpoints="[0, 0.35]" :initial-breakpoint="0.35">
    <ion-header>
      <ion-toolbar class="recare-toolbar">
        <ion-title>Meldingen</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Sluiten</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="modal-content">
      <div class="notification-body">
        <ion-icon :icon="notificationsOffOutline" class="no-notif-icon" />
        <p class="no-notif-text">Geen nieuwe meldingen</p>
        <p class="no-notif-sub">U bent helemaal bij.</p>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonIcon, IonModal, IonContent,
} from '@ionic/vue'
import { notificationsOutline, notificationsOffOutline, settingsOutline } from 'ionicons/icons'

defineProps<{
  title: string
}>()

const modalOpen = ref(false)

function showNotifications() {
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}
</script>

<style scoped>
.recare-title {
  text-align: left;
}

.modal-content {
  --background: #f5f5f5;
}

.notification-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  text-align: center;
}

.no-notif-icon {
  font-size: 48px;
  color: rgb(0, 170, 162);
  margin-bottom: 14px;
}

.no-notif-text {
  margin: 0 0 6px 0;
  font-size: 17px;
  font-weight: 600;
  color: rgb(20, 27, 31);
}

.no-notif-sub {
  margin: 0;
  font-size: 14px;
  color: rgba(20, 27, 31, 0.55);
}
</style>