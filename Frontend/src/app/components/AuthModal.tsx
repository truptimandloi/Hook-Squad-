import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ShoppingCart, Package, Eye, Chrome, Recycle, Leaf } from 'lucide-react';
import { useAuth } from '../App';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode: 'buyer' | 'seller';
}

export function AuthModal({ isOpen, onClose, defaultMode }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<'buyer' | 'seller'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = name || email.split('@')[0];
    login(role, userName);
    onClose();
    
    if (role === 'buyer') {
      navigate('/buyer-dashboard');
    } else {
      navigate('/seller-dashboard');
    }
  };

  const handleGuestMode = () => {
    login('buyer', 'Guest User');
    onClose();
    navigate('/buyer-dashboard');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-stone-50 via-white to-amber-50 border-2 border-amber-200 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
        {/* 3D Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-3d"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-3d"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-stone-200 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-rotate-3d"></div>
        </div>

        <DialogHeader className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-600 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform">
              <Recycle className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-3xl text-center text-stone-900 font-bold">
            Join the <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">Circular Economy</span>
          </DialogTitle>
          <p className="text-center text-stone-600 mt-2">Connect buyers and sellers in sustainable waste management</p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')} className="w-full relative z-10">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-stone-100 rounded-xl p-1">
            <TabsTrigger 
              value="login" 
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-amber-500 data-[state=active]:text-white transition-all"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-amber-500 data-[state=active]:text-white transition-all"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-4">
                <Label className="text-lg text-stone-700 font-semibold">Choose Your Role</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('buyer')}
                    className={`group p-6 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                      role === 'buyer'
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-xl'
                        : 'border-stone-200 hover:border-amber-300 hover:bg-amber-50'
                    }`}
                  >
                    <ShoppingCart className={`w-8 h-8 mx-auto mb-3 transition-colors ${role === 'buyer' ? 'text-emerald-600' : 'text-stone-600 group-hover:text-amber-600'}`} />
                    <p className={`text-base font-semibold transition-colors ${role === 'buyer' ? 'text-emerald-900' : 'text-stone-700 group-hover:text-amber-700'}`}>
                      Buy Materials
                    </p>
                    <p className="text-sm text-stone-500 mt-1">Find sustainable resources</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('seller')}
                    className={`group p-6 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                      role === 'seller'
                        ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100 shadow-xl'
                        : 'border-stone-200 hover:border-emerald-300 hover:bg-emerald-50'
                    }`}
                  >
                    <Package className={`w-8 h-8 mx-auto mb-3 transition-colors ${role === 'seller' ? 'text-amber-600' : 'text-stone-600 group-hover:text-emerald-600'}`} />
                    <p className={`text-base font-semibold transition-colors ${role === 'seller' ? 'text-amber-900' : 'text-stone-700 group-hover:text-emerald-700'}`}>
                      Sell Waste
                    </p>
                    <p className="text-sm text-stone-500 mt-1">Turn waste into value</p>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-stone-700 font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl border-stone-300 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-stone-700 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl border-stone-300 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                />
              </div>

              <div className="text-right">
                <button type="button" className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors">
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white rounded-xl py-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1"
              >
                <Leaf className="w-5 h-5 mr-2" />
                Login as {role === 'buyer' ? 'Buyer' : 'Seller'}
              </Button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-stone-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-r from-stone-50 to-amber-50 text-stone-600 font-medium rounded-full">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl py-6 border-2 border-stone-300 hover:border-emerald-400 hover:bg-emerald-50 text-stone-700 font-medium transition-all"
              >
                <Chrome className="w-5 h-5 mr-3" />
                Continue with Google
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={handleGuestMode}
                className="w-full rounded-xl py-6 text-stone-600 hover:bg-stone-50 hover:text-emerald-600 font-medium transition-all"
              >
                <Eye className="w-5 h-5 mr-3" />
                Browse as Guest
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-4">
                <Label className="text-lg text-stone-700 font-semibold">Choose Your Role</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('buyer')}
                    className={`group p-6 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                      role === 'buyer'
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-xl'
                        : 'border-stone-200 hover:border-amber-300 hover:bg-amber-50'
                    }`}
                  >
                    <ShoppingCart className={`w-8 h-8 mx-auto mb-3 transition-colors ${role === 'buyer' ? 'text-emerald-600' : 'text-stone-600 group-hover:text-amber-600'}`} />
                    <p className={`text-base font-semibold transition-colors ${role === 'buyer' ? 'text-emerald-900' : 'text-stone-700 group-hover:text-amber-700'}`}>
                      Buy Materials
                    </p>
                    <p className="text-sm text-stone-500 mt-1">Find sustainable resources</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('seller')}
                    className={`group p-6 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                      role === 'seller'
                        ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100 shadow-xl'
                        : 'border-stone-200 hover:border-emerald-300 hover:bg-emerald-50'
                    }`}
                  >
                    <Package className={`w-8 h-8 mx-auto mb-3 transition-colors ${role === 'seller' ? 'text-amber-600' : 'text-stone-600 group-hover:text-emerald-600'}`} />
                    <p className={`text-base font-semibold transition-colors ${role === 'seller' ? 'text-amber-900' : 'text-stone-700 group-hover:text-emerald-700'}`}>
                      Sell Waste
                    </p>
                    <p className="text-sm text-stone-500 mt-1">Turn waste into value</p>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-stone-700 font-medium">Company Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Your Company"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-xl border-stone-300 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-stone-700 font-medium">Email Address</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl border-stone-300 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-stone-700 font-medium">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl border-stone-300 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white rounded-xl py-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1"
              >
                <Leaf className="w-5 h-5 mr-2" />
                Sign up as {role === 'buyer' ? 'Buyer' : 'Seller'}
              </Button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-stone-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-r from-stone-50 to-amber-50 text-stone-600 font-medium rounded-full">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl py-6 border-2 border-stone-300 hover:border-emerald-400 hover:bg-emerald-50 text-stone-700 font-medium transition-all"
              >
                <Chrome className="w-5 h-5 mr-3" />
                Continue with Google
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
