<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="back" @click="goBack">
          <ion-icon :icon="arrowBackOutline" />
          <ion-label>Terug</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="dashboard" @click="goRoot('/tabs/dashboard')">
          <ion-icon :icon="gridOutline" />
          <ion-label>Dashboard</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search" @click="goRoot('/tabs/search')">
          <ion-icon :icon="searchOutline" />
          <ion-label>Zoeken</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="info" @click="goRoot('/tabs/info')">
          <ion-icon :icon="informationCircleOutline" />
          <ion-label>Info</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

    <!-- Statisch logo boven de Dashboard-tab -->
    <div class="floating-logo">
      <img src="/src/assets/Logo-Dashboard.png" alt="RealEstateCare logo" />
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useIonRouter } from '@ionic/vue'

import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/vue'

import {
  arrowBackOutline,
  gridOutline,
  searchOutline,
  informationCircleOutline,
} from 'ionicons/icons'

const router = useRouter()
const ionRouter = useIonRouter()

function goBack() {
  if (ionRouter.canGoBack()) {
    ionRouter.back()
  } else {
    router.replace('/tabs/dashboard')
  }
}

function goRoot(path: string) {
  router.replace(path)
}
</script>

<style scoped>
.floating-logo {
  position: fixed;
  left: 50.3%;
  transform: translateX(-50%);
  bottom: 10px;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 999;
}

.floating-logo img {
  width: 70px;
  height: 70px;
  object-fit: contain;
  display: block;
}
</style>