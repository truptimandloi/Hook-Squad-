import { useState } from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  List,
  ShoppingCart,
  MessageSquare,
  User,
  Search,
  Bell,
  LogOut,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';

interface Listing {
  id: string;
  category: string;
  description: string;
  quantity: number;
  price: number;
  availability: string;
  location: string;
}

const mockListings: Listing[] = [
  {
    id: '1',
    category: 'Plastic',
    description: 'Industrial plastic waste',
    quantity: 100,
    price: 150,
    availability: 'daily',
    location: 'San Francisco, CA',
  },
  {
    id: '2',
    category: 'Metal',
    description: 'Scrap metal collection',
    quantity: 50,
    price: 200,
    availability: 'weekly',
    location: 'Los Angeles, CA',
  },
];

export function SellerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');
  const [showAddListingModal, setShowAddListingModal] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    quantity: '',
    price: '',
    availability: '',
    location: '',
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddListing = () => {
    // Add listing logic here
    setShowAddListingModal(false);
    setFormData({
      category: '',
      description: '',
      quantity: '',
      price: '',
      availability: '',
      location: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">Seller Dashboard</h2>
            <p className="text-gray-600 mt-2">Welcome, {user?.email}</p>
          </div>
          <nav className="mt-6">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`w-full text-left px-6 py-3 hover:bg-gray-100 ${
                activeView === 'dashboard' ? 'bg-gray-100 border-r-4 border-green-500' : ''
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveView('listings')}
              className={`w-full text-left px-6 py-3 hover:bg-gray-100 ${
                activeView === 'listings' ? 'bg-gray-100 border-r-4 border-green-500' : ''
              }`}
            >
              My Listings
            </button>
            <button
              onClick={() => setActiveView('orders')}
              className={`w-full text-left px-6 py-3 hover:bg-gray-100 ${
                activeView === 'orders' ? 'bg-gray-100 border-r-4 border-green-500' : ''
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveView('messages')}
              className={`w-full text-left px-6 py-3 hover:bg-gray-100 ${
                activeView === 'messages' ? 'bg-gray-100 border-r-4 border-green-500' : ''
              }`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveView('profile')}
              className={`w-full text-left px-6 py-3 hover:bg-gray-100 ${
                activeView === 'profile' ? 'bg-gray-100 border-r-4 border-green-500' : ''
              }`}
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-6 py-3 hover:bg-red-100 text-red-600"
            >
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeView === 'dashboard' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700">Total Listings</h3>
                  <p className="text-3xl font-bold text-green-600">{mockListings.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700">Active Orders</h3>
                  <p className="text-3xl font-bold text-blue-600">12</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
                  <p className="text-3xl font-bold text-purple-600">$2,450</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Listings</h3>
                <div className="space-y-4">
                  {mockListings.slice(0, 3).map((listing) => (
                    <div key={listing.id} className="flex justify-between items-center border-b pb-4">
                      <div>
                        <p className="font-semibold">{listing.category}</p>
                        <p className="text-gray-600">{listing.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${listing.price}</p>
                        <p className="text-gray-600">{listing.quantity} units</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'listings' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
                <Button onClick={() => setShowAddListingModal(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Listing
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockListings.map((listing) => (
                  <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>{listing.category}</span>
                        <Badge variant="secondary">{listing.availability}</Badge>
                      </CardTitle>
                      <CardDescription>{listing.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-semibold">{listing.quantity} units</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-semibold text-green-600">${listing.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-semibold">{listing.location}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeView === 'orders' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Orders</h1>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600">Orders management coming soon...</p>
              </div>
            </div>
          )}

          {activeView === 'messages' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Messages</h1>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600">Messages feature coming soon...</p>
              </div>
            </div>
          )}

          {activeView === 'profile' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile Settings</h1>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600">Profile management coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Listing Modal */}
      <Dialog open={showAddListingModal} onOpenChange={setShowAddListingModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Listing</DialogTitle>
            <DialogDescription>
              Fill in the details for your waste material listing.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleAddListing(); }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plastic">Plastic</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="glass">Glass</SelectItem>
                    <SelectItem value="paper">Paper</SelectItem>
                    <SelectItem value="textile">Textile</SelectItem>
                    <SelectItem value="e-waste">E-waste</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="col-span-3"
                  placeholder="Describe your waste material"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="col-span-3"
                  placeholder="Enter quantity"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="col-span-3"
                  placeholder="Enter price per unit"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="availability" className="text-right">
                  Availability
                </Label>
                <Select value={formData.availability} onValueChange={(value) => setFormData({...formData, availability: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="col-span-3"
                  placeholder="Enter location"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Listing</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
