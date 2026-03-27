<template>
  <ion-page>
    <AppHeader title="Kennisbank" />

    <ion-content class="recare-bg" fullscreen>
      <div class="knowledge-wrapper">
        <div class="knowledge-card">
          <h3 class="card-title">Richtlijnen inspectie</h3>
          <p>Overzicht van standaardprocedures en aandachtspunten tijdens vastgoedinspecties.</p>
        </div>

        <div class="knowledge-card">
          <h3 class="card-title">Veelgestelde vragen</h3>
          <p>Antwoorden op veelvoorkomende vragen van inspecteurs en beheerders.</p>
        </div>

        <div class="knowledge-card">
          <h3 class="card-title">Documentatie</h3>
          <p>Handleidingen, checklists en aanvullende documentatie.</p>
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
.knowledge-wrapper {
  padding: 24px 16px;
}

.knowledge-card {
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

.knowledge-card p {
  margin: 0;
  font-size: 14px;
  color: rgba(20, 27, 31, 0.75);
}
</style>
