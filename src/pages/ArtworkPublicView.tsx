import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeftIcon, ClockIcon, MapPinIcon, CheckCircleIcon, ShareIcon } from 'lucide-react';
export const ArtworkPublicView = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const qrCode = queryParams.get('code') || 'Unknown QR Code';
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  // Simulate fetching artwork data based on QR code
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchArtworkData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Find matching artwork from mock data
        const foundArtwork = mockArtworks.find(art => {
          const artQRCode = `ART-${String(art.id).padStart(6, '0')}`;
          return artQRCode === qrCode;
        });
        console.log('QR Code:', qrCode);
        console.log('Available QR Codes:', mockArtworks.map(art => `ART-${String(art.id).padStart(6, '0')}`));
        if (foundArtwork) {
          // Record scan location (would be handled by the server in a real app)
          const newScan = {
            location: 'Current Location',
            timestamp: new Date().toLocaleString(),
            device: `${navigator.userAgent}`
          };
          // Update artwork with scan info
          setArtwork({
            ...foundArtwork,
            qrCode: qrCode,
            lastScanned: newScan
          });
        } else {
          setError('Artwork not found. This QR code may not be registered yet.');
        }
      } catch (err) {
        console.error('Error fetching artwork:', err);
        setError('Failed to load artwork information. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (qrCode) {
      fetchArtworkData();
    }
  }, [qrCode]);
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };
  const shareViaMethod = method => {
    alert(`Sharing via ${method} is not implemented in this demo`);
    setShowShareOptions(false);
  };
  if (loading) {
    return <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying artwork authenticity...</p>
        </div>
      </div>;
  }
  if (error) {
    return <div className="w-full min-h-screen bg-white">
        <header className="w-full py-4 px-6 bg-white border-b">
          <div className="max-w-4xl mx-auto">
            <Link to="/">
              <img src="/Artify_Logo_purple_clear.png" alt="Artify" className="h-10" />
            </Link>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="bg-red-50 p-6 rounded-lg inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              QR Code Not Recognized
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link to={`/register-artwork?code=${qrCode}`} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700">
              Register This Artwork
            </Link>
          </div>
        </main>
      </div>;
  }
  return <div className="w-full min-h-screen bg-white">
      <header className="w-full py-4 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <img src="/Artify_Logo_purple_clear.png" alt="Artify" className="h-10" />
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-green-50 p-4 rounded-lg mb-8 flex items-center">
          <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
          <div>
            <h2 className="font-medium text-green-800">
              Verified Authentic Artwork
            </h2>
            <p className="text-sm text-green-700">
              This artwork has been verified through Artify's authentication
              system
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Artwork Image */}
          <div className="md:w-1/2">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img src={artwork.image} alt={artwork.title} className="w-full h-auto object-cover" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <MapPinIcon className="h-4 w-4 mr-1" />
                <span>QR Code: {artwork.qrCode}</span>
              </div>
              <div className="relative">
                <button onClick={handleShare} className="flex items-center text-purple-600 hover:text-purple-800">
                  <ShareIcon className="h-5 w-5 mr-1" />
                  <span>Share</span>
                </button>
                {showShareOptions && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button onClick={() => shareViaMethod('Email')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Email
                      </button>
                      <button onClick={() => shareViaMethod('Twitter')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Twitter
                      </button>
                      <button onClick={() => shareViaMethod('Facebook')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Facebook
                      </button>
                      <button onClick={() => shareViaMethod('Copy Link')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Copy Link
                      </button>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
          {/* Artwork Details */}
          <div className="md:w-1/2">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900 mb-1">
                {artwork.artist}
              </h1>
              <p className="text-lg text-gray-800">
                {artwork.title}, {artwork.year}
              </p>
              <p className="text-gray-600">{artwork.medium}</p>
              {artwork.dimensions && <p className="text-gray-600">{artwork.dimensions}</p>}
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">
                About this Artwork
              </h3>
              <p className="text-gray-700">
                {artwork.description || 'No description available for this artwork.'}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-900 mb-2">
                Provenance & Verification
              </h3>
              <div className="mb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Verified by Artify
                    </p>
                    <p className="text-sm text-gray-500">
                      Registered on {artwork.registeredDate || 'Unknown date'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Last Authentication
                    </p>
                    <p className="text-sm text-gray-500">
                      {artwork.lastScanned ? artwork.lastScanned.timestamp : 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {artwork.lastScanned ? artwork.lastScanned.location : 'Unknown location'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/signup" className="block w-full bg-purple-600 text-white text-center py-3 px-4 rounded-md hover:bg-purple-700 transition duration-200">
                Create an Account to Collect Art
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
// Mock artwork data
const mockArtworks = [{
  id: 1,
  title: 'Sunset Dreams',
  artist: 'Sarah Chen',
  artistEmail: 'sarah@example.com',
  image: "/canvas_back.jpg",
  medium: 'Oil on Canvas',
  year: 2023,
  status: 'Verified',
  price: '$2,500',
  createdDate: 'Mar 15, 2023',
  registeredDate: 'Mar 20, 2023',
  description: "This piece explores the interplay between light and shadow, creating a dynamic visual experience that changes with the viewer's perspective. Inspired by coastal sunsets, it captures the fleeting beauty of twilight.",
  dimensions: '60cm × 80cm',
  owner: 'Sarah Chen'
}, {
  id: 2,
  title: 'Urban Reflections',
  artist: 'Sarah Chen',
  artistEmail: 'sarah@example.com',
  image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  medium: 'Acrylic on Canvas',
  year: 2022,
  status: 'Verified',
  price: '$1,800',
  createdDate: 'Apr 2, 2023',
  registeredDate: 'Apr 10, 2023',
  description: 'Urban Reflections examines the relationship between architecture and water, capturing the distorted reflections of city buildings in rain-soaked streets. The piece invites viewers to consider how our perception of urban environments changes with weather and light.',
  dimensions: '50cm × 70cm',
  owner: 'Sarah Chen'
}, {
  id: 3,
  title: 'Abstract Thoughts',
  artist: 'Marcus Rodriguez',
  artistEmail: 'marcus@example.com',
  image: 'https://images.unsplash.com/photo-1573221566340-81bdde00e00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  medium: 'Mixed Media',
  year: 2023,
  status: 'Verified',
  price: '$3,200',
  createdDate: 'Feb 28, 2023',
  registeredDate: 'Mar 5, 2023',
  description: 'Abstract Thoughts is a mixed media exploration of consciousness and internal dialogue. The layered approach represents the complexity of human thought processes, with each element symbolizing different aspects of our mental landscape.',
  dimensions: '75cm × 90cm',
  owner: 'Marcus Rodriguez'
}, {
  id: 4,
  title: 'Coastal Serenity',
  artist: 'Emma Thompson',
  artistEmail: 'emma@example.com',
  image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  medium: 'Watercolor',
  year: 2021,
  status: 'Verified',
  price: '$1,500',
  createdDate: 'Jan 12, 2023',
  registeredDate: 'Jan 20, 2023',
  description: 'Coastal Serenity captures the peaceful atmosphere of a secluded beach at dawn. The delicate watercolor technique emphasizes the ephemeral quality of morning light and the gentle movement of waves against the shore.',
  dimensions: '45cm × 60cm',
  owner: 'Emma Thompson'
}, {
  id: 5,
  title: 'Digital Dreamscape',
  artist: 'Emma Thompson',
  artistEmail: 'emma@example.com',
  image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  medium: 'Digital Art',
  year: 2023,
  status: 'Verified',
  price: '$950',
  createdDate: 'May 5, 2023',
  registeredDate: 'May 12, 2023',
  description: 'Digital Dreamscape blends technology and imagination to create a surreal landscape that exists between the digital and natural worlds. This piece explores how our increasing integration with technology shapes our dreams and subconscious.',
  dimensions: 'Digital (8K resolution)',
  owner: 'Emma Thompson'
}];