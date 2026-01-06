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
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitListing = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submitting listing:', formData);
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Seller Dashboard</p>
              <p className="text-gray-900 font-semibold">{user?.name}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'dashboard'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveView('list-waste')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'list-waste'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>List Waste</span>
          </button>

          <button
            onClick={() => setActiveView('listings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'listings'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <List className="w-5 h-5" />
            <span>My Listings</span>
          </button>

          <button
            onClick={() => setActiveView('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'orders'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Orders</span>
          </button>

          <button
            onClick={() => setActiveView('messages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'messages'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
          </button>

          <button
            onClick={() => setActiveView('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'profile'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 rounded-lg border-gray-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-purple-600 text-white">
                {user?.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeView === 'dashboard' && (
            <div>
              <h1 className="text-2xl mb-6 text-gray-900">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Listings</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                      </div>
                      <Package className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Orders</p>
                        <p className="text-2xl font-bold text-gray-900">3</p>
                      </div>
                      <ShoppingCart className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">$2,450</p>
                      </div>
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-600 font-bold">$</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-sm text-gray-600">New order received from GreenTech Industries</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-sm text-gray-600">Listing "Plastic Scrap" was viewed 15 times</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <p className="text-sm text-gray-600">Message received from EcoRecycle Corp</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === 'list-waste' && (
            <div>
              <h1 className="text-2xl mb-6 text-gray-900">Add New Waste Listing</h1>
              <Card className="max-w-2xl">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmitListing} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Material Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plastic">Plastic</SelectItem>
                          <SelectItem value="metal">Metal</SelectItem>
                          <SelectItem value="glass">Glass</SelectItem>
                          <SelectItem value="textile">Textile</SelectItem>
                          <SelectItem value="paper">Paper</SelectItem>
                          <SelectItem value="e-waste">E-waste</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Provide detailed description of the waste material..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity (tons) *</Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={formData.quantity}
                          onChange={(e) => handleInputChange('quantity', e.target.value)}
                          placeholder="0"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price">Expected Price ($/ton) *</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          placeholder="0"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability Frequency *</Label>
                      <Select
                        value={formData.availability}
                        onValueChange={(value) => handleInputChange('availability', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="one-time">One-time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="City, State"
                        required
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setActiveView('dashboard')}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        Publish Listing
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === 'listings' && (
            <div>
              <h1 className="text-2xl mb-6 text-gray-900">My Listings</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockListings.map((listing) => (
                  <Card key={listing.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{listing.category}</h3>
                            <p className="text-gray-600 text-sm">{listing.location}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">{listing.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-semibold">{listing.quantity} tons</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-semibold">${listing.price}/ton</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Availability:</span>
                          <span className="font-semibold capitalize">{listing.availability}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeView === 'orders' && (
            <div>
              <h1 className="text-2xl mb-6 text-gray-900">Orders & Negotiations</h1>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 mb-2">No active orders</p>
                    <p className="text-sm text-gray-500">
                      Orders from buyers will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === 'messages' && (
            <div>
              <h1 className="text-2xl mb-6 text-gray-900">Messages</h1>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 mb-2">No messages yet</p>
                    <p className="text-sm text-gray-500">
                      Messages from buyers will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === 'profile' && (
            <div>
              <h1 className="text-2xl mb-6 text-gray-900">Profile Settings</h1>
              <Card className="max-w-2xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">Company Name</label>
                      <Input defaultValue={user?.name} />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">Email</label>
                      <Input type="email" defaultValue="seller@company.com" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">Industry</label>
                      <Input defaultValue="Manufacturing" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">Location</label>
                      <Input defaultValue="San Francisco, CA" />
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Add Listing Modal */}
      <Dialog open={showAddListingModal} onOpenChange={setShowAddListingModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Waste Listing</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitListing} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="modal-category">Material Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plastic">Plastic</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                  <SelectItem value="glass">Glass</SelectItem>
                  <SelectItem value="textile">Textile</SelectItem>
                  <SelectItem value="paper">Paper</SelectItem>
                  <SelectItem value="e-waste">E-waste</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-description">Description</Label>
              <Textarea
                id="modal-description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Provide detailed description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-quantity">Quantity (tons)</Label>
                <Input
                  id="modal-quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-price">Price ($/ton)</Label>
                <Input
                  id="modal-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-availability">Availability</Label>
              <Select
                value={formData.availability}
                onValueChange={(value) => handleInputChange('availability', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="one-time">One-time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-location">Location</Label>
              <Input
                id="modal-location"
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, State"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddListingModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Add Listing
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}