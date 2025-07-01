'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function TransferConfirmPage({ params }: { params: { qrId: string } }) {
  const [newOwnerEmail, setNewOwnerEmail] = useState('')
  const [artwork, setArtwork] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchArtwork = async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('qr_id', params.qrId)
        .single()

      if (error) {
        console.error('Artwork not found:', error)
      } else {
        setArtwork(data)
      }
      setLoading(false)
    }

    fetchArtwork()
  }, [params.qrId])

  const handleTransfer = async () => {
    setLoading(true)

    const { error } = await supabase.from('ownerships').insert([
      {
        qr_id: params.qrId,
        new_owner_email: newOwnerEmail,
        confirmed: true,
      },
    ])

    setLoading(false)

    if (error) {
      alert('Transfer failed: ' + error.message)
    } else {
      alert('Ownership transferred!')
      router.push(`/artwork/${params.qrId}`)
    }
  }

  if (loading) return <div className="p-6">Loading...</div>

  re

