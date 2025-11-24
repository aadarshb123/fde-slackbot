export interface IssueGroup {
  id: string
  title: string
  summary: string
  category: string
  status: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  text: string
  user_name: string
  channel_name: string
  channel_id: string
  timestamp: string
  summary: string
  confidence: number
}

export const CATEGORIES = ['all', 'support', 'bug', 'feature', 'question'] as const

export const TIME_FILTERS = [
  { label: 'All time', value: 'all' },
  { label: 'Last 24 hours', value: '24h' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
] as const

export type CategoryFilter = typeof CATEGORIES[number]
export type TimeFilter = typeof TIME_FILTERS[number]['value']

export interface Toast {
  id: string
  title: string
  category: string
}

export interface Theme {
  bg: string
  cardBg: string
  text: string
  textSecondary: string
  border: string
  hover: string
  accent: string
}
