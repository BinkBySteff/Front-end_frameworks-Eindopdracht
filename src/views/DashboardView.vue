<template>
  <ion-page>
    <AppHeader title="Dashboard - Real Estate Care" />

    <ion-content
      class="recare-bg recare-dashboard-page"
      fullscreen
      :scroll-y="false"
    >
      <div class="dashboard-shell">
        <div class="dashboard-top-spacer"></div>

        <div class="recent-inspections-panel">
          <div class="recent-panel-header">
            <h2 class="recent-panel-title">Recente inspecties</h2>
            <p class="recent-panel-subtitle">Laatst afgeronde rapportages</p>
          </div>

          <div v-if="recentInspections.length > 0" class="recent-panel-list">
            <button
              v-for="inspection in recentInspections"
              :key="inspection.id"
              type="button"
              class="recent-panel-item"
              @click="openCompletedReports"
            >
              <span class="recent-panel-address">
                {{ inspection.propertyAddress }}
              </span>
              <span class="recent-panel-date">
                {{ formatDate(inspection.inspectionDate) }}
              </span>
            </button>
          </div>

          <p v-else class="recent-panel-empty">
            Er zijn nog geen recente inspecties.
          </p>
        </div>

        <div class="dashboard-tiles-section">
          <div class="recare-tiles-grid">
            <a class="recare-tile-link" href="/tabs/assigned">
              <div class="recare-tile tile-toegewezen">
                <div class="recare-tile-content">
                  <h3 class="recare-tile-title">Toegewezen</h3>
                  <p class="recare-tile-subtitle">
                    {{ assignedCount }} openstaande inspecties
                  </p>
                </div>
              </div>
            </a>

            <a class="recare-tile-link" href="/tabs/completed">
              <div class="recare-tile tile-uitgevoerd">
                <div class="recare-tile-content">
                  <h3 class="recare-tile-title">Uitgevoerd</h3>
                  <p class="recare-tile-subtitle">
                    {{ completedCount }} afgerond
                  </p>
                </div>
              </div>
            </a>

            <a class="recare-tile-link" href="/tabs/knowledge">
              <div class="recare-tile tile-kennisbank">
                <div class="recare-tile-content">
                  <h3 class="recare-tile-title">Kennisbank</h3>
                  <p class="recare-tile-subtitle">
                    Tips en documentatie
                  </p>
                </div>
              </div>
            </a>

            <a class="recare-tile-link" href="/tabs/settings">
              <div class="recare-tile tile-instellingen">
                <div class="recare-tile-content">
                  <h3 class="recare-tile-title">Instellingen</h3>
                  <p class="recare-tile-subtitle">
                    App-voorkeuren
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue'
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { fetchInspections } from '@/services/inspectionService'
import { useInspectionStore } from '@/stores/inspectionStore'

const router = useRouter()
const inspectionStore = useInspectionStore()

async function loadInspections() {
  try {
    const inspections = await fetchInspections()

    const assigned = inspections.filter(
      (inspection) => inspection.status === 'inProgress'
    )

    const completed = inspections.filter(
      (inspection) => inspection.status === 'completed'
    )

    inspectionStore.setAssignedReports(assigned)
    inspectionStore.setCompletedReports(completed)
  } catch (error) {
    console.error('Fout bij ophalen inspecties:', error)
  }
}

const assignedCount = computed(() => inspectionStore.assignedReports.length)
const completedCount = computed(() => inspectionStore.completedReports.length)

const recentInspections = computed(() =>
  inspectionStore.completedReports
    .slice()
    .sort((a, b) => b.inspectionDate.localeCompare(a.inspectionDate))
    .slice(0, 2)
)

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('nl-NL')
}

function openCompletedReports() {
  router.push('/tabs/completed')
}

onMounted(() => {
  loadInspections()
})
</script>

<style scoped>
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