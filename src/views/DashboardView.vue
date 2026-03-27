<template>
  <ion-page>
    <AppHeader title="Dashboard - Real Estate Care" />

    <ion-content class="recare-bg recare-tiles recare-dashboard" fullscreen>
      <div class="dashboard-logo-wrapper">
        <img src="/src/assets/Logo-Dashboard.png" alt="Dashboard Logo" class="dashboard-logo" />
      </div>

      <div class="recare-tiles-grid">
        <a class="recare-tile-link" href="/tabs/assigned">
          <div class="recare-tile tile-toegewezen">
            <div class="recare-tile-content">
              <h3 class="recare-tile-title">Toegewezen</h3>
              <p class="recare-tile-subtitle">{{ assignedCount }} openstaande inspecties</p>
            </div>
          </div>
        </a>

        <a class="recare-tile-link" href="/tabs/completed">
          <div class="recare-tile tile-uitgevoerd">
            <div class="recare-tile-content">
              <h3 class="recare-tile-title">Uitgevoerd</h3>
              <p class="recare-tile-subtitle">{{ completedCount }} afgerond</p>
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
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue'
import { onMounted, computed } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import { fetchInspections } from '@/services/inspectionService'
import { useInspectionStore } from '@/stores/inspectionStore'

const inspectionStore = useInspectionStore()

function isCompletedStatus(status: unknown) {
  const value = String(status ?? '').toLowerCase()
  return (
    value === 'completed' ||
    value === 'uitgevoerd' ||
    value === 'afgerond' ||
    value === 'voltooid'
  )
}

async function loadInspections() {
  try {
    const inspections = await fetchInspections()

    const assigned = inspections.filter(
      (inspection) => !isCompletedStatus(inspection.status)
    )

    const completed = inspections.filter(
      (inspection) => isCompletedStatus(inspection.status)
    )

    inspectionStore.setAssignedReports(assigned)
    inspectionStore.setCompletedReports(completed)
  } catch (error) {
    console.error('Fout bij ophalen inspecties:', error)
  }
}

const assignedCount = computed(() => inspectionStore.assignedReports.length)
const completedCount = computed(() => inspectionStore.completedReports.length)

onMounted(() => {
  loadInspections()
})
</script>

<style scoped>
.dashboard-logo-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 18px;
  margin-bottom: 14px;
}

.dashboard-logo {
  width: 110px;
  height: auto;
  filter: drop-shadow(0px 16px 25px rgba(0, 0, 0, 0.28))
    drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.18));
  transform: translateY(0);
}

.tile-toegewezen {
  background-image: url('/src/assets/Toegewezen.png');
}

.tile-uitgevoerd {
  background-image: url('/src/assets/Uitgevoerd.png');
}

.tile-kennisbank {
  background-image: url('/src/assets/Kennisbank.png');
}

.tile-instellingen {
  background-image: url('/src/assets/Instellingen.png');
}
</style>