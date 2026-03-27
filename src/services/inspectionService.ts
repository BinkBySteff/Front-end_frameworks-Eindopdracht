import type { Inspection } from '@/models/Inspection'

// Mockup API middels MyJSONServer
const API_URL = 'https://my-json-server.typicode.com/BinkBySteff/Feedbackopdracht-3-LOI-/inspections'

export async function fetchInspections(): Promise<Inspection[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`Failed to fetch inspections: ${response.status}`)
  }

  const data = (await response.json()) as Inspection[]
  return data
}