// The backend API. In development it's the local backend (cd backend && yarn dev). For the deployed site,
// set VITE_API_URL to the deployed API's URL, e.g. in Vercel → Settings → Environment Variables.
const apiUrl: string = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, { signal })
  if (!response.ok) throw new Error(`GET ${path} failed with ${response.status}`)
  return response.json()
}
