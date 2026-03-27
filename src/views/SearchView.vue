<template>
  <ion-page>
    <AppHeader title="Zoeken" />

    <ion-content class="recare-bg" fullscreen>
      <div class="page-wrapper">
        <ion-searchbar
          v-model="searchQuery"
          placeholder="Zoek inspecties, documenten..."
          class="recare-searchbar"
        />

        <div v-if="filteredResults.length" class="results-wrapper">
          <div v-for="item in filteredResults" :key="item.id" class="result-card">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-subtitle">{{ item.description }}</p>
          </div>
        </div>

        <div v-else class="no-results">Geen resultaten gevonden.</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { IonPage, IonContent, IonSearchbar } from '@ionic/vue'
import AppHeader from '@/components/AppHeader.vue'

const searchQuery = ref('')

const results = ref([
  { id: 1, title: 'Inspectie Amsterdam', description: 'Appartement complex West.' },
  { id: 2, title: 'Handleiding Dakinspectie', description: 'Procedure en checklist.' },
  { id: 3, title: 'Inspectie Rotterdam', description: 'Kantoorpand centrum.' },
])

const filteredResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return results.value
  return results.value.filter((item) => item.title.toLowerCase().includes(q))
})
</script>

<style scoped>
.page-wrapper {
  padding: 20px 16px;
}

.recare-searchbar {
  margin-bottom: 16px;
  --background: #ffffff;
  border-radius: 14px;
}

.result-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 14px;
  box-shadow:
    0 10px 26px rgba(20, 27, 31, 0.08),
    0 2px 8px rgba(20, 27, 31, 0.06);
}

.card-title {
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 600;
  color: rgb(20, 27, 31);
}

.card-subtitle {
  margin: 0;
  font-size: 14px;
  color: rgba(20, 27, 31, 0.75);
}

.no-results {
  margin-top: 10px;
  font-size: 14px;
  color: rgba(20, 27, 31, 0.6);
}
</style>
