<template>
  <ion-page>
    <AppHeader title="Dashboard - Real Estate Care" />
    <ion-content class="recare-bg recare-dashboard-page" :scroll-y="false">
      <div class="dashboard-shell">

        <div class="dashboard-top-spacer"></div>

        <!-- Tegels -->
        <div class="dashboard-tiles-section">
          <div class="recare-tiles-grid">

            <!-- Toegewezen met badge -->
            <a class="recare-tile-link" href="/tabs/assigned">
              <div class="recare-tile tile-toegewezen">
                <div class="recare-tile-content">
                  <h3 class="recare-tile-title">Toegewezen</h3>
                  <p class="recare-tile-subtitle">{{ inspectionStore.assignedReports.length }} openstaande inspecties</p>
                </div>
              </div>
              <div v-if="inspectionStore.assignedReports.length > 0" class="tile-badge">
                {{ inspectionStore.assignedReports.length }}
              </div>
            </a>

            <a class="recare-tile-link" href="/tabs/completed">
              <div class="recare-tile tile-uitgevoerd">
                <div class="recare-tile-content">
                  <h3 class="recare-tile-title">Uitgevoerd</h3>
                  <p class="recare-tile-subtitle">{{ inspectionStore.completedReports.length }} afgerond</p>
                </div>
              </div>
            </a>

            <a class="recare-tile-link" href="/tabs/knowledge">
              <div class="recare-tile tile-kennisbank">
                <div class="recare-tile-content">
                  <h3 class="recare-tile-title">Kennisbank</h3>
                  <p class="recare-tile-subtitle">Tips en documentatie</p>
                </div>
              </div>
            </a>

            <a class="recare-tile-link" href="/tabs/settings">
              <div class="recare-tile tile-instellingen">
                <div class="recare-tile-content">
                  <h3 class="recare-tile-title">Instellingen</h3>
                  <p class="recare-tile-subtitle">App-voorkeuren</p>
                </div>
              </div>
            </a>

          </div>
        </div>

        <!-- Recente inspecties -->
        <div class="recent-inspections-panel">
          <div class="recent-panel-header">
            <h2 class="recent-panel-title">Recente inspecties</h2>
            <p class="recent-panel-subtitle">Laatst afgeronde rapportages</p>
          </div>

          <div v-if="inspectionStore.loading" class="loading-state">
            <ion-spinner name="crescent" color="primary" />
            <p class="loading-text">Inspecties laden...</p>
          </div>

          <p v-else-if="inspectionStore.error" class="error-text">{{ inspectionStore.error }}</p>

          <div v-else-if="recentInspections.length > 0" class="recent-panel-list">
            <button
              v-for="inspection in recentInspections"
              :key="inspection.id"
              type="button"
              class="recent-panel-item"
              @click="openDetail(inspection)"
            >
              <div class="recent-panel-item-text">
                <span class="recent-panel-address">{{ inspection.propertyAddress }}</span>
                <span class="recent-panel-date">{{ formatDate(inspection.inspectionDate) }}</span>
              </div>
              <span class="recent-panel-item-arrow">›</span>
            </button>
          </div>

          <p v-else class="recent-panel-empty">Er zijn nog geen recente inspecties.</p>
        </div>

      </div>
    </ion-content>

    <!-- Pop-up modal -->
    <ion-modal :is-open="modalOpen" @did-dismiss="closeDetail">
      <ion-header>
        <ion-toolbar class="recare-toolbar">
          <ion-title>Inspectiedetails</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeDetail">Sluiten</ion-button>
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

          <div v-if="selectedInspection.photos?.length">
            <div class="detail-section-title">Foto's</div>
            <div class="photos-grid">
              <img
                v-for="photo in selectedInspection.photos"
                :key="photo"
                :src="`/src/assets/${photo}`"
                :alt="photo"
                class="inspection-photo"
              />
            </div>
          </div>
        </div>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonContent, IonModal, IonHeader, IonSpinner,
  IonToolbar, IonTitle, IonButtons, IonButton,
} from '@ionic/vue'
import { computed, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import { useInspectionStore } from '@/stores/inspectionStore'
import type { Inspection } from '@/models/Inspection'

const inspectionStore = useInspectionStore()
const selectedInspection = ref<Inspection | null>(null)
const modalOpen = ref(false)

const recentInspections = computed(() =>
  inspectionStore.completedReports
    .slice()
    .sort((a, b) => b.inspectionDate.localeCompare(a.inspectionDate))
    .slice(0, 2),
)

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('nl-NL')
}

function openDetail(inspection: Inspection) {
  selectedInspection.value = inspection
  modalOpen.value = true
}

function closeDetail() {
  modalOpen.value = false
  selectedInspection.value = null
}
</script>

<style scoped>
.tile-toegewezen { background-image: url('/src/assets/Toegewezen.png'); }
.tile-uitgevoerd { background-image: url('/src/assets/Uitgevoerd.png'); }
.tile-kennisbank { background-image: url('/src/assets/Kennisbank.png'); }
.tile-instellingen { background-image: url('/src/assets/Instellingen.png'); }

.loading-state {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

.loading-text {
  margin: 0;
  font-size: 12px;
  color: rgba(20, 27, 31, 0.6);
}

.error-text {
  margin: 4px 0 0;
  font-size: 12px;
  color: #c0392b;
}

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

.photos-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.inspection-photo {
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(20, 27, 31, 0.12);
}
</style>