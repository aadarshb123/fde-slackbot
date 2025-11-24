import { TIME_FILTERS } from '../types'
import type { TimeFilter, Theme } from '../types'

interface TimeFilterProps {
  selectedTimeFilter: TimeFilter
  darkMode: boolean
  theme: Theme
  onTimeFilterChange: (filter: TimeFilter) => void
}

export default function TimeFilterComponent({
  selectedTimeFilter,
  darkMode,
  theme,
  onTimeFilterChange
}: TimeFilterProps) {
  return (
    <div style={{
      backgroundColor: theme.cardBg,
      padding: '24px 32px',
      borderRadius: '16px',
      marginBottom: '32px',
      border: `1px solid ${theme.border}`,
      boxShadow: darkMode
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }}>
      <div style={{
        fontSize: '16px',
        fontWeight: '700',
        color: theme.text,
        marginBottom: '20px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        Filter by Time
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {TIME_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onTimeFilterChange(filter.value)}
            style={{
              padding: '12px 28px',
              backgroundColor: selectedTimeFilter === filter.value ? theme.accent : 'transparent',
              color: selectedTimeFilter === filter.value ? '#FFFFFF' : theme.text,
              border: selectedTimeFilter === filter.value ? 'none' : `2px solid ${theme.border}`,
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedTimeFilter === filter.value
                ? '0 4px 6px -1px rgba(99, 102, 241, 0.3), 0 2px 4px -1px rgba(99, 102, 241, 0.2)'
                : 'none'
            }}
            onMouseEnter={(e) => {
              if (selectedTimeFilter !== filter.value) {
                e.currentTarget.style.backgroundColor = theme.hover
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTimeFilter !== filter.value) {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}
