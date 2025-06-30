import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircleIcon, ShieldIcon, PencilIcon, MapPinIcon, InfoIcon, StarIcon, CheckIcon } from 'lucide-react';
export const OwnershipConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Get artwork details from URL params or use defaults
  const artworkTitle = searchParams.get('title') || 'Untitled Artwork';
  const artistName = searchParams.get('artist') || 'Unknown Artist';
  // State for membership toggle
  const [becomeMember, setBecomeMember] = useState(true);
  const handleContinue = () => {
    // In a real app, we would submit the membership choice
    // and complete the ownership transfer process
    navigate('/dashboard');
  };
  return <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="w-full bg-purple-600 py-6 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <CheckCircleIcon className="h-8 w-8 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold">
            Ownership Confirmation
          </h1>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Main message */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            You're about to be registered as the new owner
          </h2>
          <p className="text-gray-600 text-lg">
            This record will become part of the artwork's permanent provenance,
            protected and verified by Artify.
          </p>
        </div>
        <hr className="my-8 border-gray-200" />
        {/* Privacy section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            How Artify protects your privacy
          </h3>
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <ShieldIcon className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Private ownership:
                </h4>
                <p className="text-gray-600">
                  Your artwork will be listed as owned by "Private Collector"
                  with only general location information.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <PencilIcon className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Customizable display:
                </h4>
                <p className="text-gray-600">
                  As an Artify member, you can edit how your ownership
                  information is displayed publicly.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <MapPinIcon className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Collection management:
                </h4>
                <p className="text-gray-600">
                  Access automated tools to track your artwork's location and
                  maintain its records.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <InfoIcon className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Artist updates:
                </h4>
                <p className="text-gray-600">
                  Receive the latest information about the artist and related
                  market developments.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />
        {/* Membership section */}
        <div className="bg-purple-50 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <StarIcon className="h-6 w-6 text-purple-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">
                Become an Artify Member
              </h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={becomeMember} onChange={() => setBecomeMember(!becomeMember)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          <p className="text-gray-700 mb-4">
            Enhance your art ownership experience with an Artify membership. Get
            full access to all premium features and manage your collection like
            a professional.
          </p>
          <div className="space-y-3">
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
              <p className="text-gray-700">
                Complete control over how your ownership is displayed publicly
              </p>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
              <p className="text-gray-700">
                Advanced collection management with digital cataloging and
                condition reports
              </p>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
              <p className="text-gray-700">
                Market insights and valuation updates for your collection
              </p>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
              <p className="text-gray-700">
                Priority support from our art experts
              </p>
            </div>
          </div>
        </div>
        {/* Action button */}
        <div className="text-center">
          <button onClick={handleContinue} className="px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium text-lg">
            Complete Ownership Transfer
          </button>
        </div>
      </main>
    </div>;
};