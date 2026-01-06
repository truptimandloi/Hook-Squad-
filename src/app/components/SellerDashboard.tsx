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
  DollarSign,
  TrendingUp,
  BarChart3,
  Users,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Listing {
  id: string;
  category: string;
  description: string;
  quantity: number;
  price: number;
  availability: string;
  location: string;
  status: 'available' | 'reserved' | 'sold';
  leads: number;
  image: string;
}

const mockListings: Listing[] = [
  {
    id: '1',
    category: 'Plastic',
    description: 'Industrial Plastic Pellets - High-grade recycled HDPE',
    quantity: 25,
    price: 450,
    availability: 'Weekly',
    location: 'San Francisco, CA',
    status: 'available',
    leads: 12,
    image: 'https://images.unsplash.com/photo-1643639924600-e047c785e268?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFzdGljJTIwcmVjeWNsaW5nJTIwbWF0ZXJpYWxzfGVufDF8fHx8MTc2NzY4MTIwMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    category: 'Metal',
    description: 'Scrap Metal Mix - Ferrous and non-ferrous metals',
    quantity: 50,
    price: 320,
    availability: 'Monthly',
    location: 'Oakland, CA',
    status: 'reserved',
    leads: 8,
    image: 'https://images.unsplash.com/photo-1761665698795-ac9df3438b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMHNjcmFwJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3Njc2ODEyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    category: 'Paper',
    description: 'Cardboard & Paper Waste - Sorted for pulping',
    quantity: 40,
    price: 90,
    availability: 'Daily',
    location: 'Fremont, CA',
    status: 'available',
    leads: 15,
    image: 'https://images.unsplash.com/photo-1705837864006-221974a37ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMHJlY3ljbGluZyUyMGNhcmRib2FyZHxlbnwxfHx8fDE3Njc2ODEyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmitListing = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Seller</p>
              <p className="text-slate-900">{user?.name}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'dashboard'
                ? 'bg-purple-50 text-purple-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveView('list-waste')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'list-waste'
                ? 'bg-purple-50 text-purple-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>List Waste</span>
          </button>

          <button
            onClick={() => setActiveView('listings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'listings'
                ? 'bg-purple-50 text-purple-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <List className="w-5 h-5" />
            <span>Active Listings</span>
            <Badge className="ml-auto bg-purple-100 text-purple-700 hover:bg-purple-100">
              {mockListings.length}
            </Badge>
          </button>

          <button
            onClick={() => setActiveView('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'orders'
                ? 'bg-purple-50 text-purple-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Orders</span>
            <Badge className="ml-auto bg-purple-100 text-purple-700 hover:bg-purple-100">2</Badge>
          </button>

          <button
            onClick={() => setActiveView('messages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'messages'
                ? 'bg-purple-50 text-purple-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
            <Badge className="ml-auto bg-purple-100 text-purple-700 hover:bg-purple-100">3</Badge>
          </button>

          <button
            onClick={() => setActiveView('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'profile'
                ? 'bg-purple-50 text-purple-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200">
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
        <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search listings, orders..."
                className="pl-10 rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-8">
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell className="w-6 h-6 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">
                {user?.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeView === 'dashboard' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl text-slate-900">Seller Dashboard</h1>
                <Button
                  onClick={() => setShowAddListingModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Listing
                </Button>
              </div>

              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-600">Total Revenue</p>
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl text-slate-900">$48.2K</p>
                    <p className="text-sm text-emerald-600 mt-2">+18% this month</p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-600">Active Listings</p>
                      <List className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl text-slate-900">{mockListings.length}</p>
                    <p className="text-sm text-slate-600 mt-2">2 reserved</p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-600">Total Waste Recycled</p>
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl text-slate-900">285</p>
                    <p className="text-sm text-slate-600 mt-2">tons total</p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-600">Leads Received</p>
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl text-slate-900">35</p>
                    <p className="text-sm text-emerald-600 mt-2">+12 this week</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Listings */}
              <div>
                <h2 className="text-xl mb-4 text-slate-900">Recent Listings</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mockListings.map((listing) => (
                    <Card key={listing.id} className="border-slate-200 overflow-hidden">
                      <div className="relative h-40 bg-slate-100">
                        <ImageWithFallback
                          src={listing.image}
                          alt={listing.category}
                          className="w-full h-full object-cover"
                        />
                        <Badge
                          className={`absolute top-3 right-3 ${
                            listing.status === 'available'
                              ? 'bg-emerald-600 text-white'
                              : listing.status === 'reserved'
                              ? 'bg-amber-600 text-white'
                              : 'bg-slate-600 text-white'
                          }`}
                        >
                          {listing.status}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="mb-2 text-slate-900">{listing.category}</h3>
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                          {listing.description}
                        </p>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-slate-600">{listing.quantity} tons</span>
                          <span className="text-purple-600">${listing.price}/ton</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Users className="w-4 h-4" />
                          <span>{listing.leads} leads</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'list-waste' && (
            <div>
              <h1 className="text-3xl mb-6 text-slate-900">Add New Waste Listing</h1>
              <Card className="border-slate-200 max-w-3xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmitListing} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Material Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger className="rounded-lg">
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
                        className="rounded-lg"
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
                          className="rounded-lg"
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
                          className="rounded-lg"
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
                        <SelectTrigger className="rounded-lg">
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
                        className="rounded-lg"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="photos">Upload Photos</Label>
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-purple-300 transition-colors cursor-pointer">
                        <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 rounded-lg"
                        onClick={() => setActiveView('dashboard')}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg"
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
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl text-slate-900">Active Listings</h1>
                <Button
                  onClick={() => setShowAddListingModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Listing
                </Button>
              </div>

              <Card className="border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Leads</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockListings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                              <ImageWithFallback
                                src={listing.image}
                                alt={listing.category}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm text-slate-900">{listing.category}</p>
                              <p className="text-xs text-slate-500">{listing.availability}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-purple-100 text-purple-700">
                            {listing.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-900">{listing.quantity} tons</TableCell>
                        <TableCell className="text-slate-900">${listing.price}/ton</TableCell>
                        <TableCell className="text-slate-900">{listing.leads}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              listing.status === 'available'
                                ? 'bg-emerald-100 text-emerald-700'
                                : listing.status === 'reserved'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-slate-100 text-slate-700'
                            }
                          >
                            {listing.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeView === 'orders' && (
            <div>
              <h1 className="text-3xl mb-6 text-slate-900">Orders & Negotiations</h1>
              <Card className="border-slate-200">
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-lg text-slate-600 mb-2">No active orders</p>
                    <p className="text-sm text-slate-500">
                      Orders from buyers will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === 'messages' && (
            <div>
              <h1 className="text-3xl mb-6 text-slate-900">Messages</h1>
              <Card className="border-slate-200">
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-lg text-slate-600 mb-2">No messages yet</p>
                    <p className="text-sm text-slate-500">
                      Messages from buyers will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === 'profile' && (
            <div>
              <h1 className="text-3xl mb-6 text-slate-900">Profile Settings</h1>
              <Card className="border-slate-200 max-w-2xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-slate-700 mb-2 block">Company Name</label>
                      <Input defaultValue={user?.name} className="rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-700 mb-2 block">Email</label>
                      <Input type="email" defaultValue="seller@company.com" className="rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-700 mb-2 block">Industry</label>
                      <Input defaultValue="Manufacturing" className="rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-700 mb-2 block">Location</label>
                      <Input defaultValue="San Francisco, CA" className="rounded-lg" />
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg">
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
        <DialogContent className="sm:max-w-2xl bg-white">
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
                <SelectTrigger className="rounded-lg">
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
                className="rounded-lg"
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
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-price">Price ($/ton)</Label>
                <Input
                  id="modal-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-lg"
                onClick={() => setShowAddListingModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg"
              >
                Publish
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
