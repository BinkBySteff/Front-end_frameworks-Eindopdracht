<template>
  <ion-page>
    <AppHeader title="Zoeken" />

    <ion-content class="recare-bg">
      <div class="page-wrapper">

        <ion-searchbar
          v-model="searchQuery"
          placeholder="Zoek inspecties, documenten..."
          class="recare-searchbar"
          :animated="true"
        />

        <!-- Categoriefilter -->
        <div class="filter-row">
          <button
            v-for="filter in filters"
            :key="filter.key"
            class="filter-chip"
            :class="{ active: activeFilter === filter.key }"
            @click="activeFilter = filter.key"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Laadstatus -->
        <div v-if="inspectionStore.loading" class="loading-state">
          <ion-spinner name="crescent" color="light" />
          <p class="loading-text">Data laden...</p>
        </div>

        <!-- Resultaten -->
        <template v-else>
          <div v-if="filteredResults.length" class="results-wrapper">

            <!-- Inspecties -->
            <template v-if="inspectionResults.length && (activeFilter === 'alles' || activeFilter === 'inspecties')">
              <p class="result-category">Inspecties</p>
              <div
                v-for="item in inspectionResults"
                :key="'insp-' + item.id"
                class="result-card"
                @click="openInspection(item)"
              >
                <div class="result-title">{{ item.propertyAddress }}</div>
                <div class="result-meta">
                  {{ formatDate(item.inspectionDate) }}
                  <span class="dot">•</span>
                  {{ item.inspectorName }}
                  <span class="dot">•</span>
                  <span :class="item.status === 'completed' ? 'status-done' : 'status-open'">
                    {{ item.status === 'completed' ? 'Afgerond' : 'Openstaand' }}
                  </span>
                </div>
              </div>
            </template>

            <!-- Kennisbank documenten -->
            <template v-if="docResults.length && (activeFilter === 'alles' || activeFilter === 'documenten')">
              <p class="result-category">Kennisbank</p>
              <div
                v-for="doc in docResults"
                :key="'doc-' + doc.id"
                class="result-card doc-card"
              >
                <ion-icon :icon="documentTextOutline" class="doc-icon" />
                <div>
                  <div class="result-title">{{ doc.title }}</div>
                  <div class="result-sub">{{ doc.description }}</div>
                </div>
              </div>
            </template>

          </div>

          <!-- Geen resultaten -->
          <div v-else-if="searchQuery.trim()" class="no-results">
            <p>Geen resultaten voor "<strong>{{ searchQuery }}</strong>"</p>
          </div>

          <!-- Lege staat -->
          <div v-else class="empty-state">
            <p>Zoek op adres, inspecteur of document.</p>
          </div>
        </template>

      </div>
    </ion-content>

    <!-- Inspectie detail modal -->
    <ion-modal :is-open="modalOpen" @did-dismiss="closeModal">
      <ion-header>
        <ion-toolbar class="recare-toolbar">
          <ion-title>Inspectiedetails</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeModal">Sluiten</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="modal-content" v-if="selectedInspection">
        <div class="modal-body">
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
            <div class="detail-value">{{ selectedInspection.status === 'completed' ? 'Afgerond' : 'Openstaand' }}</div>
          </div>
          <div v-if="selectedInspection.notes" class="detail-row">
            <div class="detail-label">Notities</div>
            <div class="detail-value">{{ selectedInspection.notes }}</div>
          </div>

          <template v-if="selectedInspection.damageReport">
            <div class="detail-section-title">Schaderapport</div>
            <div class="detail-row">
              <div class="detail-label">Locatie</div>
              <div class="detail-value">{{ selectedInspection.damageReport.location }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Soort schade</div>
              <div class="detail-value">{{ selectedInspection.damageReport.damageType }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Acuut</div>
              <div class="detail-value">{{ selectedInspection.damageReport.urgentAction ? 'Ja' : 'Nee' }}</div>
            </div>
          </template>

          <template v-if="selectedInspection.maintenanceReport">
            <div class="detail-section-title">Onderhoudsrapport</div>
            <div class="detail-row">
              <div class="detail-label">Locatie</div>
              <div class="detail-value">{{ selectedInspection.maintenanceReport.location }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Type onderhoud</div>
              <div class="detail-value">{{ selectedInspection.maintenanceReport.maintenanceType }}</div>
            </div>
          </template>

          <template v-if="selectedInspection.technicalInstallationReport">
            <div class="detail-section-title">Technische installaties</div>
            <div class="detail-row">
              <div class="detail-label">Locatie</div>
              <div class="detail-value">{{ selectedInspection.technicalInstallationReport.location }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Type installatie</div>
              <div class="detail-value">{{ selectedInspection.technicalInstallationReport.installationType }}</div>
            </div>
          </template>
        </div>
      </ion-content>
    </ion-modal>

  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  IonPage, IonContent, IonSearchbar, IonSpinner, IonIcon,
  IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
} from '@ionic/vue'
import { documentTextOutline } from 'ionicons/icons'
import AppHeader from '@/components/AppHeader.vue'
import { useInspectionStore } from '@/stores/inspectionStore'
import type { Inspection } from '@/models/Inspection'

const inspectionStore = useInspectionStore()
const searchQuery = ref('')
const activeFilter = ref('alles')
const modalOpen = ref(false)
const selectedInspection = ref<Inspection | null>(null)

const filters = [
  { key: 'alles', label: 'Alles' },
  { key: 'inspecties', label: 'Inspecties' },
  { key: 'documenten', label: 'Documenten' },
]

// Kennisbank documenten als statische dataset
const knowledgeDocs = [
  { id: 1, title: 'Inspectiehandleiding 2026', description: 'Volledige handleiding voor inspecteurs' },
  { id: 2, title: 'Checklist schadeopname', description: 'Stap-voor-stap checklist bij schade' },
  { id: 3, title: 'Testprocedure technische installaties', description: 'Keuring en testprotocol' },
  { id: 4, title: 'Normblad modificaties huurders', description: 'Toegestane en niet-toegestane aanpassingen' },
  { id: 5, title: 'Richtlijnen vastgoedinspectie', description: 'Standaardprocedures en aandachtspunten' },
]

const allInspections = computed(() => [
  ...inspectionStore.assignedReports,
  ...inspectionStore.completedReports,
])

const inspectionResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return allInspections.value.filter(
    (i) =>
      i.propertyAddress.toLowerCase().includes(q) ||
      i.inspectorName.toLowerCase().includes(q),
  )
})

const docResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return knowledgeDocs.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q),
  )
})

const filteredResults = computed(() => {
  if (activeFilter.value === 'inspecties') return inspectionResults.value
  if (activeFilter.value === 'documenten') return docResults.value
  return [...inspectionResults.value, ...docResults.value]
})

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('nl-NL')
}

function openInspection(inspection: Inspection) {
  selectedInspection.value = inspection
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
  selectedInspection.value = null
}
</script>

<style scoped>
.page-wrapper {
  padding: 16px;
}

.recare-searchbar {
  --background: #ffffff;
  --border-radius: 14px;
  --box-shadow: 0 4px 12px rgba(20, 27, 31, 0.08);
  margin-bottom: 12px;
  padding: 0;
}

.filter-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-chip {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1.5px solid rgba(0, 170, 162, 0.4);
  background: transparent;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.7);
  cursor: pointer;
  transition: all 120ms ease;
}

.filter-chip.active {
  background: rgb(0, 170, 162);
  border-color: rgb(0, 170, 162);
  color: #ffffff;
  font-weight: 600;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 0;
}

.loading-text {
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
}

.result-category {
  margin: 0 0 8px 4px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(20, 27, 31, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.results-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.result-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 14px 16px;
  margin-bottom: 8px;
  cursor: pointer;
  box-shadow:
    0 4px 12px rgba(20, 27, 31, 0.07),
    0 1px 4px rgba(20, 27, 31, 0.05);
  border-left: 4px solid rgb(0, 170, 162);
  transition: transform 120ms ease;
}

.result-card:active {
  transform: scale(0.98);
}

.doc-card {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: default;
}

.doc-icon {
  font-size: 22px;
  color: rgb(0, 170, 162);
  flex-shrink: 0;
}

.result-title {
  font-size: 15px;
  font-weight: 600;
  color: rgb(20, 27, 31);
  margin-bottom: 4px;
}

.result-meta {
  font-size: 12px;
  color: rgba(20, 27, 31, 0.6);
}

.result-sub {
  font-size: 13px;
  color: rgba(20, 27, 31, 0.6);
}

.dot {
  padding: 0 4px;
}

.status-done {
  color: rgb(0, 170, 162);
  font-weight: 500;
}

.status-open {
  color: #e67e22;
  font-weight: 500;
}

.no-results, .empty-state {
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: rgba(20, 27, 31, 0.6);
  background: rgba(255,255,255,0.8);
  border-radius: 14px;
  padding: 20px;
}

/* Modal */
.modal-content { --background: #f5f5f5; }
.modal-body { padding: 20px 16px; }

.detail-section-title {
  margin: 16px 0 4px;
  font-size: 12px;
  font-weight: 600;
  color: rgb(0, 170, 162);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px;
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.detail-label { font-size: 12px; color: rgba(20, 27, 31, 0.6); }
.detail-value { font-size: 13px; color: rgb(20, 27, 31); font-weight: 500; }
</style>