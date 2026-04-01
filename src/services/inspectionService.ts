import type { Inspection } from '@/models/Inspection'

const API_URL =
  'https://my-json-server.typicode.com/BinkBySteff/Front-end_frameworks-Eindopdracht/inspections'

export async function fetchInspections(): Promise<Inspection[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`Failed to fetch inspections: ${response.status}`)
  }

  const data = (await response.json()) as Inspection[]
  return data
}