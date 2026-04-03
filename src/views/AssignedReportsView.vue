<template>
  <ion-page>
    <AppHeader title="Toegewezen rapportages" />

    <ion-content class="recare-bg">
      <div class="page-wrapper">

        <!-- Laadstatus -->
        <div v-if="inspectionStore.loading" class="loading-state">
          <ion-spinner name="crescent" color="light" />
          <p class="loading-text">Inspecties laden...</p>
        </div>

        <!-- Geen openstaande inspecties -->
        <div v-else-if="assignedInspections.length === 0" class="empty-card">
          <p class="empty-text">Geen openstaande inspecties.</p>
        </div>

        <!-- Lijst van openstaande inspecties -->
        <div v-else class="inspection-list">
          <div
            v-for="inspection in assignedInspections"
            :key="inspection.id"
            class="inspection-card"
            @click="selectInspection(inspection)"
          >
            <div class="inspection-card-header">
              <div class="inspection-address">{{ inspection.propertyAddress }}</div>
              <div class="inspection-date">{{ formatDate(inspection.inspectionDate) }}</div>
            </div>
            <div class="inspection-meta">
              <span class="inspector-name">{{ inspection.inspectorName }}</span>
              <span class="inspection-types">{{ formatTypes(inspection.inspectionTypes) }}</span>
            </div>
            <div class="card-arrow">›</div>
          </div>
        </div>

      </div>
    </ion-content>

    <!-- Modal met categorieën van de geselecteerde inspectie -->
    <ion-modal :is-open="modalOpen" @did-dismiss="closeModal">
      <ion-header>
        <ion-toolbar class="recare-toolbar">
          <ion-title>Inspectie uitvoeren</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeModal">Sluiten</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content v-if="selectedInspection">
        <div class="modal-header">
          <p class="modal-address">{{ selectedInspection.propertyAddress }}</p>
          <p class="modal-date">{{ formatDate(selectedInspection.inspectionDate) }}</p>
        </div>

        <!-- Aangevinkte categorieën voor deze inspectie -->
        <div class="modal-card">
          <ion-list lines="none">
            <ion-item v-if="hasType(selectedInspection, 'damage')" button detail @click="openType('schade')">
              <ion-label>
                <div class="item-title">Schade opnemen</div>
                <div class="item-subtitle">Schade registreren en vastleggen</div>
              </ion-label>
            </ion-item>
            <ion-item v-if="hasType(selectedInspection, 'maintenance')" button detail @click="openType('onderhoud')">
              <ion-label>
                <div class="item-title">Achterstallig onderhoud opnemen</div>
                <div class="item-subtitle">Onderhoud, kostenindicatie, urgentie</div>
              </ion-label>
            </ion-item>
            <ion-item v-if="hasType(selectedInspection, 'technicalInstallations')" button detail @click="openType('installaties')">
              <ion-label>
                <div class="item-title">Technische installaties inspecteren</div>
                <div class="item-subtitle">Storingen, keuring, opmerkingen</div>
              </ion-label>
            </ion-item>
            <ion-item v-if="hasType(selectedInspection, 'modifications')" button detail @click="openType('modificaties')">
              <ion-label>
                <div class="item-title">Modificaties inventariseren</div>
                <div class="item-subtitle">Situatie, actie, documentatie</div>
              </ion-label>
            </ion-item>
          </ion-list>
        </div>

        <!-- Extra aandachtspunten zelf toevoegen (conform de case) -->
        <div class="extra-section">
          <p class="extra-title">Extra aandachtspunten toevoegen</p>
          <div class="extra-card">
            <ion-list lines="none">
              <ion-item v-if="!hasType(selectedInspection, 'damage')" button detail @click="openType('schade')">
                <ion-label><div class="item-title extra">Schade opnemen</div></ion-label>
              </ion-item>
              <ion-item v-if="!hasType(selectedInspection, 'maintenance')" button detail @click="openType('onderhoud')">
                <ion-label><div class="item-title extra">Achterstallig onderhoud opnemen</div></ion-label>
              </ion-item>
              <ion-item v-if="!hasType(selectedInspection, 'technicalInstallations')" button detail @click="openType('installaties')">
                <ion-label><div class="item-title extra">Technische installaties inspecteren</div></ion-label>
              </ion-item>
              <ion-item v-if="!hasType(selectedInspection, 'modifications')" button detail @click="openType('modificaties')">
                <ion-label><div class="item-title extra">Modificaties inventariseren</div></ion-label>
              </ion-item>
            </ion-list>
          </div>
        </div>

      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  IonPage, IonContent, IonList, IonItem, IonLabel, IonSpinner,
  IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
} from '@ionic/vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { useInspectionStore } from '@/stores/inspectionStore'
import type { Inspection, InspectionType } from '@/models/Inspection'

const router = useRouter()
const inspectionStore = useInspectionStore()
const selectedInspection = ref<Inspection | null>(null)
const modalOpen = ref(false)

const assignedInspections = computed(() =>
  [...inspectionStore.assignedReports].sort((a, b) =>
    a.inspectionDate.localeCompare(b.inspectionDate),
  ),
)

const typeLabels: Record<InspectionType, string> = {
  damage: 'Schade',
  maintenance: 'Onderhoud',
  technicalInstallations: 'Installaties',
  modifications: 'Modificaties',
}

function formatTypes(types?: InspectionType[]): string {
  if (!types || types.length === 0) return 'Algemene inspectie'
  return types.map((t) => typeLabels[t]).join(' · ')
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('nl-NL')
}

function hasType(inspection: Inspection, type: InspectionType): boolean {
  return inspection.inspectionTypes?.includes(type) ?? false
}

function selectInspection(inspection: Inspection) {
  selectedInspection.value = inspection
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
  selectedInspection.value = null
}

function openType(type: 'schade' | 'onderhoud' | 'installaties' | 'modificaties') {
  closeModal()
  router.push(`/tabs/assigned/${type}`)
}
</script>

<style scoped>
.page-wrapper {
  padding: 20px 16px;
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
  text-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.empty-card {
  background: rgba(255,255,255,0.9);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
}

.empty-text {
  margin: 0;
  font-size: 15px;
  color: rgba(20, 27, 31, 0.6);
}

.inspection-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.inspection-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 14px 40px 14px 16px;
  position: relative;
  cursor: pointer;
  border-left: 4px solid rgb(0, 170, 162);
  box-shadow:
    0 8px 20px rgba(20, 27, 31, 0.08),
    0 2px 6px rgba(20, 27, 31, 0.05);
  transition: transform 120ms ease;
}

.inspection-card:active {
  transform: scale(0.98);
}

.inspection-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 6px;
}

.inspection-address {
  font-size: 15px;
  font-weight: 600;
  color: rgb(20, 27, 31);
}

.inspection-date {
  font-size: 12px;
  color: rgba(20, 27, 31, 0.55);
  white-space: nowrap;
}

.inspector-name {
  display: block;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.65);
}

.inspection-types {
  display: block;
  font-size: 12px;
  color: rgb(0, 170, 162);
  font-weight: 500;
  margin-top: 2px;
}

.card-arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: rgba(20, 27, 31, 0.3);
}

.modal-header {
  padding: 20px 16px 12px 16px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.modal-address {
  margin: 0 0 4px 0;
  font-size: 17px;
  font-weight: 600;
  color: rgb(20, 27, 31);
}

.modal-date {
  margin: 0;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.55);
}

.modal-card {
  margin: 12px 16px 0 16px;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 8px 20px rgba(20, 27, 31, 0.08),
    0 2px 6px rgba(20, 27, 31, 0.05);
}

.extra-section {
  margin: 20px 16px 0 16px;
}

.extra-title {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.55);
  font-weight: 500;
}

.extra-card {
  background: #f5f5f5;
  border-radius: 16px;
  overflow: hidden;
}

.item-title {
  font-weight: 600;
  color: rgb(20, 27, 31);
}

.item-title.extra {
  font-weight: 400;
  color: rgba(20, 27, 31, 0.6);
}

.item-subtitle {
  margin-top: 3px;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.55);
}
</style>