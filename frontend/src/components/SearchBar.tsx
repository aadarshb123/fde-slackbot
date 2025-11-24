import type { Theme } from '../types'

interface SearchBarProps {
  searchQuery: string
  darkMode: boolean
  theme: Theme
  onSearchChange: (query: string) => void
}

export default function SearchBar({ searchQuery, darkMode, theme, onSearchChange }: SearchBarProps) {
  return (
    <div style={{
      backgroundColor: theme.cardBg,
      padding: '20px 28px',
      borderRadius: '16px',
      marginBottom: '32px',
      border: `1px solid ${theme.border}`,
      boxShadow: darkMode
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search issues by title or summary..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 20px',
            backgroundColor: darkMode ? '#0F172A' : '#F8FAFC',
            border: `2px solid ${theme.border}`,
            borderRadius: '12px',
            fontSize: '16px',
            color: theme.text,
            outline: 'none',
            transition: 'all 0.2s ease',
            fontWeight: '500',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = theme.accent
            e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accent}20`
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = theme.border
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: theme.textSecondary,
              cursor: 'pointer',
              fontSize: '20px',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.hover
              e.currentTarget.style.color = theme.text
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = theme.textSecondary
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
