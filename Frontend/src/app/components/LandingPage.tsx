import { useState } from 'react';
import { Recycle, Leaf, TrendingUp, Users, Package, Factory, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Button } from './ui/button';
import { AuthModal } from './AuthModal';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'buyer' | 'seller'>('buyer');

  const handleCTAClick = (mode: 'buyer' | 'seller') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const categories = [
    { name: 'Plastic', icon: Package, color: 'from-emerald-400 to-emerald-600' },
    { name: 'Metal', icon: Factory, color: 'from-slate-400 to-slate-600' },
    { name: 'Glass', icon: Package, color: 'from-sky-400 to-sky-600' },
    { name: 'Textile', icon: Package, color: 'from-purple-400 to-purple-600' },
    { name: 'Paper', icon: Package, color: 'from-amber-400 to-amber-600' },
    { name: 'E-waste', icon: Package, color: 'from-red-400 to-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg">
                <Recycle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 text-slate-900 tracking-tight">
              Where Waste Becomes
              <span className="block bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                Raw Material
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto">
              Sell your industrial waste. Buy cheaper raw materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => handleCTAClick('seller')}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Package className="w-5 h-5 mr-2" />
                Sell Waste
              </Button>
              <Button
                onClick={() => handleCTAClick('buyer')}
                size="lg"
                variant="outline"
                className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Buy Raw Material
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl text-center mb-16 text-slate-900">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Recycle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl mb-4 text-slate-900">Circular Economy</h3>
            <p className="text-slate-600 leading-relaxed">
              Transform waste streams into valuable resources, closing the loop in industrial production.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl mb-4 text-slate-900">Cost Reduction</h3>
            <p className="text-slate-600 leading-relaxed">
              Access affordable raw materials while generating revenue from your industrial waste.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl mb-4 text-slate-900">Sustainability</h3>
            <p className="text-slate-600 leading-relaxed">
              Reduce environmental impact by diverting waste from landfills and minimizing virgin resource extraction.
            </p>
          </div>
        </div>
      </div>

      {/* Waste Categories Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-4 text-slate-900">Waste Categories We Support</h2>
          <p className="text-center text-slate-600 mb-12 text-lg">
            Browse materials across multiple industries
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group cursor-pointer p-6 rounded-2xl bg-white border-2 border-slate-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-center text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl text-center mb-16 text-slate-900">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mx-auto shadow-lg">
                <span className="text-3xl text-white">1</span>
              </div>
              {/* Connector line */}
              <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-emerald-300 to-sky-300"></div>
            </div>
            <h3 className="text-2xl mb-4 text-slate-900">List Waste</h3>
            <p className="text-slate-600 leading-relaxed">
              Post your industrial waste with detailed specifications, quantity, and pricing expectations.
            </p>
          </div>

          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center mx-auto shadow-lg">
                <span className="text-3xl text-white">2</span>
              </div>
              <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-sky-300 to-purple-300"></div>
            </div>
            <h3 className="text-2xl mb-4 text-slate-900">Get Buyers</h3>
            <p className="text-slate-600 leading-relaxed">
              Connect with verified industries looking for your materials at competitive rates.
            </p>
          </div>

          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mx-auto shadow-lg">
                <span className="text-3xl text-white">3</span>
              </div>
            </div>
            <h3 className="text-2xl mb-4 text-slate-900">Close Deal & Recycle</h3>
            <p className="text-slate-600 leading-relaxed">
              Negotiate terms, finalize agreements, and contribute to a sustainable circular economy.
            </p>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6 text-slate-900">About Us</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We're pioneering the circular economy by connecting industries to transform waste into opportunity.
                Our platform facilitates the exchange of industrial by-products, reducing environmental impact while
                creating economic value.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Join thousands of businesses already reducing costs, minimizing waste, and building a more
                sustainable future together.
              </p>
              <div className="flex items-center gap-4">
                <Leaf className="w-12 h-12 text-emerald-600" />
                <div>
                  <p className="text-slate-900">Committed to Sustainability</p>
                  <p className="text-sm text-slate-600">Driving the transition to a circular economy</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1582669300365-630322b86cf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcmVjeWNsaW5nJTIwZmFjdG9yeXxlbnwxfHx8fDE3Njc2ODEyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Industrial recycling"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
            <div className="text-5xl mb-4 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              500K+
            </div>
            <p className="text-lg text-slate-700">Tons Recycled</p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-white border border-sky-100">
            <div className="text-5xl mb-4 bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
              2,500+
            </div>
            <p className="text-lg text-slate-700">Industries Onboarded</p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
            <div className="text-5xl mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              250K
            </div>
            <p className="text-lg text-slate-700">Tons CO₂ Saved</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mr-3">
                  <Recycle className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl">Waste Exchange</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Connecting industries to build a sustainable circular economy through efficient waste exchange.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center cursor-pointer transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center cursor-pointer transition-colors">
                  <Twitter className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center cursor-pointer transition-colors">
                  <Facebook className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  <Mail className="w-5 h-5" />
                  <span>hello@wasteexchange.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  <MapPin className="w-5 h-5" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-4">Legal</h3>
              <div className="space-y-3">
                <p className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Privacy Policy
                </p>
                <p className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Terms of Service
                </p>
                <p className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Cookie Policy
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2026 Waste Exchange Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </div>
  );
}
