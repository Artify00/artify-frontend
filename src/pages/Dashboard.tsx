import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircleIcon, SearchIcon, BellIcon, UserIcon, LogOutIcon, GridIcon, ListIcon, CheckIcon, ChevronDownIcon, ClockIcon } from 'lucide-react';
import { ArtworkDetailModal } from '../components/ArtworkDetailModal';
import { TransferHistoryModal } from '../components/TransferHistoryModal';
export const Dashboard = () => {
  const navigate = useNavigate();
  // Mock user data - we'll try to get it from localStorage if available
  const [user, setUser] = useState({
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    artworks: 12
  });
  // State for detail modal
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for view type
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'table'
  // State for selected artworks
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  // State for dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State for selected action
  const [selectedAction, setSelectedAction] = useState(null);
  // State for transfer history modal
  const [showTransferHistoryModal, setShowTransferHistoryModal] = useState(false);
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      // Redirect to sign in if not logged in
      navigate('/signin');
    } else {
      // Update user state with stored data
      const userData = JSON.parse(storedUser);
      setUser(prevUser => ({
        ...prevUser,
        name: userData.name || prevUser.name,
        email: userData.email || prevUser.email
      }));
    }
  }, [navigate]);
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to home page
    navigate('/');
  };
  const openArtworkDetail = artwork => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };
  const closeArtworkDetail = () => {
    setIsModalOpen(false);
  };
  const toggleViewType = () => {
    setViewType(viewType === 'grid' ? 'table' : 'grid');
  };
  const toggleArtworkSelection = artworkId => {
    setSelectedArtworks(prev => {
      if (prev.includes(artworkId)) {
        return prev.filter(id => id !== artworkId);
      } else {
        return [...prev, artworkId];
      }
    });
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const selectAction = action => {
    setSelectedAction(action);
    setIsDropdownOpen(false);
    // Clear selected artworks when changing actions
    setSelectedArtworks([]);
  };
  const clearSelectedAction = () => {
    setSelectedAction(null);
    setSelectedArtworks([]);
  };
  const executeAction = () => {
    if (selectedArtworks.length === 0) {
      alert('Please select at least one artwork');
      return;
    }
    alert(`${selectedAction} action will be performed on ${selectedArtworks.length} selected artworks`);
    // Here you would implement the actual action logic
    // Reset after action
    setSelectedArtworks([]);
    setSelectedAction(null);
  };
  const handleViewTransferHistory = () => {
    setShowTransferHistoryModal(true);
  };
  const handleTransferHistoryClose = () => {
    setShowTransferHistoryModal(false);
  };
  const handleRegisterNewArtwork = () => {
    navigate('/register-artwork');
  };
  // Mock artwork data
  const artworks = [{
    id: 1,
    title: 'Sunset Dreams',
    image: "/canvas_back.jpg",
    medium: 'Oil on Canvas',
    year: 2023,
    status: 'Verified',
    price: '$2,500'
  }, {
    id: 2,
    title: 'Urban Reflections',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    medium: 'Acrylic on Canvas',
    year: 2022,
    status: 'Pending',
    price: '$1,800'
  }, {
    id: 3,
    title: 'Abstract Thoughts',
    image: 'https://images.unsplash.com/photo-1573221566340-81bdde00e00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    medium: 'Mixed Media',
    year: 2023,
    status: 'Verified',
    price: '$3,200'
  }, {
    id: 4,
    title: 'Coastal Serenity',
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    medium: 'Watercolor',
    year: 2021,
    status: 'Verified',
    price: '$1,500'
  }, {
    id: 5,
    title: 'Digital Dreamscape',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    medium: 'Digital Art',
    year: 2023,
    status: 'Pending',
    price: '$950'
  }, {
    id: 6,
    title: 'Geometric Harmony',
    image: 'https://images.unsplash.com/photo-1584448141569-69f342da535c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    medium: 'Acrylic on Canvas',
    year: 2022,
    status: 'Verified',
    price: '$2,100'
  }, {
    id: 7,
    title: 'Ethereal Landscape',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    medium: 'Oil on Canvas',
    year: 2023,
    status: 'Verified',
    price: '$2,800'
  }, {
    id: 8,
    title: 'Vibrant Cityscape',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    medium: 'Acrylic on Canvas',
    year: 2022,
    status: 'Pending',
    price: '$2,200'
  }, {
    id: 9,
    title: 'Monochrome Study',
    image: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    medium: 'Charcoal on Paper',
    year: 2023,
    status: 'Verified',
    price: '$900'
  }, {
    id: 10,
    title: 'Fluid Expressions',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    medium: 'Watercolor',
    year: 2022,
    status: 'Verified',
    price: '$1,300'
  }, {
    id: 11,
    title: 'Sculptural Forms',
    image: 'https://images.unsplash.com/photo-1576773689115-5cd2b0223523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    medium: 'Bronze Sculpture',
    year: 2021,
    status: 'Verified',
    price: '$4,500'
  }, {
    id: 12,
    title: 'Chromatic Fusion',
    image: 'https://images.unsplash.com/photo-1574182245530-967d9b3831af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    medium: 'Mixed Media',
    year: 2023,
    status: 'Pending',
    price: '$1,950'
  }];
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
                  <span className="text-sm font-medium">{user.name}</span>
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
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              My Artwork Collection
            </h1>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className="mr-1.5 text-purple-600 font-medium">
                  {artworks.length}
                </span>{' '}
                Registered Artworks
              </div>
              {selectedAction && selectedArtworks.length > 0 && <div className="mt-2 flex items-center text-sm text-purple-600">
                  <span className="font-medium">
                    {selectedArtworks.length} selected for {selectedAction}
                  </span>
                </div>}
            </div>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 gap-3">
            <button onClick={handleViewTransferHistory} className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              <ClockIcon className="h-5 w-5 mr-2 text-gray-500" />
              Transfer History
            </button>
            <button onClick={toggleViewType} className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              {viewType === 'grid' ? <ListIcon className="h-5 w-5 mr-2 text-gray-500" /> : <GridIcon className="h-5 w-5 mr-2 text-gray-500" />}
              {viewType === 'grid' ? 'Table View' : 'Grid View'}
            </button>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 pr-4 border" placeholder="Search artwork" />
            </div>
            {/* Action Dropdown */}
            <div className="relative">
              {selectedAction ? <div className="flex space-x-2">
                  <button onClick={executeAction} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none">
                    {selectedAction}
                  </button>
                  <button onClick={clearSelectedAction} className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                    Cancel
                  </button>
                </div> : <button onClick={toggleDropdown} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                  Actions
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </button>}
              {isDropdownOpen && !selectedAction && <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button onClick={() => selectAction('Consign')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">
                      Consign
                    </button>
                    <button onClick={() => selectAction('Make Offer')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">
                      Make Offer
                    </button>
                    <button onClick={() => selectAction('Info Pack')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">
                      Info Pack
                    </button>
                  </div>
                </div>}
            </div>
            <button onClick={handleRegisterNewArtwork} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none">
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Register New Artwork
            </button>
          </div>
        </div>
        {/* Selection Mode Banner */}
        {selectedAction && <div className="bg-purple-50 border border-purple-200 rounded-md p-3 mb-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-medium text-purple-800">
                Selection mode: {selectedAction}
              </span>
              <span className="ml-2 text-sm text-purple-600">
                Select artworks to {selectedAction.toLowerCase()}
              </span>
            </div>
            <button onClick={clearSelectedAction} className="text-purple-600 hover:text-purple-800 text-sm font-medium">
              Cancel
            </button>
          </div>}
        {/* Grid View */}
        {viewType === 'grid' && <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mt-8">
            {artworks.map(artwork => <div key={artwork.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer relative">
                {selectedAction && <div className="absolute top-2 left-2 h-5 w-5 bg-white rounded border border-gray-300 flex items-center justify-center cursor-pointer z-10" onClick={e => {
            e.stopPropagation();
            toggleArtworkSelection(artwork.id);
          }}>
                    {selectedArtworks.includes(artwork.id) && <CheckIcon className="h-4 w-4 text-purple-600" />}
                  </div>}
                <div className="h-44 w-full overflow-hidden" onClick={() => openArtworkDetail(artwork)}>
                  <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover" />
                </div>
                <div className="px-4 py-4" onClick={() => openArtworkDetail(artwork)}>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 truncate">
                    {artwork.title}
                  </h3>
                  <div className="mt-1 flex flex-col space-y-1">
                    <p className="text-sm text-gray-500 truncate">
                      {artwork.title}, {artwork.year}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {artwork.price}
                    </p>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${artwork.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {artwork.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>}
        {/* Table View */}
        {viewType === 'table' && <div className="mt-8 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {selectedAction && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                            <span className="sr-only">Select</span>
                          </th>}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Artwork
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {artworks.map(artwork => <tr key={artwork.id} className="hover:bg-gray-50">
                          {selectedAction && <td className="px-6 py-4 whitespace-nowrap">
                              <div className="h-5 w-5 rounded border border-gray-300 flex items-center justify-center cursor-pointer" onClick={e => {
                        e.stopPropagation();
                        toggleArtworkSelection(artwork.id);
                      }}>
                                {selectedArtworks.includes(artwork.id) && <CheckIcon className="h-4 w-4 text-purple-600" />}
                              </div>
                            </td>}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 mr-4 cursor-pointer" onClick={() => openArtworkDetail(artwork)}>
                                <img className="h-10 w-10 rounded-md object-cover" src={artwork.image} alt={artwork.title} />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 cursor-pointer hover:text-purple-600" onClick={() => openArtworkDetail(artwork)}>
                                  {artwork.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {artwork.title}, {artwork.year}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${artwork.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {artwork.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm font-medium text-gray-900">
                              {artwork.price}
                            </div>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>}
      </main>
      {/* Artwork Detail Modal */}
      <ArtworkDetailModal artwork={selectedArtwork} isOpen={isModalOpen} onClose={closeArtworkDetail} />
      {/* Transfer History Modal */}
      <TransferHistoryModal isOpen={showTransferHistoryModal} onClose={handleTransferHistoryClose} />
    </div>;
};