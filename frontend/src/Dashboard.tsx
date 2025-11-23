import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

interface IssueGroup {
  id: string
  title: string
  summary: string
  category: string
  status: string
  created_at: string
  updated_at: string
}

export default function Dashboard() {
  const [issueGroups, setIssueGroups] = useState<IssueGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchIssueGroups()
  }, [])

  async function fetchIssueGroups() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('issue_groups')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setIssueGroups(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading issue groups...</div>
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>FDE Dashboard - Issue Groups</h1>
      <p>Total Groups: {issueGroups.length}</p>

      <div style={{ marginTop: '20px' }}>
        {issueGroups.map((group) => (
          <div
            key={group.id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '5px'
            }}
          >
            <h3>{group.title}</h3>
            <p><strong>Category:</strong> {group.category}</p>
            <p><strong>Status:</strong> {group.status}</p>
            <p><strong>Summary:</strong> {group.summary}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Created: {new Date(group.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
