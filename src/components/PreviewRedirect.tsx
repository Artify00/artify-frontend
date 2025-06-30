import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const PreviewRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to the verify-transfer page with sample parameters
    navigate('/verify-transfer?id=sample-transfer-123&title=Sunset%20Dreams&from=Sarah%20Chen&email=your_email@example.com');
  }, [navigate]);
  return <div className="w-full min-h-screen bg-purple-50 flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">
          Redirecting to Transfer Verification...
        </h2>
        <p className="text-gray-600">
          If you're not redirected automatically, please click{' '}
          <a href="/verify-transfer?id=sample-transfer-123&title=Sunset%20Dreams&from=Sarah%20Chen&email=your_email@example.com" className="text-purple-600 hover:underline">
            here
          </a>
        </p>
      </div>
    </div>;
};