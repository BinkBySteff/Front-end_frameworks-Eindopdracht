<template>
  <ion-page>
    <AppHeader title="Informatie" />

    <ion-content class="recare-bg" fullscreen>
      <div class="info-wrapper">
        <div class="info-card">
          <h3 class="card-title">Over LOI RealEstateCare Case</h3>
          <p>
            Mijn naam is Steffen Aerts en voor de module Front-end, onderdeel frameworks, heb ik
            deze applicatie ontwikkeld. Inzendcode: 32411SA1 Leidse Onderwijsinstellingen.
          </p>
        </div>

        <div class="info-card">
          <h3 class="card-title">Versie</h3>
          <p>Prototype versie 1.0</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<style scoped>
.info-wrapper {
  padding: 24px 16px;
}

.info-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;

  box-shadow:
    0 10px 26px rgba(20, 27, 31, 0.08),
    0 2px 8px rgba(20, 27, 31, 0.06);
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: rgb(20, 27, 31);
}

.info-card p {
  margin: 0;
  color: rgba(20, 27, 31, 0.75);
  font-size: 14px;
}
</style>
