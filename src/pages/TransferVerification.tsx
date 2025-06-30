import React, { useEffect, useState, Component } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckIcon, XIcon, AlertCircleIcon, ArrowLeftIcon } from 'lucide-react';
export const TransferVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'verify' | 'success' | 'error'>('verify');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // Get transfer details from URL params
  const transferId = searchParams.get('id') || 'sample-transfer-123';
  const artworkTitle = searchParams.get('title') || 'Sunset Dreams';
  const fromName = searchParams.get('from') || 'Sarah Chen';
  const toEmail = searchParams.get('email') || 'recipient@example.com';
  // Mock data for the artwork
  const artwork = {
    title: artworkTitle,
    image: "/canvas_back.jpg",
    artist: fromName,
    year: '2023',
    medium: 'Oil on Canvas'
  };
  // For demo purposes - the correct verification code is "123456"
  const correctCode = '123456';
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }
    if (verificationCode.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (verificationCode === correctCode) {
        // Navigate to the new ownership confirmation page instead of showing the success step
        navigate(`/ownership-confirmation?title=${encodeURIComponent(artwork.title)}&artist=${encodeURIComponent(artwork.artist)}`);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    }, 1500);
  };
  const handleDigitInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setVerificationCode(value);
    }
  };
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  // Format the verification code into groups for display
  const formatCodeForDisplay = (code: string) => {
    const codeArray = code.split('');
    const emptySpaces = Array(6 - codeArray.length).fill('');
    const fullArray = [...codeArray, ...emptySpaces];
    return fullArray;
  };
  return <div className="w-full min-h-screen bg-purple-50 py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/Artify_Logo_purple_clear.png" alt="Artify" className="h-12 mx-auto mb-6" />
          </Link>
        </div>
        {step === 'verify' && <div className="bg-white p-8 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-2">Verify Artwork Transfer</h1>
            <p className="text-gray-600 mb-6">
              Please enter the 6-digit verification code sent to your phone to
              complete the ownership transfer.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 rounded-md overflow-hidden mr-4">
                  <img src={artwork.image} alt={artwork.title} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{artwork.title}</h3>
                  <p className="text-sm text-gray-500">
                    {artwork.artist}, {artwork.year}
                  </p>
                  <p className="text-sm text-gray-500">{artwork.medium}</p>
                </div>
              </div>
              <div className="text-sm">
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">From:</span> {fromName}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">To:</span> {toEmail}
                </p>
              </div>
            </div>
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-start">
                <AlertCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>}
            <div className="mb-4">
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <div className="flex justify-between mb-2">
                {formatCodeForDisplay(verificationCode).map((digit, index) => <div key={index} className="w-10 h-12 border border-gray-300 rounded-md flex items-center justify-center text-xl font-medium bg-white">
                    {digit}
                  </div>)}
              </div>
              <input type="text" id="verificationCode" className="sr-only" value={verificationCode} onChange={handleDigitInput} maxLength={6} autoFocus />
              <div className="relative">
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Enter 6-digit code" value={verificationCode} onChange={handleDigitInput} maxLength={6} />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Enter the 6-digit code that was sent to your phone
              </p>
            </div>
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button className="text-purple-600 hover:underline">
                  Resend Code
                </button>
              </p>
            </div>
            <button type="button" onClick={handleSubmit} className={`w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify & Accept Ownership'}
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                For demo purposes, use code: <strong>123456</strong>
              </p>
            </div>
          </div>}
      </div>
    </div>;
};