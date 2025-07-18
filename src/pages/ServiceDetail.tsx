import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LockIcon, MapPinIcon, DollarSignIcon, UsersIcon, UserIcon, BuildingIcon, FrameIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
export const ServiceDetail = () => {
  const location = useLocation();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  // Scroll to the section if hash is present in URL
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };
  const faqItems = [{
    question: 'Is Artify a blockchain solution?',
    answer: "No, Artify is not blockchain-based. We use secure, distributed database technology that doesn't require cryptocurrency or complex mining operations. This makes Artify more accessible, environmentally friendly, and focused on real-world art market needs."
  }, {
    question: 'Can I use Artify without a gallery?',
    answer: 'Absolutely! Artify is designed for independent artists as well as those represented by galleries. You can register, track, and protect your work directly through our platform without any gallery involvement.'
  }, {
    question: 'What happens if the tag is lost?',
    answer: 'If a physical tag is lost, the digital record remains intact. We have a secure process to issue replacement tags that link to the original artwork record without compromising its provenance history.'
  }, {
    question: 'Can I add existing works retroactively?',
    answer: 'Yes, you can register works that were created before you joined Artify. Our platform includes a verification process for adding older works to ensure the provenance chain remains trustworthy.'
  }, {
    question: 'Can I choose to hide certain data?',
    answer: "Privacy is important to us. You can control what information is publicly visible versus what remains private. Collector identities are always protected by default, while the artwork's journey is tracked."
  }, {
    question: 'What does Artify cost?',
    answer: 'Artify offers flexible pricing plans starting with a free tier for emerging artists. Premium features are available through subscription plans, and we offer special rates for galleries and institutional users. Visit our pricing page for detailed information.'
  }];
  return <>
      <Header />
      <main className="w-full bg-white">
        {/* Hero Section */}
        <section className="w-full bg-purple-600 text-white py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Work Is Worth Protecting. Here's How Artify Does It.
            </h1>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              We go beyond certificates and paperwork. Artify preserves
              authenticity, tracks ownership, and empowers artists to get paid —
              even after the first sale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-6 py-3 rounded-md hover:bg-gray-100 font-medium">
                Get Started
              </button>
              <button className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 font-medium">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
        {/* SPC Section */}
        <section id="spc" className="w-full py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <LockIcon className="w-10 h-10 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold font-sans">
                Secure Provenance, Verified from Both Sides
              </h2>
            </div>
            <p className="text-gray-600 text-lg mb-8 text-center max-w-3xl mx-auto">
              Artify introduces SPC™ — Secure Provenance Chain, a
              tamper-resistant, dual-verification system. Each artwork has two
              anchors:
            </p>
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="flex-1 p-6 rounded-xl border border-purple-100 bg-purple-50">
                <h3 className="text-xl font-bold mb-4 font-sans">
                  Creator-side record
                </h3>
                <p className="text-gray-600 mb-4">
                  You, the artist, register the work with complete details about
                  creation, materials, and authenticity.
                </p>
                <ul className="space-y-2 mb-4 text-gray-600">
                  <li>• Studio registration data</li>
                  <li>• Creation timestamp</li>
                  <li>• Material verification</li>
                  <li>• Artist authentication</li>
                </ul>
              </div>
              <div className="flex-1 p-6 rounded-xl border border-purple-100 bg-purple-50">
                <h3 className="text-xl font-bold mb-4 font-sans">
                  World-side record
                </h3>
                <p className="text-gray-600 mb-4">
                  Public scans log when and where the artwork appears, creating
                  an independent verification chain.
                </p>
                <ul className="space-y-2 mb-4 text-gray-600">
                  <li>• Exhibition appearances</li>
                  <li>• Gallery showings</li>
                  <li>• Auction verifications</li>
                  <li>• Museum displays</li>
                </ul>
              </div>
            </div>
            <div className="relative py-10 px-6 rounded-xl border border-purple-200 bg-white shadow-sm">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-2 rounded-full font-medium">
                The Result
              </div>
              <p className="text-center text-lg font-medium text-gray-800 mb-6">
                Two independent verification sources merge into one
                tamper-resistant, trusted provenance chain.
              </p>
              <div className="w-full h-24 relative">
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-purple-200 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-purple-600 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-purple-600 rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-white"></div>
                <div className="absolute top-1/2 left-3/4 w-4 h-4 bg-purple-600 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-0 left-1/4 -translate-x-1/2 text-sm text-gray-600">
                  Artist Registration
                </div>
                <div className="absolute bottom-0 left-1/4 -translate-x-1/2 text-sm text-gray-600">
                  Creator Record
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-sm font-medium text-purple-600">
                  Verified Timeline
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm font-medium text-purple-600">
                  SPC™ Chain
                </div>
                <div className="absolute top-0 left-3/4 -translate-x-1/2 text-sm text-gray-600">
                  Public Scanning
                </div>
                <div className="absolute bottom-0 left-3/4 -translate-x-1/2 text-sm text-gray-600">
                  World Record
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Ownership Tracking Section */}
        <section id="ownership-tracking" className="w-full py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <MapPinIcon className="w-10 h-10 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold font-sans">
                Track Ownership. Maintain Privacy.
              </h2>
            </div>
            <p className="text-gray-600 text-lg mb-10 text-center max-w-3xl mx-auto">
              Every time your work is sold, shown, or collected, a scan can log:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-xl border bg-white text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Location</h3>
                <p className="text-gray-600">
                  Geolocation data helps verify where the artwork has been
                  displayed or transferred.
                </p>
              </div>
              <div className="p-6 rounded-xl border bg-white text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-600">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Timestamp</h3>
                <p className="text-gray-600">
                  Secure timestamps create an accurate chronology of the
                  artwork's journey.
                </p>
              </div>
              <div className="p-6 rounded-xl border bg-white text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-600">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Event Type</h3>
                <p className="text-gray-600">
                  Records whether the artwork was sold, transferred, exhibited,
                  or loaned.
                </p>
              </div>
            </div>
            <div className="p-6 rounded-xl border bg-white mb-10">
              <h3 className="text-xl font-bold mb-6 text-center">
                Artwork Journey Timeline
              </h3>
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-purple-200"></div>
                <div className="relative flex items-start mb-8">
                  <div className="h-8 w-8 flex-shrink-0 bg-purple-600 rounded-full flex items-center justify-center z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium">Registered</h4>
                    <p className="text-gray-600">Artist studio, New York</p>
                    <p className="text-sm text-gray-500">January 15, 2023</p>
                  </div>
                </div>
                <div className="relative flex items-start mb-8">
                  <div className="h-8 w-8 flex-shrink-0 bg-purple-500 rounded-full flex items-center justify-center z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium">Shown in Gallery</h4>
                    <p className="text-gray-600">
                      Contemporary Art Space, New York
                    </p>
                    <p className="text-sm text-gray-500">March 5, 2023</p>
                  </div>
                </div>
                <div className="relative flex items-start mb-8">
                  <div className="h-8 w-8 flex-shrink-0 bg-purple-500 rounded-full flex items-center justify-center z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium">Sold</h4>
                    <p className="text-gray-600">Private Collection</p>
                    <p className="text-sm text-gray-500">April 20, 2023</p>
                  </div>
                </div>
                <div className="relative flex items-start mb-8">
                  <div className="h-8 w-8 flex-shrink-0 bg-purple-500 rounded-full flex items-center justify-center z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium">Loaned to Museum</h4>
                    <p className="text-gray-600">
                      Metropolitan Museum, New York
                    </p>
                    <p className="text-sm text-gray-500">July 10, 2023</p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="h-8 w-8 flex-shrink-0 bg-purple-500 rounded-full flex items-center justify-center z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium">Resold</h4>
                    <p className="text-gray-600">Private Collection</p>
                    <p className="text-sm text-gray-500">October 5, 2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <p className="text-center text-lg font-medium text-purple-800">
                Collectors stay anonymous. But the artwork's life becomes
                traceable — without compromising privacy.
              </p>
            </div>
          </div>
        </section>
        {/* Artist's Resale Right Section */}
        <section id="resale-right" className="w-full py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <DollarSignIcon className="w-10 h-10 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold font-sans">
                Earn Every Time Your Work is Resold
              </h2>
            </div>
            <p className="text-gray-600 text-lg mb-10 text-center max-w-3xl mx-auto">
              Artify helps you activate your Artist's Resale Right (ARR) — so
              you receive a royalty whenever your artwork is resold. No legal
              chasing. No awkward negotiations. It's built into the system.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-xl border bg-white">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-600">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Verified Resales</h3>
                <p className="text-gray-600">
                  Linked directly to verified resale events, ensuring you never
                  miss out on a transaction.
                </p>
              </div>
              <div className="p-6 rounded-xl border bg-white">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-600">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Customizable Royalty</h3>
                <p className="text-gray-600">
                  Set your own royalty percentage or use platform defaults based
                  on industry standards.
                </p>
              </div>
              <div className="p-6 rounded-xl border bg-white">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-600">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Transparent Log</h3>
                <p className="text-gray-600">
                  Complete transparency with a detailed log of all resale events
                  and royalty payments.
                </p>
              </div>
            </div>
            <div className="bg-purple-600 text-white p-8 rounded-xl mb-10">
              <p className="text-center text-2xl font-medium italic">
                "With Artify, your art keeps working for you."
              </p>
            </div>
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="text-lg font-bold">
                  Artist's Resale Right Calculator
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 mb-4">
                      See how much you could earn when your artwork is resold at
                      a higher value:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Original Sale Price
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input type="text" className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border" placeholder="0.00" defaultValue="1,000.00" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Resale Price
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input type="text" className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border" placeholder="0.00" defaultValue="5,000.00" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Royalty Percentage
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input type="text" className="focus:ring-purple-500 focus:border-purple-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md py-2 border" placeholder="0.00" defaultValue="5" />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg flex flex-col justify-center">
                    <h4 className="text-lg font-medium mb-2">
                      Your Estimated Royalty:
                    </h4>
                    <p className="text-3xl font-bold text-purple-600">
                      $250.00
                    </p>
                    <p className="text-gray-500 mt-2">
                      Based on a 5% royalty rate
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        Artify automatically tracks resales and helps you
                        collect your royalties without the hassle of legal
                        follow-ups or awkward conversations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Built-In Protection Section */}
        <section id="built-in-protection" className="w-full py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-sans text-center mb-10">
              Built-In Protection for Everyone
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl border hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <UserIcon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">
                  For Artists
                </h3>
                <p className="text-gray-600 mb-4 text-center">
                  Protect your legacy. Get paid fairly.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-600">
                      Secure registration of your work
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-600">
                      Earn royalties on secondary sales
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-600">
                      Track your artwork's journey
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-600">
                      Build a verified portfolio
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl border hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <UsersIcon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">
                  For Collectors
                </h3>
                <p className="text-gray-600 mb-4 text-center">
                  Know your artwork's story is real.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-600">
                      Verify authenticity instantly
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-600">
                      Access complete provenance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-600">
                      Maintain privacy as an owner
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-600">
                      Increase artwork resale value
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl border hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <BuildingIcon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">
                  For Galleries
                </h3>
                <p className="text-gray-600 mb-4 text-center">
                  Add trust and traceability to your sales.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-600">
                      Offer verified artworks to clients
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-600">
                      Streamline artist royalty payments
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-600">
                      Track exhibition history
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-600">
                      Build collector confidence
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Studio to Gallery Wall Section */}
        <section id="studio-to-gallery" className="w-full py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <FrameIcon className="w-10 h-10 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold font-sans">
                Track the Whole Journey
              </h2>
            </div>
            <p className="text-gray-600 text-lg mb-10 text-center max-w-3xl mx-auto">
              Your Artify tag captures everything from creation to exhibition
              and beyond.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-6">
                  Comprehensive Tracking
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-medium text-purple-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Artwork Info and Dimensions
                      </h4>
                      <p className="text-gray-600">
                        Complete details about materials, size, and creation
                        techniques.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-medium text-purple-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Studio-side Registration
                      </h4>
                      <p className="text-gray-600">
                        Secure, timestamped record of when the artwork was
                        created and registered.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-medium text-purple-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Gallery Installs and Fairs
                      </h4>
                      <p className="text-gray-600">
                        Track where and when your artwork has been exhibited.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-medium text-purple-600">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Ownership Transfers
                      </h4>
                      <p className="text-gray-600">
                        Secure record of sales and transfers while maintaining
                        privacy.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-medium text-purple-600">5</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Collections History
                      </h4>
                      <p className="text-gray-600">
                        Documentation of both public and private collections
                        (with privacy controls).
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                <h3 className="text-xl font-bold mb-6">Artguide Integration</h3>
                <div className="mb-6">
                  <img src="https://images.unsplash.com/photo-1594732832278-abd644401426?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Art exhibition" className="w-full h-48 object-cover rounded-lg mb-4" />
                </div>
                <p className="text-gray-700 mb-4">
                  Want to see where your artwork has been shown? Our integration
                  with Artguide adds verified exhibition history.
                </p>
                <p className="text-gray-700 mb-6">
                  When your work appears in galleries, museums, or fairs listed
                  on Artguide, the exhibition data is automatically added to
                  your artwork's provenance chain.
                </p>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Exhibition Verification
                  </h4>
                  <p className="text-sm text-gray-600">
                    Artguide's network of over 5,000 galleries and museums
                    worldwide helps verify when and where your artwork has been
                    exhibited, creating an independent verification source.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section id="faq" className="w-full py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-sans text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => <div key={index} className="border rounded-lg overflow-hidden">
                  <button className="w-full text-left p-4 flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none" onClick={() => toggleAccordion(index)}>
                    <span className="font-medium text-gray-900">
                      {item.question}
                    </span>
                    {activeAccordion === index ? <ChevronUpIcon className="h-5 w-5 text-purple-600" /> : <ChevronDownIcon className="h-5 w-5 text-gray-500" />}
                  </button>
                  {activeAccordion === index && <div className="p-4 bg-gray-50 border-t">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>}
                </div>)}
            </div>
          </div>
        </section>
        {/* Final CTA Section */}
        <section className="w-full py-16 px-6 bg-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Ready to Protect Your Work?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <button className="bg-white text-purple-600 px-6 py-3 rounded-md hover:bg-gray-100 font-medium">
                Register Your First Work
              </button>
              <button className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 font-medium border border-white">
                See Pricing
              </button>
              <button className="bg-transparent border border-white text-white px-6 py-3 rounded-md hover:bg-purple-700 font-medium">
                Talk to Us
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Trusted by</p>
                <p className="text-2xl font-bold">10,000+ Artists</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Protecting</p>
                <p className="text-2xl font-bold">50,000+ Artworks</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Used in</p>
                <p className="text-2xl font-bold">25+ Countries</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>;
};