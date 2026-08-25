'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'

export default function AdminResponses({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const [responses, setResponses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [trainingTitle, setTrainingTitle] = useState('')
  const [trainingId, setTrainingId] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    async function unwrapParams() {
      const { id } = await params
      setTrainingId(id)
      fetchTrainingData(id)
      fetchResponses(id)
    }
    unwrapParams()
  }, [params])

  const fetchTrainingData = async (id: string) => {
    try {
      const res = await fetch('/api/content/trainings')
      const data = await res.json()
      const training = data.find((t: any) => t.id === id)
      if (training) {
        setTrainingTitle(training.title)
      }
    } catch (error) {
      console.error('Failed to fetch training:', error)
    }
  }

  const fetchResponses = async (id: string) => {
    try {
      const res = await fetch(`/api/content/trainings/${id}/responses`)
      const data = await res.json()
      setResponses(data.responses || [])
    } catch (error) {
      console.error('Failed to fetch responses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadCSV = () => {
    if (!trainingId) return
    window.open(`/api/content/trainings/${trainingId}/responses?format=csv`)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--gold)',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const firstData = responses[0]?.data || {}
  const headers = Object.keys(firstData)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '24px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href={`/admin/trainings/${trainingId}/form`} style={{ color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowLeft size={16} /> Back to Form
            </Link>
            <h1 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)', margin: 0 }}>
              Responses: {trainingTitle || 'Training'}
            </h1>
          </div>
          {responses.length > 0 && (
            <button
              onClick={handleDownloadCSV}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: 'rgba(34, 197, 94, 0.1)',
                color: '#22c55e',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <Download size={18} />
              Download CSV
            </button>
          )}
        </div>

        <div style={{
          background: 'var(--white)',
          padding: '16px 20px',
          borderRadius: '12px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
            📊 Total Responses:
          </span>
          <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--gold)' }}>
            {responses.length}
          </span>
        </div>

        {responses.length === 0 ? (
          <div style={{
            background: 'var(--white)',
            padding: '60px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
            <h3 style={{ font: '400 24px Georgia, serif', color: 'var(--primary)', margin: 0 }}>No Responses Yet</h3>
            <p style={{ color: 'var(--muted)', marginTop: '4px' }}>Share the registration form to start collecting responses.</p>
          </div>
        ) : (
          <div style={{
            background: 'var(--white)',
            borderRadius: '12px',
            overflow: 'auto',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--primary)' }}>#</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--primary)' }}>Submitted At</th>
                  {headers.map((header) => (
                    <th key={header} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--primary)' }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {responses.map((response, index) => (
                  <tr key={response.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>{index + 1}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: '13px' }}>
                      {new Date(response.submitted_at).toLocaleString()}
                    </td>
                    {headers.map((header) => (
                      <td key={header} style={{ padding: '12px 16px', maxWidth: '200px', wordBreak: 'break-word' }}>
                        {response.data[header] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}