import { CATEGORIES } from '../types'
import type { CategoryFilter, IssueGroup, Theme } from '../types'

interface CategoryFilterProps {
  selectedCategory: CategoryFilter
  issueGroups: IssueGroup[]
  darkMode: boolean
  theme: Theme
  onCategoryChange: (category: CategoryFilter) => void
}

export default function CategoryFilterComponent({
  selectedCategory,
  issueGroups,
  darkMode,
  theme,
  onCategoryChange
}: CategoryFilterProps) {
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
        Filter by Category
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            style={{
              padding: '12px 28px',
              backgroundColor: selectedCategory === category ? theme.accent : 'transparent',
              color: selectedCategory === category ? '#FFFFFF' : theme.text,
              border: selectedCategory === category ? 'none' : `2px solid ${theme.border}`,
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.2s ease',
              boxShadow: selectedCategory === category
                ? '0 4px 6px -1px rgba(99, 102, 241, 0.3), 0 2px 4px -1px rgba(99, 102, 241, 0.2)'
                : 'none'
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.backgroundColor = theme.hover
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            {category}
            {category !== 'all' && ` (${issueGroups.filter(g => g.category === category).length})`}
          </button>
        ))}
      </div>
    </div>
  )
}
