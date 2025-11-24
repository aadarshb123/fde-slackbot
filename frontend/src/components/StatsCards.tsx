import type { IssueGroup, Theme } from '../types'

interface StatsCardsProps {
  issueGroups: IssueGroup[]
  darkMode: boolean
  theme: Theme
}

export default function StatsCards({ issueGroups, darkMode, theme }: StatsCardsProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '24px',
      marginBottom: '48px'
    }}>
      <div style={{
        backgroundColor: theme.cardBg,
        padding: '32px',
        borderRadius: '16px',
        border: `1px solid ${theme.border}`,
        boxShadow: darkMode
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}>
        <div style={{ fontSize: '48px', fontWeight: '800', color: theme.accent, marginBottom: '8px' }}>
          {issueGroups.length}
        </div>
        <div style={{ fontSize: '16px', color: theme.textSecondary, fontWeight: '600' }}>
          Total Groups
        </div>
      </div>

      <div style={{
        backgroundColor: theme.cardBg,
        padding: '32px',
        borderRadius: '16px',
        border: `1px solid ${theme.border}`,
        boxShadow: darkMode
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}>
        <div style={{ fontSize: '48px', fontWeight: '800', color: '#EF4444', marginBottom: '8px' }}>
          {issueGroups.filter(g => g.category === 'bug').length}
        </div>
        <div style={{ fontSize: '16px', color: theme.textSecondary, fontWeight: '600' }}>
          Bug Reports
        </div>
      </div>

      <div style={{
        backgroundColor: theme.cardBg,
        padding: '32px',
        borderRadius: '16px',
        border: `1px solid ${theme.border}`,
        boxShadow: darkMode
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}>
        <div style={{ fontSize: '48px', fontWeight: '800', color: '#10B981', marginBottom: '8px' }}>
          {issueGroups.filter(g => g.status === 'open').length}
        </div>
        <div style={{ fontSize: '16px', color: theme.textSecondary, fontWeight: '600' }}>
          Open Issues
        </div>
      </div>
    </div>
  )
}
