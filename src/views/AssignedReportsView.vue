<template>
  <ion-page>
    <AppHeader title="Toegewezen rapportages" />

    <ion-content class="recare-bg" fullscreen>
      <div class="page-wrapper">
        <h2 class="page-title"></h2>

        <div class="card">
          <ion-list lines="none">
            <ion-item button detail @click="openType('schade')">
              <ion-label>
                <div class="item-title">Schade opnemen</div>
                <div class="item-subtitle">Schade registreren en vastleggen</div>
              </ion-label>
            </ion-item>

            <ion-item button detail @click="openType('onderhoud')">
              <ion-label>
                <div class="item-title">Achterstallig onderhoud opnemen</div>
                <div class="item-subtitle">Onderhoud, kostenindicatie, urgentie</div>
              </ion-label>
            </ion-item>

            <ion-item button detail @click="openType('installaties')">
              <ion-label>
                <div class="item-title">Technische installaties inspecteren</div>
                <div class="item-subtitle">Storingen, keuring, opmerkingen</div>
              </ion-label>
            </ion-item>

            <ion-item button detail @click="openType('modificaties')">
              <ion-label>
                <div class="item-title">Modificaties inventariseren</div>
                <div class="item-subtitle">Situatie, actie, documentatie</div>
              </ion-label>
            </ion-item>
          </ion-list>
        </div>

        <p class="hint"></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const router = useRouter()

function openType(type: 'schade' | 'onderhoud' | 'installaties' | 'modificaties') {
  router.push(`/tabs/assigned/${type}`)
}
</script>

<style scoped>
.page-wrapper {
  padding: 20px 16px;
}

.page-title {
  margin: 0 0 14px 0;
  font-size: 18px;
  font-weight: 600;
  color: rgb(20, 27, 31);
}

.card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 10px 26px rgba(20, 27, 31, 0.08),
    0 2px 8px rgba(20, 27, 31, 0.06);
}

.item-title {
  font-weight: 600;
  color: rgb(20, 27, 31);
}

.item-subtitle {
  margin-top: 3px;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.65);
}

.hint {
  margin-top: 12px;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.6);
}
</style>
