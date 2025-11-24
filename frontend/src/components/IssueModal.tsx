import type { IssueGroup, Message, Theme } from '../types'
import { getCategoryColor, getSlackLink } from '../utils'

interface IssueModalProps {
  selectedGroup: IssueGroup
  groupMessages: Message[]
  loadingMessages: boolean
  darkMode: boolean
  theme: Theme
  onClose: () => void
  onToggleStatus: (groupId: string, currentStatus: string) => void
}

export default function IssueModal({
  selectedGroup,
  groupMessages,
  loadingMessages,
  darkMode,
  theme,
  onClose,
  onToggleStatus
}: IssueModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: theme.cardBg,
          padding: '40px',
          borderRadius: '24px',
          maxWidth: '900px',
          maxHeight: '85vh',
          overflow: 'auto',
          width: '100%',
          boxShadow: darkMode
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: `1px solid ${theme.border}`
        }}
      >
        {/* Modal header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: `${getCategoryColor(selectedGroup.category, darkMode)}20`,
              color: getCategoryColor(selectedGroup.category, darkMode),
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {selectedGroup.category}
            </div>

            <button
              onClick={() => onToggleStatus(selectedGroup.id, selectedGroup.status)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: selectedGroup.status === 'open' ? '#10B98120' : theme.accent + '20',
                color: selectedGroup.status === 'open' ? '#10B981' : theme.accent,
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span>{selectedGroup.status === 'open' ? '✓' : '↻'}</span>
              <span>{selectedGroup.status === 'open' ? 'Mark Resolved' : 'Reopen'}</span>
            </button>
          </div>

          <h2 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: theme.text,
            margin: '0 0 12px 0',
            lineHeight: '1.3'
          }}>
            {selectedGroup.title}
          </h2>

          <p style={{
            fontSize: '16px',
            color: theme.textSecondary,
            margin: 0,
            lineHeight: '1.6'
          }}>
            {selectedGroup.summary}
          </p>
        </div>

        <div style={{
          height: '1px',
          backgroundColor: theme.border,
          margin: '32px 0'
        }} />

        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: theme.text,
          marginBottom: '24px'
        }}>
          Messages ({groupMessages.length})
        </h3>

        {loadingMessages ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: theme.textSecondary,
            fontSize: '16px'
          }}>
            Loading messages...
          </div>
        ) : groupMessages.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: theme.textSecondary,
            fontSize: '16px'
          }}>
            No messages in this group
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {groupMessages.map((message) => (
              <div
                key={message.id}
                style={{
                  backgroundColor: darkMode ? '#0F172A' : '#F8FAFC',
                  padding: '24px',
                  borderRadius: '12px',
                  border: `1px solid ${theme.border}`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '12px'
                }}>
                  <div>
                    <div style={{
                      fontWeight: '700',
                      color: theme.text,
                      fontSize: '15px',
                      marginBottom: '4px'
                    }}>
                      {message.user_name}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: theme.textSecondary,
                      fontWeight: '600'
                    }}>
                      #{message.channel_name}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: theme.textSecondary,
                    fontWeight: '600'
                  }}>
                    {new Date(message.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <p style={{
                  fontSize: '15px',
                  color: theme.text,
                  margin: '0 0 12px 0',
                  lineHeight: '1.6',
                  fontWeight: '500'
                }}>
                  {message.text}
                </p>

                <div style={{
                  fontSize: '13px',
                  color: theme.textSecondary,
                  fontStyle: 'italic',
                  marginBottom: '8px'
                }}>
                  Summary: {message.summary}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    backgroundColor: theme.accent + '20',
                    color: theme.accent,
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    {(message.confidence * 100).toFixed(0)}% confidence
                  </div>
                  <a
                    href={getSlackLink(message.channel_id, message.timestamp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      backgroundColor: darkMode ? '#1E293B' : '#FFFFFF',
                      border: `1px solid ${theme.border}`,
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '700',
                      color: theme.accent,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme.accent + '20'
                      e.currentTarget.style.borderColor = theme.accent
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = darkMode ? '#1E293B' : '#FFFFFF'
                      e.currentTarget.style.borderColor = theme.border
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 127 127" fill="currentColor">
                      <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z"/>
                      <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z"/>
                      <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z"/>
                      <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z"/>
                    </svg>
                    <span>View in Slack</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: '32px',
            padding: '14px 32px',
            backgroundColor: theme.accent,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            width: '100%',
            boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.3), 0 2px 4px -1px rgba(99, 102, 241, 0.2)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(99, 102, 241, 0.4), 0 4px 6px -2px rgba(99, 102, 241, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(99, 102, 241, 0.3), 0 2px 4px -1px rgba(99, 102, 241, 0.2)'
          }}
        >
          Close
        </button>
      </div>
    </div>
  )
}
