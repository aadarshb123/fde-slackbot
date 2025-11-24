import type { Toast, Theme } from '../types'
import { getCategoryColor } from '../utils'

interface ToastContainerProps {
  toasts: Toast[]
  darkMode: boolean
  theme: Theme
  onDismiss: (id: string) => void
}

export default function ToastContainer({
  toasts,
  darkMode,
  theme,
  onDismiss
}: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div style={{
      position: 'fixed',
      top: '24px',
      right: '24px',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '400px'
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            backgroundColor: theme.cardBg,
            padding: '20px 24px',
            borderRadius: '12px',
            border: `2px solid ${getCategoryColor(toast.category, darkMode)}`,
            boxShadow: darkMode
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            animation: 'slideIn 0.3s ease-out',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onClick={() => onDismiss(toast.id)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-4px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'start',
            gap: '12px'
          }}>
            <div style={{
              fontSize: '24px',
              lineHeight: '1'
            }}>
              🔔
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '700',
                color: theme.text,
                marginBottom: '4px'
              }}>
                New {toast.category} issue
              </div>
              <div style={{
                fontSize: '13px',
                color: theme.textSecondary,
                lineHeight: '1.4',
                fontWeight: '500'
              }}>
                {toast.title}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDismiss(toast.id)
              }}
              style={{
                background: 'none',
                border: 'none',
                color: theme.textSecondary,
                cursor: 'pointer',
                fontSize: '18px',
                padding: '0',
                lineHeight: '1',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.text
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.textSecondary
              }}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
