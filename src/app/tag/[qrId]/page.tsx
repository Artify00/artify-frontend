'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function TagLanding({ params }: { params: { qrId: string } }) {
  const router = useRouter()

  useEffect(() => {
    const checkQR = async () => {
      const { data: artwork } = await supabase
        .from('artworks')
        .select('qr_id')
        .eq('qr_id', params.qrId)
        .maybeSingle()

      if (artwork) {
        // Optionally check for pending transfer too
        router.push(`/artwork/${params.qrId}`)
      } else {
        router.push(`/register/${params.qrId}`)
      }
    }

    checkQR()
  }, [params.qrId, router])

  return <div className="p-6">Checking QR tag…</div>
}


