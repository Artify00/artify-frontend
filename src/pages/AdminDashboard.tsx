import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UsersIcon, ImageIcon, SearchIcon, BellIcon, UserIcon, LogOutIcon, FilterIcon, TrashIcon, EditIcon, CheckCircleIcon, XCircleIcon, QrCodeIcon } from 'lucide-react';
import { UserDetailModal } from '../components/UserDetailModal';
import { AdminArtworkDetailModal } from '../components/AdminArtworkDetailModal';
export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'artworks'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'pending', 'verified'
  // State for user detail modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  // State for artwork detail modal
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isArtworkModalOpen, setIsArtworkModalOpen] = useState(false);
  useEffect(() => {
    // Check if admin is logged in
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
  // Handle opening user detail modal
  const openUserDetail = user => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };
  // Handle closing user detail modal
  const closeUserDetail = () => {
    setIsUserModalOpen(false);
  };
  // Handle opening artwork detail modal
  const openArtworkDetail = artwork => {
    setSelectedArtwork(artwork);
    setIsArtworkModalOpen(true);
  };
  // Handle closing artwork detail modal
  const closeArtworkDetail = () => {
    setIsArtworkModalOpen(false);
  };
  // Navigate to QR code generator page
  const navigateToQRGenerator = () => {
    navigate('/qr-generator');
  };
  // Filter users based on search term and filter status
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && user.status === filterStatus;
  });
  // Filter artworks based on search term and filter status
  const filteredArtworks = mockArtworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) || artwork.artist.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && artwork.status.toLowerCase() === filterStatus;
  });
  return <div className="w-full min-h-screen bg-gray-50">
      <header className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <img src="/Artify_Logo_7C3AED.png" alt="Artify" className="h-10" />
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
                <button onClick={navigateToQRGenerator} className="p-1 rounded-full text-gray-500 hover:text-purple-600 focus:outline-none flex items-center gap-2">
                  <QrCodeIcon className="h-6 w-6" />
                  <span className="text-sm">QR Codes</span>
                </button>
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
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate font-sans">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage users, artworks, and platform activity
            </p>
          </div>
        </div>
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button onClick={() => setActiveTab('users')} className={`${activeTab === 'users' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}>
              <UsersIcon className="h-5 w-5 mr-2" />
              Users
            </button>
            <button onClick={() => setActiveTab('artworks')} className={`${activeTab === 'artworks' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}>
              <ImageIcon className="h-5 w-5 mr-2" />
              Artworks
            </button>
          </nav>
        </div>
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative rounded-md shadow-sm flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 pr-4 border" placeholder={`Search ${activeTab === 'users' ? 'users' : 'artworks'}...`} value={searchTerm} onChange={handleSearch} />
          </div>
          <div className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5 text-gray-400" />
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md border" value={filterStatus} onChange={handleFilterChange}>
              <option value="all">All</option>
              {activeTab === 'users' ? <>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </> : <>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                </>}
            </select>
          </div>
        </div>
        {/* Users Table */}
        {activeTab === 'users' && <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Artworks
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map(user => <tr key={user.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openUserDetail(user)}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {user.avatar ? <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} /> : <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span className="text-purple-600 font-medium">
                                      {user.name.charAt(0)}
                                    </span>
                                  </div>}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.artworksCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.joinedDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="text-purple-600 hover:text-purple-900" onClick={e => {
                          e.stopPropagation();
                          console.log('Edit user:', user.name);
                        }}>
                                <EditIcon className="h-5 w-5" />
                              </button>
                              {user.status !== 'suspended' ? <button className="text-red-600 hover:text-red-900" onClick={e => {
                          e.stopPropagation();
                          console.log('Suspend user:', user.name);
                        }}>
                                  <XCircleIcon className="h-5 w-5" />
                                </button> : <button className="text-green-600 hover:text-green-900" onClick={e => {
                          e.stopPropagation();
                          console.log('Reactivate user:', user.name);
                        }}>
                                  <CheckCircleIcon className="h-5 w-5" />
                                </button>}
                              <button className="text-gray-600 hover:text-gray-900" onClick={e => {
                          e.stopPropagation();
                          console.log('Delete user:', user.name);
                        }}>
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>}
        {/* Artworks Table */}
        {activeTab === 'artworks' && <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Artwork
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Artist
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredArtworks.map(artwork => <tr key={artwork.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openArtworkDetail(artwork)}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-md object-cover" src={artwork.image} alt={artwork.title} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {artwork.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {artwork.medium}, {artwork.year}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {artwork.artist}
                            </div>
                            <div className="text-sm text-gray-500">
                              {artwork.artistEmail}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${artwork.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {artwork.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {artwork.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {artwork.createdDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="text-purple-600 hover:text-purple-900" onClick={e => {
                          e.stopPropagation();
                          console.log('Edit artwork:', artwork.title);
                        }}>
                                <EditIcon className="h-5 w-5" />
                              </button>
                              {artwork.status !== 'Verified' ? <button className="text-green-600 hover:text-green-900" onClick={e => {
                          e.stopPropagation();
                          console.log('Verify artwork:', artwork.title);
                        }}>
                                  <CheckCircleIcon className="h-5 w-5" />
                                </button> : <button className="text-yellow-600 hover:text-yellow-900" onClick={e => {
                          e.stopPropagation();
                          console.log('Unverify artwork:', artwork.title);
                        }}>
                                  <XCircleIcon className="h-5 w-5" />
                                </button>}
                              <button className="text-gray-600 hover:text-gray-900" onClick={e => {
                          e.stopPropagation();
                          console.log('Delete artwork:', artwork.title);
                        }}>
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>}
        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <UsersIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Users
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {mockUsers.length}
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
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <ImageIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Artworks
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {mockArtworks.length}
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
                      Verified Artworks
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {mockArtworks.filter(a => a.status === 'Verified').length}
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
                      Pending Verification
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {mockArtworks.filter(a => a.status === 'Pending').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* User Detail Modal */}
      <UserDetailModal user={selectedUser} isOpen={isUserModalOpen} onClose={closeUserDetail} />
      {/* Artwork Detail Modal */}
      <AdminArtworkDetailModal artwork={selectedArtwork} isOpen={isArtworkModalOpen} onClose={closeArtworkDetail} />
    </div>;
};
// Mock data for users
const mockUsers = [{
  id: 1,
  name: 'Sarah Chen',
  email: 'sarah@example.com',
  status: 'active',
  artworksCount: 12,
  joinedDate: 'Jan 15, 2023',
  avatar: "/Screenshot_2025-06-23_at_2.20.05_PM.png"
}, {
  id: 2,
  name: 'Marcus Rodriguez',
  email: 'marcus@example.com',
  status: 'active',
  artworksCount: 8,
  joinedDate: 'Feb 3, 2023',
  avatar: "/Screenshot_2025-06-23_at_2.19.59_PM.png"
}, {
  id: 3,
  name: 'Emma Thompson',
  email: 'emma@example.com',
  status: 'active',
  artworksCount: 15,
  joinedDate: 'Mar 22, 2023',
  avatar: "/Screenshot_2025-06-23_at_2.20.11_PM.png"
}, {
  id: 4,
  name: 'David Kim',
  email: 'david@example.com',
  status: 'pending',
  artworksCount: 0,
  joinedDate: 'Apr 10, 2023',
  avatar: null
}, {
  id: 5,
  name: 'Jessica Wong',
  email: 'jessica@example.com',
  status: 'suspended',
  artworksCount: 3,
  joinedDate: 'Jan 5, 2023',
  avatar: null
}, {
  id: 6,
  name: 'Michael Johnson',
  email: 'michael@example.com',
  status: 'active',
  artworksCount: 7,
  joinedDate: 'May 18, 2023',
  avatar: null
}, {
  id: 7,
  name: 'Admin User',
  email: 'admin@artifynow.net',
  status: 'active',
  artworksCount: 0,
  joinedDate: 'Jan 1, 2023',
  avatar: null
}];
// Mock data for artworks
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
  createdDate: 'Mar 15, 2023'
}, {
  id: 2,
  title: 'Urban Reflections',
  artist: 'Sarah Chen',
  artistEmail: 'sarah@example.com',
  image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  medium: 'Acrylic on Canvas',
  year: 2022,
  status: 'Pending',
  price: '$1,800',
  createdDate: 'Apr 2, 2023'
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
  createdDate: 'Feb 28, 2023'
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
  createdDate: 'Jan 12, 2023'
}, {
  id: 5,
  title: 'Digital Dreamscape',
  artist: 'Emma Thompson',
  artistEmail: 'emma@example.com',
  image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  medium: 'Digital Art',
  year: 2023,
  status: 'Pending',
  price: '$950',
  createdDate: 'May 5, 2023'
}, {
  id: 6,
  title: 'Geometric Harmony',
  artist: 'Marcus Rodriguez',
  artistEmail: 'marcus@example.com',
  image: 'https://images.unsplash.com/photo-1584448141569-69f342da535c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  medium: 'Acrylic on Canvas',
  year: 2022,
  status: 'Verified',
  price: '$2,100',
  createdDate: 'Apr 18, 2023'
}, {
  id: 7,
  title: 'Ethereal Landscape',
  artist: 'Sarah Chen',
  artistEmail: 'sarah@example.com',
  image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  medium: 'Oil on Canvas',
  year: 2023,
  status: 'Verified',
  price: '$2,800',
  createdDate: 'Mar 30, 2023'
}, {
  id: 8,
  title: 'Vibrant Cityscape',
  artist: 'Jessica Wong',
  artistEmail: 'jessica@example.com',
  image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  medium: 'Acrylic on Canvas',
  year: 2022,
  status: 'Pending',
  price: '$2,200',
  createdDate: 'Feb 15, 2023'
}];