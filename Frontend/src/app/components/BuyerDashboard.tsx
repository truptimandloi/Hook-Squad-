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
  Send,
  Camera,
  Save,
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
    <div className="flex h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50">
      {/* 3D Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-3d"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-3d"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-rotate-3d"></div>
      </div>

      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-white via-stone-50 to-amber-50 border-r-2 border-amber-200 flex flex-col shadow-2xl relative z-10">
        <div className="p-8 border-b-2 border-amber-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-600 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-stone-600 font-medium">Buyer Dashboard</p>
              <p className="text-stone-900 font-bold text-lg">{user?.name}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-3">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
              activeView === 'dashboard'
                ? 'bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-xl'
                : 'text-stone-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 hover:shadow-lg'
            }`}
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="font-semibold">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveView('browse')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
              activeView === 'browse'
                ? 'bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-xl'
                : 'text-stone-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 hover:shadow-lg'
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="font-semibold">Browse Materials</span>
          </button>

          <button
            onClick={() => setActiveView('orders')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
              activeView === 'orders'
                ? 'bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-xl'
                : 'text-stone-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 hover:shadow-lg'
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="font-semibold">My Orders</span>
            <Badge className="ml-auto bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg animate-pulse">3</Badge>
          </button>

          <button
            onClick={() => setActiveView('messages')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
              activeView === 'messages'
                ? 'bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-xl'
                : 'text-stone-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 hover:shadow-lg'
            }`}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="font-semibold">Messages</span>
            <Badge className="ml-auto bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg animate-pulse">2</Badge>
          </button>

          <button
            onClick={() => setActiveView('profile')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
              activeView === 'profile'
                ? 'bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-xl'
                : 'text-stone-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 hover:shadow-lg'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="font-semibold">Profile</span>
          </button>
        </nav>

        <div className="p-6 border-t-2 border-amber-200">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl py-4 font-semibold transition-all transform hover:scale-105"
          >
            <LogOut className="w-6 h-6 mr-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-white via-stone-50 to-amber-50 border-b-2 border-amber-200 px-10 py-6 flex items-center justify-between shadow-lg">
          <div className="flex-1 max-w-3xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-stone-400" />
              <Input
                type="text"
                placeholder="Search materials, sellers, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 rounded-2xl border-2 border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 h-14 text-lg shadow-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 ml-10">
            <button className="relative p-3 rounded-2xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 transition-all transform hover:scale-110 shadow-lg">
              <Bell className="w-7 h-7 text-stone-600" />
              <span className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-pulse shadow-lg"></span>
            </button>

            <Avatar className="w-14 h-14 shadow-xl border-2 border-amber-200">
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-amber-600 text-white text-lg font-bold">
                {user?.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10">
          {activeView === 'browse' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl text-stone-900 font-bold mb-2">Browse Materials</h1>
                  <p className="text-stone-600 text-lg">Discover sustainable materials for your business</p>
                </div>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="rounded-2xl border-2 border-amber-400 hover:border-emerald-500 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 px-6 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all"
                >
                  <Filter className="w-5 h-5 mr-3" />
                  Advanced Filters
                </Button>
              </div>

              {/* Category Chips */}
              <div className="flex gap-3 mb-10 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 font-semibold shadow-lg ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-xl'
                        : 'bg-gradient-to-r from-white to-stone-50 text-stone-700 border-2 border-stone-200 hover:border-emerald-300 hover:shadow-xl'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Materials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMaterials.map((material) => (
                  <Card
                    key={material.id}
                    className="group cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-stone-200 hover:border-emerald-300 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-stone-50"
                    onClick={() => setSelectedMaterial(material)}
                  >
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-stone-100 to-amber-100">
                      <ImageWithFallback
                        src={material.image}
                        alt={material.type}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-xl px-3 py-1 text-sm font-semibold">
                          {material.category}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl mb-3 text-stone-900 font-bold leading-tight">{material.type}</h3>
                      <p className="text-stone-600 mb-6 leading-relaxed">{material.description}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl text-emerald-600 font-bold">
                            ${material.price}
                          </span>
                          <span className="text-stone-500 font-medium">per {material.unit}</span>
                        </div>

                        <div className="flex items-center gap-3 text-stone-600">
                          <Package className="w-5 h-5 text-amber-500" />
                          <span className="font-medium">{material.quantity} tons available</span>
                        </div>

                        <div className="flex items-center gap-3 text-stone-600">
                          <MapPin className="w-5 h-5 text-emerald-500" />
                          <span className="font-medium">{material.distance} away</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t-2 border-stone-100">
                        <span className="text-stone-600 font-semibold">{material.seller}</span>
                        <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white rounded-xl px-6 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all">
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
              <div className="mb-8">
                <h1 className="text-4xl text-stone-900 font-bold mb-2">My Orders</h1>
                <p className="text-stone-600 text-lg">Track your material procurement journey</p>
              </div>

              <div className="space-y-8">
                <Card className="border-2 border-stone-200 bg-gradient-to-br from-white to-stone-50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl mb-2 text-stone-900 font-bold">Industrial Plastic Pellets</h3>
                        <p className="text-stone-600 text-lg">ABC Manufacturing • 25 tons</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg px-4 py-2 text-sm font-semibold">
                        <Clock className="w-4 h-4 mr-2" />
                        Negotiation
                      </Badge>
                    </div>

                    {/* Order Stepper */}
                    <div className="flex items-center gap-4 my-8">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl">
                          <CheckCircle2 className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-sm mt-3 text-stone-600 font-medium">Requested</span>
                      </div>
                      <div className="flex-1 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-xl animate-pulse">
                          <Clock className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-sm mt-3 text-stone-600 font-medium">Negotiation</span>
                      </div>
                      <div className="flex-1 h-1 bg-stone-200 rounded-full"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center">
                          <CheckCircle2 className="w-7 h-7 text-stone-400" />
                        </div>
                        <span className="text-sm mt-3 text-stone-600 font-medium">Accepted</span>
                      </div>
                      <div className="flex-1 h-1 bg-stone-200 rounded-full"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center">
                          <Truck className="w-7 h-7 text-stone-400" />
                        </div>
                        <span className="text-sm mt-3 text-stone-600 font-medium">Shipped</span>
                      </div>
                      <div className="flex-1 h-1 bg-stone-200 rounded-full"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center">
                          <CheckCircle2 className="w-7 h-7 text-stone-400" />
                        </div>
                        <span className="text-sm mt-3 text-stone-600 font-medium">Completed</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1 rounded-xl py-4 text-lg font-semibold border-2 border-stone-300 hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                        View Details
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white rounded-xl py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all">
                        <MessageSquare className="w-5 h-5 mr-3" />
                        Message Seller
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-stone-200 bg-gradient-to-br from-white to-amber-50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl mb-2 text-stone-900 font-bold">Scrap Metal Mix</h3>
                        <p className="text-stone-600 text-lg">MetalWorks Inc • 50 tons</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-sky-400 to-sky-600 text-white shadow-lg px-4 py-2 text-sm font-semibold">
                        <Truck className="w-4 h-4 mr-2" />
                        Shipped
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 my-8">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl">
                          <CheckCircle2 className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-sm mt-3 text-stone-600 font-medium">Requested</span>
                      </div>
                      <div className="flex-1 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl">
                          <CheckCircle2 className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-sm mt-3 text-stone-600 font-medium">Negotiation</span>
                      </div>
                      <div className="flex-1 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl">
                          <CheckCircle2 className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-sm mt-3 text-stone-600 font-medium">Accepted</span>
                      </div>
                      <div className="flex-1 h-1 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-xl">
                          <Truck className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-sm mt-3 text-stone-600 font-medium">Shipped</span>
                      </div>
                      <div className="flex-1 h-1 bg-stone-200 rounded-full"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center">
                          <CheckCircle2 className="w-7 h-7 text-stone-400" />
                        </div>
                        <span className="text-sm mt-3 text-stone-600 font-medium">Completed</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1 rounded-xl py-4 text-lg font-semibold border-2 border-stone-300 hover:border-sky-400 hover:bg-sky-50 transition-all">
                        Track Shipment
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white rounded-xl py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all">
                        <MessageSquare className="w-5 h-5 mr-3" />
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
              <div className="mb-8">
                <h1 className="text-4xl text-stone-900 font-bold mb-2">Welcome back, {user?.name}!</h1>
                <p className="text-stone-600 text-lg">Here's what's happening with your sustainable material sourcing</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <Card className="border-2 border-stone-200 hover:border-emerald-300 bg-gradient-to-br from-white to-stone-50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-stone-600 font-semibold text-lg">Active Orders</p>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                        <ShoppingCart className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-4xl text-stone-900 font-bold mb-2">3</p>
                    <p className="text-emerald-600 font-semibold">+2 this month</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-stone-200 hover:border-amber-300 bg-gradient-to-br from-white to-amber-50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-stone-600 font-semibold text-lg">Total Saved</p>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-4xl text-stone-900 font-bold mb-2">$24.5K</p>
                    <p className="text-amber-600 font-semibold">vs virgin materials</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-stone-200 hover:border-emerald-300 bg-gradient-to-br from-white to-stone-50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-stone-600 font-semibold text-lg">Materials Purchased</p>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-4xl text-stone-900 font-bold mb-2">120</p>
                    <p className="text-stone-600 font-semibold">tons total</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-stone-200 hover:border-amber-300 bg-gradient-to-br from-white to-amber-50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-stone-600 font-semibold text-lg">Avg. Discount</p>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-4xl text-stone-900 font-bold mb-2">35%</p>
                    <p className="text-amber-600 font-semibold">below market</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recently Added Materials */}
              <div className="mb-8">
                <h2 className="text-2xl mb-6 text-stone-900 font-bold">Recently Added Materials</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {mockMaterials.slice(0, 3).map((material) => (
                    <Card
                      key={material.id}
                      className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-stone-200 hover:border-emerald-300 bg-gradient-to-br from-white to-stone-50 transform hover:scale-105 hover:-translate-y-2"
                    >
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-stone-100 to-amber-100 rounded-t-lg">
                        <ImageWithFallback
                          src={material.image}
                          alt={material.type}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="mb-3 text-stone-900 font-bold text-lg">{material.type}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-600 font-bold text-xl">${material.price}/{material.unit}</span>
                          <Badge className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-lg px-3 py-1 font-semibold">
                            {material.category}
                          </Badge>
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
              <div className="mb-8">
                <h1 className="text-4xl text-stone-900 font-bold mb-2">Messages</h1>
                <p className="text-stone-600 text-lg">Stay connected with your sellers and buyers</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Conversations List */}
                <div className="lg:col-span-1">
                  <Card className="border-2 border-stone-200 bg-gradient-to-br from-white to-stone-50 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl text-stone-900 font-bold">Conversations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-amber-50 border-2 border-emerald-200 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        <Avatar className="w-12 h-12 shadow-lg">
                          <AvatarImage src="/api/placeholder/40/40" />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold">AM</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-stone-900">ABC Manufacturing</h4>
                          <p className="text-sm text-stone-600 truncate">Can we discuss the pricing for...</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-stone-500">2h ago</p>
                          <Badge className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white text-xs mt-1">2</Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white border-2 border-stone-200 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        <Avatar className="w-12 h-12 shadow-lg">
                          <AvatarImage src="/api/placeholder/40/40" />
                          <AvatarFallback className="bg-gradient-to-br from-sky-500 to-sky-600 text-white font-bold">MW</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-stone-900">MetalWorks Inc</h4>
                          <p className="text-sm text-stone-600 truncate">Shipment has been dispatched...</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-stone-500">1d ago</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white border-2 border-stone-200 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        <Avatar className="w-12 h-12 shadow-lg">
                          <AvatarImage src="/api/placeholder/40/40" />
                          <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold">GR</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-stone-900">Green Recycle Co</h4>
                          <p className="text-sm text-stone-600 truncate">New materials available...</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-stone-500">3d ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Chat Area */}
                <div className="lg:col-span-2">
                  <Card className="border-2 border-stone-200 bg-gradient-to-br from-white to-stone-50 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardHeader className="pb-4 border-b border-stone-200">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 shadow-lg">
                          <AvatarImage src="/api/placeholder/40/40" />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold">AM</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold text-stone-900">ABC Manufacturing</h3>
                          <p className="text-stone-600">Online • Industrial Plastic Pellets</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      {/* Messages */}
                      <div className="h-96 overflow-y-auto p-6 space-y-4">
                        <div className="flex gap-4">
                          <Avatar className="w-10 h-10 shadow-lg">
                            <AvatarImage src="/api/placeholder/40/40" />
                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold">AM</AvatarFallback>
                          </Avatar>
                          <div className="bg-gradient-to-r from-emerald-50 to-amber-50 p-4 rounded-2xl rounded-tl-md border-2 border-emerald-200 max-w-xs">
                            <p className="text-stone-900">Hi! We have 25 tons of industrial plastic pellets available. The quality is premium grade A.</p>
                            <p className="text-xs text-stone-500 mt-2">10:30 AM</p>
                          </div>
                        </div>

                        <div className="flex gap-4 justify-end">
                          <div className="bg-gradient-to-r from-emerald-500 to-amber-500 p-4 rounded-2xl rounded-tr-md text-white max-w-xs shadow-lg">
                            <p>That sounds great! What's your best price per ton?</p>
                            <p className="text-xs opacity-75 mt-2">10:35 AM</p>
                          </div>
                          <Avatar className="w-10 h-10 shadow-lg">
                            <AvatarImage src="/api/placeholder/40/40" />
                            <AvatarFallback className="bg-gradient-to-br from-stone-500 to-stone-600 text-white font-bold">BU</AvatarFallback>
                          </Avatar>
                        </div>

                        <div className="flex gap-4">
                          <Avatar className="w-10 h-10 shadow-lg">
                            <AvatarImage src="/api/placeholder/40/40" />
                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold">AM</AvatarFallback>
                          </Avatar>
                          <div className="bg-gradient-to-r from-emerald-50 to-amber-50 p-4 rounded-2xl rounded-tl-md border-2 border-emerald-200 max-w-xs">
                            <p className="text-stone-900">We can offer $450 per ton for bulk orders. This includes delivery to your facility.</p>
                            <p className="text-xs text-stone-500 mt-2">10:40 AM</p>
                          </div>
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="p-6 border-t border-stone-200 bg-gradient-to-r from-stone-50 to-stone-100">
                        <div className="flex gap-4">
                          <Input
                            placeholder="Type your message..."
                            className="flex-1 rounded-xl border-2 border-stone-300 focus:border-emerald-400 focus:ring-emerald-400 py-4 text-lg"
                          />
                          <Button className="bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all">
                            <Send className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeView === 'profile' && (
            <div>
              <div className="mb-8">
                <h1 className="text-4xl text-stone-900 font-bold mb-2">Profile Settings</h1>
                <p className="text-stone-600 text-lg">Manage your account and preferences</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Picture and Basic Info */}
                <div className="lg:col-span-1">
                  <Card className="border-2 border-stone-200 bg-gradient-to-br from-white to-stone-50 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="relative mb-6">
                        <Avatar className="w-24 h-24 mx-auto shadow-2xl border-4 border-white">
                          <AvatarImage src="/api/placeholder/96/96" />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-amber-500 text-white text-2xl font-bold">
                            {user?.name?.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          size="sm"
                          className="absolute bottom-0 right-1/2 translate-x-12 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white rounded-full w-8 h-8 p-0 shadow-lg transform hover:scale-110 transition-all"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      </div>
                      <h3 className="text-xl font-bold text-stone-900 mb-1">{user?.name}</h3>
                      <p className="text-stone-600 mb-4">Buyer Account</p>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-lg px-4 py-2 font-semibold">
                        Verified Buyer
                      </Badge>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <Card className="border-2 border-stone-200 bg-gradient-to-br from-white to-stone-50 shadow-xl hover:shadow-2xl transition-all duration-300 mt-6">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg text-stone-900 font-bold">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-stone-600">Total Orders</span>
                        <span className="font-bold text-stone-900">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-600">Materials Saved</span>
                        <span className="font-bold text-stone-900">120 tons</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-600">Avg. Savings</span>
                        <span className="font-bold text-emerald-600">35%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-600">Member Since</span>
                        <span className="font-bold text-stone-900">Jan 2024</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Settings Form */}
                <div className="lg:col-span-2">
                  <Card className="border-2 border-stone-200 bg-gradient-to-br from-white to-stone-50 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardHeader className="pb-6">
                      <CardTitle className="text-2xl text-stone-900 font-bold">Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-stone-700">Company Name</label>
                          <Input
                            defaultValue={user?.name}
                            className="rounded-xl border-2 border-stone-300 focus:border-emerald-400 focus:ring-emerald-400 py-4 text-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-stone-700">Contact Person</label>
                          <Input
                            defaultValue="John Smith"
                            className="rounded-xl border-2 border-stone-300 focus:border-emerald-400 focus:ring-emerald-400 py-4 text-lg"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-stone-700">Email Address</label>
                          <Input
                            type="email"
                            defaultValue="buyer@company.com"
                            className="rounded-xl border-2 border-stone-300 focus:border-emerald-400 focus:ring-emerald-400 py-4 text-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-stone-700">Phone Number</label>
                          <Input
                            type="tel"
                            defaultValue="+1 (555) 123-4567"
                            className="rounded-xl border-2 border-stone-300 focus:border-emerald-400 focus:ring-emerald-400 py-4 text-lg"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-stone-700">Industry</label>
                          <Input
                            defaultValue="Manufacturing"
                            className="rounded-xl border-2 border-stone-300 focus:border-emerald-400 focus:ring-emerald-400 py-4 text-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-stone-700">Company Size</label>
                          <Input
                            defaultValue="100-500 employees"
                            className="rounded-xl border-2 border-stone-300 focus:border-emerald-400 focus:ring-emerald-400 py-4 text-lg"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-stone-700">Business Address</label>
                        <Input
                          defaultValue="123 Industrial Way, San Francisco, CA 94105"
                          className="rounded-xl border-2 border-stone-300 focus:border-emerald-400 focus:ring-emerald-400 py-4 text-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-stone-700">Preferred Material Types</label>
                        <div className="flex flex-wrap gap-3">
                          {['Plastic', 'Metal', 'Paper', 'Glass', 'Organic'].map((type) => (
                            <Badge
                              key={type}
                              variant="outline"
                              className="cursor-pointer border-2 border-stone-300 hover:border-emerald-400 hover:bg-emerald-50 px-4 py-2 text-sm font-semibold transition-all"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-6">
                        <Button className="bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all">
                          <Save className="w-5 h-5 mr-3" />
                          Save Changes
                        </Button>
                        <Button variant="outline" className="rounded-xl px-8 py-4 text-lg font-semibold border-2 border-stone-300 hover:border-stone-400 hover:bg-stone-50 transition-all">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
