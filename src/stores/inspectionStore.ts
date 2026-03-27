import { defineStore } from 'pinia'
import type { Inspection } from '@/models/Inspection'

export const useInspectionStore = defineStore('inspection', {
  state: () => ({
    assignedReports: [] as Inspection[],
    completedReports: [] as Inspection[],
  }),

  actions: {
    setAssignedReports(reports: Inspection[]) {
      this.assignedReports = reports
    },

    setCompletedReports(reports: Inspection[]) {
      this.completedReports = reports
    },
  },
})