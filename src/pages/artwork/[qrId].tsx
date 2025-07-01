
// src/pages/artwork/[qrId].tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export default function ArtworkDetailPage() {
  const { qrId } = useParams()
  const [artwork, setArtwork] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArtwork = async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('qr_id', qrId)
        .single()

      if (!error) setArtwork(data)
      setLoading(false)
    }

    fetchArtwork()
  }, [qrId])

  if (loading) return <p className="p-6">Loading artwork...</p>
  if (!artwork) return <p className="p-6">Artwork not found.</p>

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{artwork.title}</h1>
      <p><strong>Artist:</strong> {artwork.artist_name}</p>
      <p><strong>Dimensions:</strong> {artwork.dimension}</p>
      <p><strong>Year:</strong> {artwork.year || '—'}</p>
      <p><strong>Medium:</strong> {artwork.medium || '—'}</p>
      <p><strong>QR ID:</strong> {artwork.qr_id}</p>
    </div>
  )
}
