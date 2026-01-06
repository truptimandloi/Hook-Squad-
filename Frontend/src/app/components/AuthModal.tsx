import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ShoppingCart, Package, Eye, Chrome } from 'lucide-react';
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
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Welcome to Waste Exchange</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-sm text-slate-700">I want to</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('buyer')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      role === 'buyer'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <ShoppingCart className={`w-6 h-6 mx-auto mb-2 ${role === 'buyer' ? 'text-emerald-600' : 'text-slate-600'}`} />
                    <p className={`text-sm ${role === 'buyer' ? 'text-emerald-900' : 'text-slate-700'}`}>
                      Buy Materials
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('seller')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      role === 'seller'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Package className={`w-6 h-6 mx-auto mb-2 ${role === 'seller' ? 'text-emerald-600' : 'text-slate-600'}`} />
                    <p className={`text-sm ${role === 'seller' ? 'text-emerald-900' : 'text-slate-700'}`}>
                      Sell Waste
                    </p>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="text-right">
                <button type="button" className="text-sm text-emerald-600 hover:text-emerald-700">
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg py-6"
              >
                Login as {role === 'buyer' ? 'Buyer' : 'Seller'}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full rounded-lg py-6 border-slate-300 hover:bg-slate-50"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Google SSO
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={handleGuestMode}
                className="w-full rounded-lg py-6 text-slate-600 hover:bg-slate-50"
              >
                <Eye className="w-5 h-5 mr-2" />
                Continue as Guest (Browse Only)
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-sm text-slate-700">I want to</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('buyer')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      role === 'buyer'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <ShoppingCart className={`w-6 h-6 mx-auto mb-2 ${role === 'buyer' ? 'text-emerald-600' : 'text-slate-600'}`} />
                    <p className={`text-sm ${role === 'buyer' ? 'text-emerald-900' : 'text-slate-700'}`}>
                      Buy Materials
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('seller')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      role === 'seller'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Package className={`w-6 h-6 mx-auto mb-2 ${role === 'seller' ? 'text-emerald-600' : 'text-slate-600'}`} />
                    <p className={`text-sm ${role === 'seller' ? 'text-emerald-900' : 'text-slate-700'}`}>
                      Sell Waste
                    </p>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-name">Company Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Your Company"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg py-6"
              >
                Sign up as {role === 'buyer' ? 'Buyer' : 'Seller'}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full rounded-lg py-6 border-slate-300 hover:bg-slate-50"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Google SSO
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
