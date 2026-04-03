import type { Inspection } from '@/models/Inspection'

const API_URL = 'https://api.jsonbin.io/v3/b/69cd5fa4856a682189ee3e9d/latest'
const API_KEY = '$2a$10$2bg4/XrdG60O6DWH6GQSc.RkKjh5E.rCb7i3f0OwcL7m/xb4f6xLu'

export async function fetchInspections(): Promise<Inspection[]> {
  const response = await fetch(API_URL, {
    headers: {
      'X-Master-Key': API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch inspections: ${response.status}`)
  }

  const json = await response.json()

  // JSONBin geeft data terug als { record: { inspections: [...] } }
  return json.record.inspections as Inspection[]
}