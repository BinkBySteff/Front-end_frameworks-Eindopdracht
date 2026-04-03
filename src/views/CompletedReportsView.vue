<template>
  <ion-page>
    <AppHeader title="Uitgevoerde inspecties" />

    <ion-content class="recare-bg">
      <div class="completed-wrapper">

        <div v-if="inspectionStore.loading" class="loading-state">
          <ion-spinner name="crescent" color="primary" />
          <p class="loading-text">Inspecties laden...</p>
        </div>

        <p v-else-if="inspectionStore.error" class="status-text error">{{ inspectionStore.error }}</p>

        <template v-else>
          <ion-list inset>
            <ion-item
              v-for="inspection in completedInspections"
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
                  {{ inspection.inspectorName }}
                </div>
              </ion-label>
            </ion-item>
          </ion-list>

          <div class="hint-card">
            <p class="hint-text">
              {{ completedInspections.length ? 'Klik op een inspectie om de details te bekijken.' : 'Geen uitgevoerde inspecties gevonden.' }}
            </p>
          </div>
        </template>

      </div>
    </ion-content>

    <!-- Pop-up modal -->
    <ion-modal :is-open="modalOpen" @did-dismiss="clearSelection">
      <ion-header>
        <ion-toolbar class="recare-toolbar">
          <ion-title>Inspectiedetails</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="clearSelection">Sluiten</ion-button>
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
            <div class="detail-value">{{ selectedInspection.status }}</div>
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
            <div class="detail-row">
              <div class="detail-label">Omschrijving</div>
              <div class="detail-value">{{ selectedInspection.damageReport.description }}</div>
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
            <div class="detail-row">
              <div class="detail-label">Acuut</div>
              <div class="detail-value">{{ selectedInspection.maintenanceReport.urgentAction ? 'Ja' : 'Nee' }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Kostenindicatie</div>
              <div class="detail-value">{{ selectedInspection.maintenanceReport.costEstimate }}</div>
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
            <div class="detail-row">
              <div class="detail-label">Goedgekeurd</div>
              <div class="detail-value">{{ selectedInspection.technicalInstallationReport.approved ? 'Ja' : 'Nee' }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Opmerkingen</div>
              <div class="detail-value">{{ selectedInspection.technicalInstallationReport.remarks }}</div>
            </div>
          </template>

          <template v-if="selectedInspection.modificationReport">
            <div class="detail-section-title">Modificaties</div>
            <div class="detail-row">
              <div class="detail-label">Locatie</div>
              <div class="detail-value">{{ selectedInspection.modificationReport.location }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Type modificatie</div>
              <div class="detail-value">{{ selectedInspection.modificationReport.modificationType }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Goedgekeurd</div>
              <div class="detail-value">{{ selectedInspection.modificationReport.approved ? 'Ja' : 'Nee' }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Opmerkingen</div>
              <div class="detail-value">{{ selectedInspection.modificationReport.remarks }}</div>
            </div>
          </template>

          <div v-if="selectedInspection.photos?.length" class="detail-row">
            <div class="detail-label">Foto's</div>
            <div class="detail-value">{{ selectedInspection.photos.join(', ') }}</div>
          </div>
        </div>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  IonPage, IonContent, IonItem, IonLabel, IonList, IonSpinner,
  IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
} from '@ionic/vue'
import AppHeader from '@/components/AppHeader.vue'
import { useInspectionStore } from '@/stores/inspectionStore'
import type { Inspection } from '@/models/Inspection'

const inspectionStore = useInspectionStore()
const selectedInspection = ref<Inspection | null>(null)
const modalOpen = ref(false)

const completedInspections = computed(() =>
  [...inspectionStore.completedReports].sort((a, b) =>
    b.inspectionDate.localeCompare(a.inspectionDate),
  ),
)

function selectInspection(inspection: Inspection) {
  selectedInspection.value = inspection
  modalOpen.value = true
}

function clearSelection() {
  modalOpen.value = false
  selectedInspection.value = null
}

function formatDate(isoDate: string) {
  const [y, m, d] = isoDate.split('-')
  if (!y || !m || !d) return isoDate
  return `${d}-${m}-${y}`
}
</script>

<style scoped>
.completed-wrapper { padding: 24px 16px; }

.loading-state {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
}

.loading-text {
  margin: 0;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.6);
}

.status-text.error {
  font-size: 14px;
  color: #c0392b;
}

.item-title { font-size: 16px; line-height: 1.2; }

.item-subtitle { margin-top: 6px; font-size: 12px; opacity: 0.8; }

.dot { padding: 0 6px; }

.hint-card {
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 16px;
  padding: 16px;
}

.hint-text { margin: 0; font-size: 13px; opacity: 0.9; }

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