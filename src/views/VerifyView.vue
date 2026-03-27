<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="verify-container">
        <h1>Verificatiecode</h1>
        <p>Voer de 6-cijferige code in om in te loggen.</p>

        <ion-item>
          <ion-label position="stacked">Code</ion-label>
          <ion-input v-model="code" type="text" :maxlength="6" />
        </ion-item>

        <ion-button expand="block" class="ion-margin-top" @click="handleVerify">
          Bevestigen
        </ion-button>
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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/vue'

const code = ref('')
const router = useRouter()

function handleVerify() {
  if (code.value.length === 6) {
    router.push('/tabs/dashboard')
  }
}
</script>

<style scoped>
.verify-container {
  max-width: 420px;
  margin: 80px auto;
}
</style>