<template>
  <ion-header>
    <ion-toolbar class="recare-toolbar">
      <ion-title class="recare-title">{{ title }}</ion-title>

      <ion-buttons :slot="'end'">
        <ion-button aria-label="Notificaties">
          <ion-icon :icon="notificationsOutline" />
        </ion-button>

        <ion-button router-link="/tabs/settings" aria-label="Instellingen">
          <ion-icon :icon="settingsOutline" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/vue'
import { notificationsOutline, settingsOutline } from 'ionicons/icons'

defineProps<{
  title: string
}>()
</script>

<style scoped>
.recare-title {
  text-align: left;
}
</style>
