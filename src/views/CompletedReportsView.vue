<template>
  <ion-page>
    <AppHeader title="Uitgevoerde inspecties" />

    <ion-content class="recare-bg" fullscreen>
      <div class="completed-wrapper">
        <p v-if="loading" class="status-text">Inspecties laden...</p>

        <p v-else-if="errorMessage" class="status-text error">
          {{ errorMessage }}
        </p>

        <template v-else>
          <ion-list inset>
            <ion-item
              v-for="inspection in sortedInspections"
              :key="inspection.id"
              button
              detail
              @click="selectInspection(inspection)"
            >
              <ion-label class="ion-text-wrap">
                <div class="item-title">{{ inspection.propertyAddress }}</div>
                <div class="item-subtitle">
                  {{ formatDate(inspection.inspectionDate) }}
                  <span class="dot">•</span>
                  {{ inspection.status }}
                </div>
              </ion-label>
            </ion-item>
          </ion-list>

          <div v-if="selectedInspection" class="detail-card">
            <h3 class="detail-title">Inspectiedetails</h3>

            <div class="detail-row">
              <div class="detail-label">Adres</div>
              <div class="detail-value">{{ selectedInspection.propertyAddress }}</div>
            </div>

            <div class="detail-row">
              <div class="detail-label">Inspecteur</div>
              <div class="detail-value">{{ selectedInspection.inspectorName }}</div>
            </div>

            <div class="detail-row">
              <div class="detail-label">Datum</div>
              <div class="detail-value">{{ formatDate(selectedInspection.inspectionDate) }}</div>
            </div>

            <div class="detail-row">
              <div class="detail-label">Status</div>
              <div class="detail-value">{{ selectedInspection.status }}</div>
            </div>

            <div class="detail-row">
              <div class="detail-label">Notities</div>
              <div class="detail-value">{{ selectedInspection.notes }}</div>
            </div>

            <ion-button
              expand="block"
              fill="outline"
              class="detail-button"
              @click="clearSelection"
            >
              Sluiten
            </ion-button>
          </div>

          <div v-else class="hint-card">
            <p class="hint-text">Klik op een inspectie om de details te bekijken.</p>
          </div>
        </template>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { IonButton, IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/vue'
import AppHeader from '@/components/AppHeader.vue'

type InspectionStatus = 'completed' | 'inProgress' | 'cancelled'

interface Inspection {
  id: number
  propertyAddress: string
  inspectorName: string
  inspectionDate: string // YYYY-MM-DD
  status: InspectionStatus
  notes: string
}

const API_URL =
  'https://my-json-server.typicode.com/BinkBySteff/Feedbackopdracht-3-LOI-/inspections'

const inspections = ref<Inspection[]>([])
const selectedInspection = ref<Inspection | null>(null)

const loading = ref(true)
const errorMessage = ref('')

const sortedInspections = computed(() => {
  return [...inspections.value].sort((a, b) => b.inspectionDate.localeCompare(a.inspectionDate))
})

function selectInspection(inspection: Inspection) {
  selectedInspection.value = inspection
}

function clearSelection() {
  selectedInspection.value = null
}

function formatDate(isoDate: string) {
  const [y, m, d] = isoDate.split('-')
  if (!y || !m || !d) return isoDate
  return `${d}-${m}-${y}`
}

async function fetchInspections(): Promise<Inspection[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`Failed to fetch inspections: ${response.status}`)
  }

  const data = (await response.json()) as Inspection[]
  return data
}

onMounted(async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    inspections.value = await fetchInspections()
  } catch (err) {
    errorMessage.value =
      err instanceof Error ? err.message : 'Er ging iets mis bij het ophalen van inspecties.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.completed-wrapper {
  padding: 24px 16px;
}

.status-text {
  margin: 8px 0 0;
  font-size: 14px;
  opacity: 0.9;
}

.status-text.error {
  opacity: 1;
}

.item-title {
  font-size: 16px;
  line-height: 1.2;
}

.item-subtitle {
  margin-top: 6px;
  font-size: 12px;
  opacity: 0.8;
}

.dot {
  padding: 0 6px;
}

.detail-card {
  margin-top: 16px;
  background: #ffffff;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 10px 26px rgba(20, 27, 31, 0.08), 0 2px 8px rgba(20, 27, 31, 0.06);
}

.detail-title {
  margin: 0 0 14px;
  font-size: 16px;
}

.detail-row {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 10px;
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.detail-row:first-of-type {
  border-top: none;
  padding-top: 0;
}

.detail-label {
  font-size: 12px;
  opacity: 0.75;
}

.detail-value {
  font-size: 13px;
}

.detail-button {
  margin-top: 16px;
}

.hint-card {
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 16px;
  padding: 16px;
}

.hint-text {
  margin: 0;
  font-size: 13px;
  opacity: 0.9;
}
</style>