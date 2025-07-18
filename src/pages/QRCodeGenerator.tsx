import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { ArrowLeftIcon, SearchIcon, FilterIcon, DownloadIcon, PlusIcon, CheckCircleIcon, XCircleIcon, UserIcon, LogOutIcon, BellIcon, PrinterIcon, MapPinIcon, ClockIcon, MonitorIcon } from 'lucide-react';
export const QRCodeGenerator = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [newQRName, setNewQRName] = useState('');
  const [newQRQuantity, setNewQRQuantity] = useState(1);
  const [newQRPrefix, setNewQRPrefix] = useState('ART-');
  const [selectedQR, setSelectedQR] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  // Check if admin is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/signin');
      return;
    }
    const userData = JSON.parse(storedUser);
    if (userData.email !== 'admin@artifynow.net') {
      // Redirect non-admin users to regular dashboard
      navigate('/dashboard');
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };
  const handleFilterChange = e => {
    setFilterStatus(e.target.value);
  };
  const openGenerateModal = () => {
    setShowGenerateModal(true);
  };
  const closeGenerateModal = () => {
    setShowGenerateModal(false);
    setNewQRName('');
    setNewQRQuantity(1);
  };
  const handleGenerateQRCodes = () => {
    // In a real app, this would call an API to generate QR codes
    console.log(`Generating ${newQRQuantity} QR codes for ${newQRName}`);
    // Mock generating new QR codes
    const newQRs = [];
    for (let i = 0; i < newQRQuantity; i++) {
      const newId = mockQRCodes.length + i + 1;
      newQRs.push({
        id: newId,
        name: newQRName,
        code: `${newQRPrefix}${String(newId).padStart(6, '0')}`,
        status: 'unused',
        generatedDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        registeredDate: null,
        artwork: null,
        owner: null,
        scanHistory: []
      });
    }
    // In a real app, we would update the database
    // For this mock, we'll just log the new QR codes
    console.log('Generated QR codes:', newQRs);
    closeGenerateModal();
    // Show a success message (in a real app)
    alert(`Successfully generated ${newQRQuantity} QR codes`);
  };
  const viewQRCode = qr => {
    setSelectedQR(qr);
    setShowQRModal(true);
  };
  const closeQRModal = () => {
    setShowQRModal(false);
    setSelectedQR(null);
  };
  const downloadQRCode = qrCode => {
    // In a real app, this would generate and download a QR code image
    console.log('Downloading QR code:', qrCode.code);
    alert(`Downloading QR code: ${qrCode.code}`);
  };
  const printQRCode = qrCode => {
    // In a real app, this would print the QR code
    console.log('Printing QR code:', qrCode.code);
    alert(`Printing QR code: ${qrCode.code}`);
  };
  // Filter QR codes based on search term and filter status
  const filteredQRCodes = mockQRCodes.filter(qr => {
    const matchesSearch = qr.code.toLowerCase().includes(searchTerm.toLowerCase()) || qr.name && qr.name.toLowerCase().includes(searchTerm.toLowerCase()) || qr.artwork && qr.artwork.toLowerCase().includes(searchTerm.toLowerCase()) || qr.owner && qr.owner.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && qr.status === filterStatus;
  });
  // Calculate statistics
  const stats = {
    total: mockQRCodes.length,
    registered: mockQRCodes.filter(qr => qr.status === 'registered').length,
    unused: mockQRCodes.filter(qr => qr.status === 'unused').length
  };
  // Calculate total scans
  const totalScans = mockQRCodes.reduce((total, qr) => {
    return total + (qr.scanHistory ? qr.scanHistory.length : 0);
  }, 0);
  return <div className="w-full min-h-screen bg-gray-50">
      <header className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <img src="/Artify_Logo_purple_clear.png" alt="Artify" className="h-10" />
                </Link>
              </div>
              <div className="ml-6 flex items-center">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Admin Panel
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center space-x-4">
                <button className="p-1 rounded-full text-gray-500 hover:text-purple-600 focus:outline-none">
                  <BellIcon className="h-6 w-6" />
                </button>
                <div className="ml-3 relative flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium">Admin</span>
                </div>
                <button onClick={handleLogout} className="ml-2 flex items-center text-sm text-gray-500 hover:text-purple-600">
                  <LogOutIcon className="h-5 w-5 mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate('/admin')} className="mr-4 flex items-center text-gray-500 hover:text-purple-600">
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            <span>Back to Dashboard</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              QR Code Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Generate, track, and manage QR codes for artwork registration
            </p>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <div className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total QR Codes
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.total}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Registered QR Codes
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.registered}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <XCircleIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Unused QR Codes
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.unused}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <MapPinIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Scans
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {totalScans}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative rounded-md shadow-sm flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 pr-4 border" placeholder="Search QR codes..." value={searchTerm} onChange={handleSearch} />
          </div>
          <div className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5 text-gray-400" />
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md border" value={filterStatus} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="registered">Registered</option>
              <option value="unused">Unused</option>
            </select>
          </div>
          <button onClick={openGenerateModal} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none">
            <PlusIcon className="h-5 w-5 mr-2" />
            Generate QR Codes
          </button>
        </div>
        {/* QR Codes Table */}
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        QR Code
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Generated
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registered
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Artwork
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Scans
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredQRCodes.map(qr => <tr key={qr.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 mr-4 cursor-pointer" onClick={() => viewQRCode(qr)}>
                              <div className="h-10 w-10 border border-gray-300 rounded-md flex items-center justify-center bg-white text-xs font-mono">
                                QR
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 cursor-pointer hover:text-purple-600" onClick={() => viewQRCode(qr)}>
                                {qr.code}
                              </div>
                              {qr.name && <div className="text-sm text-gray-500">
                                  {qr.name}
                                </div>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${qr.status === 'registered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {qr.status === 'registered' ? 'Registered' : 'Unused'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {qr.generatedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {qr.registeredDate || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {qr.artwork || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {qr.scanHistory ? qr.scanHistory.length : 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button onClick={() => viewQRCode(qr)} className="text-purple-600 hover:text-purple-900" title="View">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button onClick={() => downloadQRCode(qr)} className="text-blue-600 hover:text-blue-900" title="Download">
                              <DownloadIcon className="h-5 w-5" />
                            </button>
                            <button onClick={() => printQRCode(qr)} className="text-gray-600 hover:text-gray-900" title="Print">
                              <PrinterIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Generate QR Modal */}
      {showGenerateModal && <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Generate QR Codes
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="qr-name" className="block text-sm font-medium text-gray-700">
                          Batch Name (Optional)
                        </label>
                        <input type="text" id="qr-name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" placeholder="e.g., Summer Exhibition 2023" value={newQRName} onChange={e => setNewQRName(e.target.value)} />
                      </div>
                      <div>
                        <label htmlFor="qr-prefix" className="block text-sm font-medium text-gray-700">
                          Code Prefix
                        </label>
                        <input type="text" id="qr-prefix" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" value={newQRPrefix} onChange={e => setNewQRPrefix(e.target.value)} />
                        <p className="mt-1 text-xs text-gray-500">
                          QR codes will be formatted as {newQRPrefix}000001,{' '}
                          {newQRPrefix}000002, etc.
                        </p>
                      </div>
                      <div>
                        <label htmlFor="qr-quantity" className="block text-sm font-medium text-gray-700">
                          Quantity
                        </label>
                        <input type="number" id="qr-quantity" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" min="1" max="100" value={newQRQuantity} onChange={e => setNewQRQuantity(parseInt(e.target.value))} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm" onClick={handleGenerateQRCodes}>
                  Generate
                </button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeGenerateModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* View QR Modal */}
      {showQRModal && selectedQR && <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      QR Code: {selectedQR.code}
                    </h3>
                    <div className="mt-4 flex flex-col items-center">
                      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                        <QRCode value={`${window.location.origin}/verify-artwork?code=${selectedQR.code}`} size={200} />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Scan to verify artwork authenticity
                      </p>
                      <div className="mt-6 w-full">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          QR Code Details
                        </h4>
                        <div className="bg-gray-50 rounded-md p-4">
                          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <dt className="text-gray-500">Status</dt>
                            <dd className="text-gray-900">
                              <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${selectedQR.status === 'registered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {selectedQR.status === 'registered' ? 'Registered' : 'Unused'}
                              </span>
                            </dd>
                            <dt className="text-gray-500">Generated</dt>
                            <dd className="text-gray-900">
                              {selectedQR.generatedDate}
                            </dd>
                            <dt className="text-gray-500">Registered</dt>
                            <dd className="text-gray-900">
                              {selectedQR.registeredDate || '-'}
                            </dd>
                            <dt className="text-gray-500">Artwork</dt>
                            <dd className="text-gray-900">
                              {selectedQR.artwork || '-'}
                            </dd>
                            <dt className="text-gray-500">Owner</dt>
                            <dd className="text-gray-900">
                              {selectedQR.owner || '-'}
                            </dd>
                            <dt className="text-gray-500">Total Scans</dt>
                            <dd className="text-gray-900">
                              {selectedQR.scanHistory ? selectedQR.scanHistory.length : 0}
                            </dd>
                          </dl>
                        </div>
                      </div>
                      {/* Scan History Section */}
                      {selectedQR.scanHistory && selectedQR.scanHistory.length > 0 && <div className="mt-6 w-full">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Scan History
                            </h4>
                            <div className="bg-gray-50 rounded-md p-4 max-h-64 overflow-auto">
                              <ul className="divide-y divide-gray-200">
                                {selectedQR.scanHistory.map((scan, index) => <li key={index} className="py-3">
                                    <div className="flex items-start">
                                      <div className="flex-shrink-0 mt-1">
                                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                                      </div>
                                      <div className="ml-3 flex-1">
                                        <p className="text-sm font-medium text-gray-900">
                                          {scan.location}
                                        </p>
                                        <div className="mt-1 flex items-center text-xs text-gray-500">
                                          <ClockIcon className="h-4 w-4 mr-1" />
                                          <span>{scan.timestamp}</span>
                                        </div>
                                        {scan.device && <div className="mt-1 flex items-center text-xs text-gray-500">
                                            <MonitorIcon className="h-4 w-4 mr-1" />
                                            <span>{scan.device}</span>
                                          </div>}
                                        {scan.ipAddress && <div className="mt-1 text-xs text-gray-500">
                                            <span className="font-mono">
                                              IP: {scan.ipAddress}
                                            </span>
                                          </div>}
                                      </div>
                                    </div>
                                  </li>)}
                              </ul>
                            </div>
                          </div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm" onClick={() => downloadQRCode(selectedQR)}>
                  <DownloadIcon className="h-5 w-5 mr-2" />
                  Download
                </button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => printQRCode(selectedQR)}>
                  <PrinterIcon className="h-5 w-5 mr-2" />
                  Print
                </button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeQRModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
// Mock data for QR codes
const mockQRCodes = [{
  id: 1,
  code: 'ART-000001',
  name: 'Summer Exhibition 2023',
  status: 'registered',
  generatedDate: 'Jan 15, 2023',
  registeredDate: 'Feb 3, 2023',
  artwork: 'Sunset Dreams',
  owner: 'Sarah Chen',
  scanHistory: [{
    location: 'New York, United States',
    timestamp: 'May 12, 2023, 2:34 PM',
    ipAddress: '192.168.1.1',
    device: 'iPhone 13, iOS 16'
  }, {
    location: 'London, United Kingdom',
    timestamp: 'Jun 23, 2023, 11:15 AM',
    ipAddress: '192.168.1.2',
    device: 'Samsung Galaxy S22, Android 13'
  }, {
    location: 'Paris, France',
    timestamp: 'Jul 5, 2023, 4:22 PM',
    ipAddress: '192.168.1.3',
    device: 'Google Pixel 6, Android 13'
  }]
}, {
  id: 2,
  code: 'ART-000002',
  name: 'Summer Exhibition 2023',
  status: 'registered',
  generatedDate: 'Jan 15, 2023',
  registeredDate: 'Feb 10, 2023',
  artwork: 'Urban Reflections',
  owner: 'Sarah Chen',
  scanHistory: [{
    location: 'Los Angeles, United States',
    timestamp: 'Mar 3, 2023, 3:45 PM',
    ipAddress: '192.168.1.4',
    device: 'iPad Pro, iOS 16'
  }, {
    location: 'San Francisco, United States',
    timestamp: 'Apr 17, 2023, 1:12 PM',
    ipAddress: '192.168.1.5',
    device: 'MacBook Pro, macOS 13'
  }]
}, {
  id: 3,
  code: 'ART-000003',
  name: 'Summer Exhibition 2023',
  status: 'unused',
  generatedDate: 'Jan 15, 2023',
  registeredDate: null,
  artwork: null,
  owner: null,
  scanHistory: []
}, {
  id: 4,
  code: 'ART-000004',
  name: 'Winter Collection 2023',
  status: 'registered',
  generatedDate: 'Mar 5, 2023',
  registeredDate: 'Mar 20, 2023',
  artwork: 'Abstract Thoughts',
  owner: 'Marcus Rodriguez',
  scanHistory: [{
    location: 'Tokyo, Japan',
    timestamp: 'Apr 5, 2023, 9:30 AM',
    ipAddress: '192.168.1.6',
    device: 'iPhone 12 Mini, iOS 16'
  }]
}, {
  id: 5,
  code: 'ART-000005',
  name: 'Winter Collection 2023',
  status: 'registered',
  generatedDate: 'Mar 5, 2023',
  registeredDate: 'Apr 2, 2023',
  artwork: 'Coastal Serenity',
  owner: 'Emma Thompson',
  scanHistory: [{
    location: 'Sydney, Australia',
    timestamp: 'May 22, 2023, 10:15 AM',
    ipAddress: '192.168.1.7',
    device: 'Samsung Galaxy Tab S8, Android 13'
  }, {
    location: 'Melbourne, Australia',
    timestamp: 'Jun 14, 2023, 2:45 PM',
    ipAddress: '192.168.1.8',
    device: 'Google Chrome on Windows'
  }, {
    location: 'Brisbane, Australia',
    timestamp: 'Jul 3, 2023, 5:20 PM',
    ipAddress: '192.168.1.9',
    device: 'Safari on macOS'
  }, {
    location: 'Perth, Australia',
    timestamp: 'Jul 28, 2023, 11:05 AM',
    ipAddress: '192.168.1.10',
    device: 'Firefox on Windows'
  }]
}, {
  id: 6,
  code: 'ART-000006',
  name: 'Winter Collection 2023',
  status: 'unused',
  generatedDate: 'Mar 5, 2023',
  registeredDate: null,
  artwork: null,
  owner: null,
  scanHistory: []
}, {
  id: 7,
  code: 'ART-000007',
  name: 'Winter Collection 2023',
  status: 'unused',
  generatedDate: 'Mar 5, 2023',
  registeredDate: null,
  artwork: null,
  owner: null,
  scanHistory: []
}, {
  id: 8,
  code: 'ART-000008',
  name: 'Spring Showcase 2023',
  status: 'registered',
  generatedDate: 'Apr 10, 2023',
  registeredDate: 'Apr 15, 2023',
  artwork: 'Geometric Harmony',
  owner: 'Marcus Rodriguez',
  scanHistory: [{
    location: 'Berlin, Germany',
    timestamp: 'May 1, 2023, 3:40 PM',
    ipAddress: '192.168.1.11',
    device: 'Chrome on Android'
  }, {
    location: 'Munich, Germany',
    timestamp: 'May 15, 2023, 10:22 AM',
    ipAddress: '192.168.1.12',
    device: 'Safari on iOS'
  }]
}, {
  id: 9,
  code: 'ART-000009',
  name: 'Spring Showcase 2023',
  status: 'registered',
  generatedDate: 'Apr 10, 2023',
  registeredDate: 'Apr 22, 2023',
  artwork: 'Ethereal Landscape',
  owner: 'Sarah Chen',
  scanHistory: [{
    location: 'Toronto, Canada',
    timestamp: 'Jun 8, 2023, 4:15 PM',
    ipAddress: '192.168.1.13',
    device: 'Edge on Windows'
  }]
}, {
  id: 10,
  code: 'ART-000010',
  name: 'Spring Showcase 2023',
  status: 'unused',
  generatedDate: 'Apr 10, 2023',
  registeredDate: null,
  artwork: null,
  owner: null,
  scanHistory: []
}];