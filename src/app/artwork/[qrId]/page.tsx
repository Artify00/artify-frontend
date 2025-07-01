
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ArtworkDetail({ params }: { params: { qrId: string } }) {
  const [artwork, setArtwork] = useState<any>(null)

  useEffect(() => {
    const fetchArtwork = async () => {
      const { data } = await supabase
        .from('artworks')
        .select('*')
        .eq('qr_id', params.qrId)
        .maybeSingle()

      setArtwork(data)
    }

    fetchArtwork()
  }, [params.qrId])

  if (!artwork) {
    return <div className="p-6 text-center">Loading artwork details...</div>
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>
      <p className="text-lg mb-2"><strong>Artist:</strong> {artwork.artist_name}</p>
      <p className="text-lg mb-2"><strong>Dimensions:</strong> {artwork.dimension}</p>
      <p className="text-lg mb-2"><strong>Year:</strong> {artwork.year}</p>
      <p className="text-lg mb-2"><strong>Medium:</strong> {artwork.medium}</p>
      <p className="text-sm text-gray-500 mt-6">QR ID: {artwork.qr_id}</p>
    </div>
  )
}
