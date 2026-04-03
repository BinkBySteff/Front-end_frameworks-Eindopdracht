import { defineStore } from 'pinia'
import type { Inspection } from '@/models/Inspection'
import { fetchInspections } from '@/services/inspectionService'

export const useInspectionStore = defineStore('inspection', {
  state: () => ({
    assignedReports: [] as Inspection[],
    completedReports: [] as Inspection[],
    loading: false,
    loaded: false,
    error: '',
  }),

  actions: {
    setAssignedReports(reports: Inspection[]) {
      this.assignedReports = reports
    },

    setCompletedReports(reports: Inspection[]) {
      this.completedReports = reports
    },

    // Altijd API aanroepen bij app-start via App.vue
    async loadFromApi() {
      this.loading = true
      this.error = ''
      try {
        const inspections = await fetchInspections()
        this.assignedReports = inspections.filter((i) => i.status === 'inProgress')
        this.completedReports = inspections.filter((i) => i.status === 'completed')
        this.loaded = true
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Fout bij ophalen inspecties.'
      } finally {
        this.loading = false
      }
    },
  },
})