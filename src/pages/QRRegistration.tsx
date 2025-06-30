import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftIcon, UploadIcon, CameraIcon, CheckCircleIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react';
export const QRRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Extract QR code from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const qrCode = queryParams.get('code') || 'Unknown QR Code';
  // Form state
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [medium, setMedium] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [description, setDescription] = useState('');
  // Image upload states
  const [frontImage, setFrontImage] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);
  const [qrTagImage, setQrTagImage] = useState(null);
  const [qrTagImagePreview, setQrTagImagePreview] = useState(null);
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  // Handle image upload
  const handleImageUpload = (e, imageType) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (imageType === 'front') {
        setFrontImage(file);
        setFrontImagePreview(reader.result);
      } else if (imageType === 'back') {
        setBackImage(file);
        setBackImagePreview(reader.result);
      } else if (imageType === 'qrTag') {
        setQrTagImage(file);
        setQrTagImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    // Validate required fields
    if (!title || !artist || !year || !medium || !frontImagePreview) {
      alert('Please fill in all required fields and upload at least the front view image.');
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowLoginPrompt(true);
    }, 1000);
  };
  // Handle login
  const handleLogin = e => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please enter both email and password');
      return;
    }
    setIsSubmitting(true);
    // Simulate login API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Mock successful registration
      alert('Artwork registration successful! Your submission will be reviewed by our team.');
      navigate('/dashboard');
    }, 1500);
  };
  return <div className="w-full min-h-screen bg-white">
      <header className="w-full py-4 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center">
          <Link to="/" className="mr-4">
            <img src="/Artify_Logo_purple_clear.png" alt="Artify" className="h-10" />
          </Link>
          <h1 className="text-xl font-medium text-gray-900">
            Artwork Registration
          </h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        {!showLoginPrompt ? <>
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <ArrowLeftIcon className="h-5 w-5 text-gray-500 mr-2" />
                <Link to="/" className="text-purple-600 hover:text-purple-800">
                  Back to Home
                </Link>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Register Your Artwork
              </h2>
              <p className="text-gray-600">
                You're registering artwork with QR code:{' '}
                <span className="font-mono text-purple-600">{qrCode}</span>
              </p>
            </div>
            {/* Verification Badge Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <div className="flex items-start">
                <AlertTriangleIcon className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-amber-800">
                    Important Notice
                  </h3>
                  <p className="text-amber-700 mt-1">
                    Your artwork will only display verified badges to the public
                    when a physical QR code tag is attached to the work.
                    Verification status is dependent on the physical QR code
                    being properly applied and scannable.
                  </p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Artwork Photos Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Artwork Photos
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Please upload clear photos of your artwork. Front view is
                  required; back view and QR tag placement are recommended.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Front View */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Front View <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      {frontImagePreview ? <div className="relative h-48 rounded-lg overflow-hidden">
                          <img src={frontImagePreview} alt="Front view preview" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => {
                      setFrontImage(null);
                      setFrontImagePreview(null);
                    }} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div> : <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-48 flex flex-col items-center justify-center">
                          <input type="file" id="front-image" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'front')} />
                          <CameraIcon className="h-10 w-10 text-gray-400 mb-2" />
                          <label htmlFor="front-image" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
                            Upload Image
                          </label>
                        </div>}
                    </div>
                  </div>
                  {/* Back View */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Back View
                    </label>
                    <div className="relative">
                      {backImagePreview ? <div className="relative h-48 rounded-lg overflow-hidden">
                          <img src={backImagePreview} alt="Back view preview" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => {
                      setBackImage(null);
                      setBackImagePreview(null);
                    }} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div> : <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-48 flex flex-col items-center justify-center">
                          <input type="file" id="back-image" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'back')} />
                          <CameraIcon className="h-10 w-10 text-gray-400 mb-2" />
                          <label htmlFor="back-image" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
                            Upload Image
                          </label>
                        </div>}
                    </div>
                  </div>
                  {/* QR Tag View */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      QR Tag Placement
                    </label>
                    <div className="relative">
                      {qrTagImagePreview ? <div className="relative h-48 rounded-lg overflow-hidden">
                          <img src={qrTagImagePreview} alt="QR tag preview" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => {
                      setQrTagImage(null);
                      setQrTagImagePreview(null);
                    }} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div> : <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-48 flex flex-col items-center justify-center">
                          <input type="file" id="qr-tag-image" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'qrTag')} />
                          <CameraIcon className="h-10 w-10 text-gray-400 mb-2" />
                          <label htmlFor="qr-tag-image" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
                            Upload Image
                          </label>
                        </div>}
                    </div>
                  </div>
                </div>
              </div>
              {/* Artwork Details Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Artwork Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="title" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" value={title} onChange={e => setTitle(e.target.value)} required />
                  </div>
                  <div>
                    <label htmlFor="artist" className="block text-sm font-medium text-gray-700 mb-1">
                      Artist <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="artist" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" value={artist} onChange={e => setArtist(e.target.value)} required />
                  </div>
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <input type="number" id="year" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" value={year} onChange={e => setYear(e.target.value)} placeholder="e.g., 2023" min="1900" max={new Date().getFullYear()} required />
                  </div>
                  <div>
                    <label htmlFor="medium" className="block text-sm font-medium text-gray-700 mb-1">
                      Medium <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="medium" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" value={medium} onChange={e => setMedium(e.target.value)} placeholder="e.g., Oil on Canvas" required />
                  </div>
                  <div>
                    <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-1">
                      Dimensions
                    </label>
                    <input type="text" id="dimensions" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" value={dimensions} onChange={e => setDimensions(e.target.value)} placeholder="e.g., 60cm × 80cm" />
                  </div>
                </div>
                <div className="mt-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea id="description" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" value={description} onChange={e => setDescription(e.target.value)} placeholder="Tell us about your artwork..." />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none" disabled={isSubmitting}>
                  {isSubmitting ? <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </> : <>Register Artwork</>}
                </button>
              </div>
            </form>
          </> : <div className="max-w-md mx-auto mt-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Almost Done!
                </h2>
                <p className="mt-1 text-gray-600">
                  Please sign in or create an account to complete your artwork
                  registration
                </p>
              </div>
              {loginError && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                  {loginError}
                </div>}
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 flex items-center justify-center" disabled={isSubmitting}>
                  {isSubmitting ? <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </> : 'Sign In'}
                </button>
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-purple-600 hover:underline">
                      Create account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>}
      </main>
    </div>;
};