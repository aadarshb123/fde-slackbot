import type { Theme } from '../types'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  theme: Theme
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  theme,
  onPageChange
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 7

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
      marginTop: '48px',
      paddingBottom: '24px'
    }}>
      {/* Showing X-Y of Z */}
      <div style={{
        fontSize: '14px',
        color: theme.textSecondary,
        fontWeight: '600'
      }}>
        Showing {startItem}-{endItem} of {totalItems} issues
      </div>

      {/* Pagination controls */}
      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: '10px 16px',
            backgroundColor: theme.cardBg,
            border: `2px solid ${theme.border}`,
            borderRadius: '10px',
            color: currentPage === 1 ? theme.textSecondary : theme.text,
            fontSize: '14px',
            fontWeight: '700',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            opacity: currentPage === 1 ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.backgroundColor = theme.hover
              e.currentTarget.style.transform = 'translateY(-2px)'
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.backgroundColor = theme.cardBg
              e.currentTarget.style.transform = 'translateY(0)'
            }
          }}
        >
          ← Previous
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                style={{
                  padding: '10px 8px',
                  color: theme.textSecondary,
                  fontSize: '14px',
                  fontWeight: '700'
                }}
              >
                ...
              </span>
            )
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              style={{
                padding: '10px 16px',
                backgroundColor: currentPage === page ? theme.accent : theme.cardBg,
                border: currentPage === page ? 'none' : `2px solid ${theme.border}`,
                borderRadius: '10px',
                color: currentPage === page ? '#FFFFFF' : theme.text,
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: '44px',
                boxShadow: currentPage === page
                  ? '0 4px 6px -1px rgba(99, 102, 241, 0.3), 0 2px 4px -1px rgba(99, 102, 241, 0.2)'
                  : 'none'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.backgroundColor = theme.hover
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.backgroundColor = theme.cardBg
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              {page}
            </button>
          )
        })}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: '10px 16px',
            backgroundColor: theme.cardBg,
            border: `2px solid ${theme.border}`,
            borderRadius: '10px',
            color: currentPage === totalPages ? theme.textSecondary : theme.text,
            fontSize: '14px',
            fontWeight: '700',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            opacity: currentPage === totalPages ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.backgroundColor = theme.hover
              e.currentTarget.style.transform = 'translateY(-2px)'
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.backgroundColor = theme.cardBg
              e.currentTarget.style.transform = 'translateY(0)'
            }
          }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
