// src/pages/register/[qrId].tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export default function RegisterPage() {
  const { qrId } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [dimension, setDimension] = useState('')
  const [year, setYear] = useState('')
  const [medium, setMedium] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('artworks').insert([
      {
        qr_id: qrId,
        title,
        artist_name: artist,
        dimension,
        year,
        medium,
      },
    ])

    setLoading(false)

    if (!error) {
      navigate(`/artwork/${qrId}`)
    } else {
      alert('Error saving: ' + error.message)
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register New Artwork</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ['Title', title, setTitle],
          ['Artist Name', artist, setArtist],
          ['Dimensions', dimension, setDimension],
          ['Year', year, setYear],
          ['Medium', medium, setMedium],
        ].map(([label, value, setValue]) => (
          <div key={label}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              type="text"
              value={value as string}
              onChange={(e) => (setValue as any)(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
              required={label !== 'Year' && label !== 'Medium'}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Registering…' : 'Register'}
        </button>
      </form>
    </div>
  )
}

