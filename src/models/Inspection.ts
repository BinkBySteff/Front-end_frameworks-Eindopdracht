export type InspectionStatus = 'completed' | 'inProgress' | 'cancelled'

export type InspectionType =
  | 'damage'
  | 'maintenance'
  | 'technicalInstallations'
  | 'modifications'

export interface DamageReport {
  location: string
  damageType: string
  urgentAction: boolean
  description: string
}

export interface MaintenanceReport {
  location: string
  maintenanceType: string
  urgentAction: boolean
  costEstimate: string
}

export interface TechnicalInstallationReport {
  location: string
  installationType: string
  approved: boolean
  remarks: string
}

export interface ModificationReport {
  location: string
  modificationType: string
  approved: boolean
  remarks: string
}

export interface Inspection {
  id: number
  propertyAddress: string
  inspectorName: string
  inspectionDate: string
  status: InspectionStatus
  inspectionTypes?: InspectionType[]
  notes?: string
  damageReport?: DamageReport
  maintenanceReport?: MaintenanceReport
  technicalInstallationReport?: TechnicalInstallationReport
  modificationReport?: ModificationReport
  photos?: string[]
}