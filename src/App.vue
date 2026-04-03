<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { useInspectionStore } from '@/stores/inspectionStore'

const inspectionStore = useInspectionStore()

// API altijd aanroepen bij elke app-start / refresh
onMounted(() => {
  inspectionStore.loadFromApi()
})
</script>