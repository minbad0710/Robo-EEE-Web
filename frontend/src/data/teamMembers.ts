import { useEffect, useState } from 'react'
import { getJson } from '../utils/api'

// One document per person per department per academic year, from the backend (GET /api/team-members).
// Department heads have one in 'leads' and one in their own department. The year list on the Team page is
// built from `year`.
export type TeamMember = {
  _id: string
  year: string // academic year, e.g. 'AY26/27'
  department: string // `id` from teamDepartments in site.ts, or 'advisors' for the Advisors section
  name: string
  role: string
  photo?: string // Cloudinary image URL — default avatar if empty
  // Profile links; each icon only shows when its link is set
  github?: string
  linkedin?: string
  website?: string
}

export type TeamMembersState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; members: TeamMember[] }

// Loads every member (all years, advisors included) once, in the order the cards appear
export function useTeamMembers(): TeamMembersState {
  const [state, setState] = useState<TeamMembersState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    getJson<TeamMember[]>('/team-members', controller.signal)
      .then((members) => setState({ status: 'ready', members }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error' })
      })
    return () => controller.abort()
  }, [])

  return state
}
