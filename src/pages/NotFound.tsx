import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, AlertCircleIcon } from 'lucide-react';
export const NotFound = () => {
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
          <AlertCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700">
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Go to Home
            </Link>
            <Link to="/verify-artwork" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50">
              Verify Artwork
            </Link>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            <p>If you scanned a QR code, try these troubleshooting steps:</p>
            <ul className="list-disc text-left mt-2 ml-8">
              <li>Make sure the URL in the QR code is correct</li>
              <li>Try adding "?code=YOUR_QR_CODE" to the URL</li>
              <li>Ensure you have a stable internet connection</li>
            </ul>
          </div>
        </div>
      </main>
    </div>;
};