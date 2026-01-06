import { useState } from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  User,
  Search,
  Bell,
  LogOut,
  Filter,
  MapPin,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  Truck,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Material {
  id: string;
  type: string;
  image: string;
  price: number;
  unit: string;
  quantity: number;
  seller: string;
  location: string;
  distance: string;
  description: string;
  category: string;
}

const mockMaterials: Material[] = [
  {
    id: '1',
    type: 'Industrial Plastic Pellets',
    image: 'https://images.unsplash.com/photo-1643639924600-e047c785e268?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFzdGljJTIwcmVjeWNsaW5nJTIwbWF0ZXJpYWxzfGVufDF8fHx8MTc2NzY4MTIwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 450,
    unit: 'ton',
    quantity: 25,
    seller: 'ABC Manufacturing',
    location: 'San Francisco, CA',
    distance: '12 mi',
    description: 'High-grade recycled HDPE pellets',
    category: 'Plastic',
  },
  {
    id: '2',
    type: 'Scrap Metal Mix',
    image: 'https://images.unsplash.com/photo-1761665698795-ac9df3438b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMHNjcmFwJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3Njc2ODEyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 320,
    unit: 'ton',
    quantity: 50,
    seller: 'MetalWorks Inc',
    location: 'Oakland, CA',
    distance: '8 mi',
    description: 'Mixed ferrous and non-ferrous metals',
    category: 'Metal',
  },
  {
    id: '3',
    type: 'Crushed Glass Cullet',
    image: 'https://images.unsplash.com/photo-1763885915693-2a9e075e80ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xlZCUyMGdsYXNzJTIwbWF0ZXJpYWxzfGVufDF8fHx8MTc2NzY4MTIwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 180,
    unit: 'ton',
    quantity: 30,
    seller: 'GlassTech Solutions',
    location: 'San Jose, CA',
    distance: '22 mi',
    description: 'Clean glass cullet, ready for remelting',
    category: 'Glass',
  },
  {
    id: '4',
    type: 'Textile Fiber Waste',
    image: 'https://images.unsplash.com/photo-1729838569152-f2cc1626fbd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlJTIwd2FzdGUlMjBmYWJyaWN8ZW58MXx8fHwxNzY3NjgxMjAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 220,
    unit: 'ton',
    quantity: 15,
    seller: 'Fabric Industries',
    location: 'Berkeley, CA',
    distance: '15 mi',
    description: 'Cotton and polyester textile waste',
    category: 'Textile',
  },
  {
    id: '5',
    type: 'Cardboard & Paper Waste',
    image: 'https://images.unsplash.com/photo-1705837864006-221974a37ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMHJlY3ljbGluZyUyMGNhcmRib2FyZHxlbnwxfHx8fDE3Njc2ODEyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 90,
    unit: 'ton',
    quantity: 40,
    seller: 'Paper Co',
    location: 'Fremont, CA',
    distance: '18 mi',
    description: 'Sorted cardboard and paper for pulping',
    category: 'Paper',
  },
  {
    id: '6',
    type: 'Electronic Component Scrap',
    image: 'https://images.unsplash.com/photo-1643639924600-e047c785e268?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFzdGljJTIwcmVjeWNsaW5nJTIwbWF0ZXJpYWxzfGVufDF8fHx8MTc2NzY4MTIwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 890,
    unit: 'ton',
    quantity: 5,
    seller: 'Tech Recyclers',
    location: 'Palo Alto, CA',
    distance: '28 mi',
    description: 'PCB boards and electronic components',
    category: 'E-waste',
  },
];

const categories = ['All', 'Plastic', 'Metal', 'Glass', 'Textile', 'Paper', 'E-waste'];

export function BuyerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch = material.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Buyer</p>
              <p className="text-slate-900">{user?.name}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'dashboard'
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveView('browse')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'browse'
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Browse Materials</span>
          </button>

          <button
            onClick={() => setActiveView('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'orders'
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>My Orders</span>
            <Badge className="ml-auto bg-emerald-100 text-emerald-700 hover:bg-emerald-100">3</Badge>
          </button>

          <button
            onClick={() => setActiveView('messages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'messages'
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
            <Badge className="ml-auto bg-emerald-100 text-emerald-700 hover:bg-emerald-100">2</Badge>
          </button>

          <button
            onClick={() => setActiveView('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'profile'
                ? 'bg-emerald-50 text-emerald-700'
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
                placeholder="Search materials, sellers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
                {user?.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeView === 'browse' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl text-slate-900">Browse Materials</h1>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="rounded-lg"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>

              {/* Category Chips */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      selectedCategory === category
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Materials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map((material) => (
                  <Card
                    key={material.id}
                    className="group cursor-pointer hover:shadow-xl transition-shadow overflow-hidden border-slate-200"
                    onClick={() => setSelectedMaterial(material)}
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <ImageWithFallback
                        src={material.image}
                        alt={material.type}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-emerald-600 text-white">
                          {material.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg mb-2 text-slate-900">{material.type}</h3>
                      <p className="text-sm text-slate-600 mb-4">{material.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl text-emerald-600">
                            ${material.price}
                          </span>
                          <span className="text-sm text-slate-500">per {material.unit}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Package className="w-4 h-4" />
                          <span>{material.quantity} tons available</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span>{material.distance} away</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-sm text-slate-600">{material.seller}</span>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 rounded-lg">
                          Request Deal
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
              <h1 className="text-3xl mb-6 text-slate-900">My Orders</h1>

              <div className="space-y-4">
                <Card className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg mb-1 text-slate-900">Industrial Plastic Pellets</h3>
                        <p className="text-sm text-slate-600">ABC Manufacturing • 25 tons</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700">
                        <Clock className="w-3 h-3 mr-1" />
                        Negotiation
                      </Badge>
                    </div>

                    {/* Order Stepper */}
                    <div className="flex items-center gap-2 my-6">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs mt-2 text-slate-600">Requested</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-emerald-600"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs mt-2 text-slate-600">Negotiation</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-slate-200"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-slate-400" />
                        </div>
                        <span className="text-xs mt-2 text-slate-600">Accepted</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-slate-200"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                          <Truck className="w-5 h-5 text-slate-400" />
                        </div>
                        <span className="text-xs mt-2 text-slate-600">Shipped</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-slate-200"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-slate-400" />
                        </div>
                        <span className="text-xs mt-2 text-slate-600">Completed</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 rounded-lg">
                        View Details
                      </Button>
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 rounded-lg">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Seller
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg mb-1 text-slate-900">Scrap Metal Mix</h3>
                        <p className="text-sm text-slate-600">MetalWorks Inc • 50 tons</p>
                      </div>
                      <Badge className="bg-sky-100 text-sky-700">
                        <Truck className="w-3 h-3 mr-1" />
                        Shipped
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 my-6">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs mt-2 text-slate-600">Requested</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-emerald-600"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs mt-2 text-slate-600">Negotiation</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-emerald-600"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs mt-2 text-slate-600">Accepted</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-sky-600"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center">
                          <Truck className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs mt-2 text-slate-600">Shipped</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-slate-200"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-slate-400" />
                        </div>
                        <span className="text-xs mt-2 text-slate-600">Completed</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 rounded-lg">
                        Track Shipment
                      </Button>
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 rounded-lg">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Seller
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeView === 'dashboard' && (
            <div>
              <h1 className="text-3xl mb-6 text-slate-900">Dashboard</h1>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-600">Active Orders</p>
                      <ShoppingCart className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-3xl text-slate-900">3</p>
                    <p className="text-sm text-emerald-600 mt-2">+2 this month</p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-600">Total Saved</p>
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-3xl text-slate-900">$24.5K</p>
                    <p className="text-sm text-emerald-600 mt-2">vs virgin materials</p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-600">Materials Purchased</p>
                      <Package className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-3xl text-slate-900">120</p>
                    <p className="text-sm text-slate-600 mt-2">tons total</p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-600">Avg. Discount</p>
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-3xl text-slate-900">35%</p>
                    <p className="text-sm text-emerald-600 mt-2">below market</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recently Added Materials */}
              <div className="mb-8">
                <h2 className="text-xl mb-4 text-slate-900">Recently Added Materials</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mockMaterials.slice(0, 3).map((material) => (
                    <Card
                      key={material.id}
                      className="group cursor-pointer hover:shadow-lg transition-shadow border-slate-200"
                    >
                      <div className="relative h-40 overflow-hidden bg-slate-100">
                        <ImageWithFallback
                          src={material.image}
                          alt={material.type}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="mb-2 text-slate-900">{material.type}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-600">${material.price}/{material.unit}</span>
                          <Badge className="bg-emerald-100 text-emerald-700">{material.category}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
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
                      Start a conversation by requesting a deal on materials
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
                      <Input type="email" defaultValue="buyer@company.com" className="rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-700 mb-2 block">Industry</label>
                      <Input defaultValue="Manufacturing" className="rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-700 mb-2 block">Location</label>
                      <Input defaultValue="San Francisco, CA" className="rounded-lg" />
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-lg">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
