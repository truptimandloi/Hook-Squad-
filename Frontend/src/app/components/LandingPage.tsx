import { useState, useEffect } from 'react';
import { Recycle, Leaf, TrendingUp, Users, Package, Factory, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Info, CheckCircle, Star } from 'lucide-react';
import { Button } from './ui/button';
import { AuthModal } from './AuthModal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'buyer' | 'seller'>('buyer');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const handleCTAClick = (mode: 'buyer' | 'seller') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const categories = [
    { name: 'Plastic', icon: Package, color: 'from-emerald-400 to-amber-600', description: 'PET, HDPE, PVC, and more recyclable plastics' },
    { name: 'Metal', icon: Factory, color: 'from-stone-400 to-amber-600', description: 'Steel, aluminum, copper, and ferrous metals' },
    { name: 'Glass', icon: Package, color: 'from-emerald-500 to-stone-500', description: 'Clear, colored, and specialty glass materials' },
    { name: 'Textile', icon: Package, color: 'from-amber-400 to-stone-600', description: 'Cotton, synthetic fibers, and fabric waste' },
    { name: 'Paper', icon: Package, color: 'from-stone-400 to-emerald-600', description: 'Cardboard, newsprint, and specialty papers' },
    { name: 'E-waste', icon: Package, color: 'from-amber-500 to-stone-700', description: 'Electronic components and circuit boards' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-amber-50 to-stone-100 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-amber-700 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                <Recycle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-8xl mb-6 text-stone-900 tracking-tight font-bold">
              Where Waste Becomes
              <span className="block bg-gradient-to-r from-emerald-600 via-amber-600 to-stone-700 bg-clip-text text-transparent">
                Raw Material
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Sell your industrial waste. Buy cheaper raw materials. Join the circular economy revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => handleCTAClick('seller')}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-10 py-8 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 hover:-translate-y-1"
              >
                <Package className="w-6 h-6 mr-3" />
                Sell Waste
              </Button>
              <Button
                onClick={() => handleCTAClick('buyer')}
                size="lg"
                variant="outline"
                className="border-3 border-amber-600 text-amber-700 hover:bg-amber-50 px-10 py-8 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 hover:-translate-y-1"
              >
                <TrendingUp className="w-6 h-6 mr-3" />
                Buy Raw Material
              </Button>
            </div>
          </div>
        </div>

        {/* 3D Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating 3D Cubes */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg shadow-2xl animate-float-3d opacity-20 transform rotate-45"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg shadow-2xl animate-rotate-3d opacity-25 transform -rotate-12"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-stone-400 to-stone-600 rounded-lg shadow-2xl animate-pulse-3d opacity-15 transform rotate-30"></div>
          <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-lg shadow-2xl animate-float-3d opacity-20 transform rotate-60" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/3 right-1/5 w-36 h-36 bg-gradient-to-br from-amber-500 to-stone-500 rounded-lg shadow-2xl animate-rotate-3d opacity-18 transform -rotate-45" style={{animationDelay: '4s'}}></div>

          {/* Floating Spheres */}
          <div className="absolute top-1/6 left-1/6 w-20 h-20 bg-gradient-to-br from-emerald-300 to-emerald-500 rounded-full shadow-xl animate-float-3d opacity-30" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/6 right-1/6 w-16 h-16 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-xl animate-pulse-3d opacity-35" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-2/3 left-2/3 w-12 h-12 bg-gradient-to-br from-stone-300 to-stone-500 rounded-full shadow-xl animate-rotate-3d opacity-25" style={{animationDelay: '5s'}}></div>

          {/* Decorative blurred elements */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse-3d"></div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div id="what-we-offer" data-section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('what-we-offer') ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-5xl mb-6 bg-gradient-to-r from-emerald-600 via-amber-600 to-stone-700 bg-clip-text text-transparent font-bold">
            What We Offer
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Transform your waste management challenges into business opportunities
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TooltipProvider>
            <div className={`group p-8 rounded-3xl bg-gradient-to-br from-white via-emerald-50/30 to-amber-50/30 border-2 border-emerald-100 hover:border-amber-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${visibleSections.has('what-we-offer') ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Recycle className="w-9 h-9 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Learn more about our circular economy approach</p>
                </TooltipContent>
              </Tooltip>
              <h3 className="text-2xl mb-4 text-stone-900 font-semibold">Circular Economy</h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                Transform waste streams into valuable resources, closing the loop in industrial production.
              </p>
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Proven Results</span>
              </div>
            </div>

            <div className={`group p-8 rounded-3xl bg-gradient-to-br from-white via-amber-50/30 to-stone-50/30 border-2 border-amber-100 hover:border-stone-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${visibleSections.has('what-we-offer') ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-stone-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <TrendingUp className="w-9 h-9 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Discover cost-saving opportunities</p>
                </TooltipContent>
              </Tooltip>
              <h3 className="text-2xl mb-4 text-stone-900 font-semibold">Cost Reduction</h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                Access affordable raw materials while generating revenue from your industrial waste.
              </p>
              <div className="flex items-center gap-2 text-amber-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Save Up to 40%</span>
              </div>
            </div>

            <div className={`group p-8 rounded-3xl bg-gradient-to-br from-white via-stone-50/30 to-emerald-50/30 border-2 border-stone-100 hover:border-emerald-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${visibleSections.has('what-we-offer') ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-stone-400 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Leaf className="w-9 h-9 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Environmental impact reduction</p>
                </TooltipContent>
              </Tooltip>
              <h3 className="text-2xl mb-4 text-stone-900 font-semibold">Sustainability</h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                Reduce environmental impact by diverting waste from landfills and minimizing virgin resource extraction.
              </p>
              <div className="flex items-center gap-2 text-stone-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Carbon Neutral</span>
              </div>
            </div>
          </TooltipProvider>
        </div>
      </div>

      {/* Waste Categories Section */}
      <div id="waste-categories" data-section className="bg-gradient-to-b from-stone-50 via-amber-50/20 to-emerald-50/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('waste-categories') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-5xl mb-6 bg-gradient-to-r from-stone-600 via-amber-600 to-emerald-700 bg-clip-text text-transparent font-bold">
              Waste Categories We Support
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Browse materials across multiple industries and find the perfect match for your business
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <TooltipProvider>
              {categories.map((category, index) => (
                <Popover key={category.name}>
                  <PopoverTrigger asChild>
                    <div
                      className={`group cursor-pointer p-6 rounded-3xl bg-gradient-to-br from-white to-stone-50/50 border-2 border-stone-100 hover:border-amber-300 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${visibleSections.has('waste-categories') ? 'animate-scale-in' : 'opacity-0'}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg`}>
                        <category.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-center text-stone-900 group-hover:text-amber-700 transition-colors font-semibold">
                        {category.name}
                      </h3>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-stone-900">{category.name} Materials</h4>
                      <p className="text-sm text-stone-600">{category.description}</p>
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Info className="w-4 h-4" />
                        <span className="text-sm">Click to explore listings</span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" data-section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections.has('how-it-works') ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-5xl mb-6 bg-gradient-to-r from-emerald-600 via-amber-600 to-stone-700 bg-clip-text text-transparent font-bold">
            How It Works
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Get started in just three simple steps and join the circular economy revolution
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-24 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-emerald-300 via-amber-300 to-stone-300 z-0"></div>

          <div className={`text-center relative z-10 ${visibleSections.has('how-it-works') ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-amber-600 flex items-center justify-center mx-auto shadow-2xl transform hover:scale-110 transition-transform">
                <span className="text-4xl text-white font-bold">1</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center animate-bounce-in">
                <Package className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-3xl mb-6 text-stone-900 font-semibold">List Your Waste</h3>
            <p className="text-stone-600 leading-relaxed text-lg">
              Post your industrial waste with detailed specifications, quantity, and pricing expectations. Our platform handles the rest.
            </p>
            <div className="mt-6 p-4 bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl border border-emerald-100">
              <p className="text-sm text-stone-700 font-medium">✓ Free to list</p>
              <p className="text-sm text-stone-700">✓ Verified buyers only</p>
            </div>
          </div>

          <div className={`text-center relative z-10 ${visibleSections.has('how-it-works') ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'}`}>
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-stone-600 flex items-center justify-center mx-auto shadow-2xl transform hover:scale-110 transition-transform">
                <span className="text-4xl text-white font-bold">2</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center animate-bounce-in animate-delay-200">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-3xl mb-6 text-stone-900 font-semibold">Connect & Negotiate</h3>
            <p className="text-stone-600 leading-relaxed text-lg">
              Connect with verified industries looking for your materials at competitive rates. Negotiate terms directly on our platform.
            </p>
            <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl border border-amber-100">
              <p className="text-sm text-stone-700 font-medium">✓ Secure messaging</p>
              <p className="text-sm text-stone-700">✓ Smart matching algorithm</p>
            </div>
          </div>

          <div className={`text-center relative z-10 ${visibleSections.has('how-it-works') ? 'animate-fade-in-right animate-delay-400' : 'opacity-0'}`}>
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-stone-500 to-emerald-600 flex items-center justify-center mx-auto shadow-2xl transform hover:scale-110 transition-transform">
                <span className="text-4xl text-white font-bold">3</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-stone-400 to-stone-600 rounded-full flex items-center justify-center animate-bounce-in animate-delay-400">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-3xl mb-6 text-stone-900 font-semibold">Close Deal & Recycle</h3>
            <p className="text-stone-600 leading-relaxed text-lg">
              Finalize agreements, arrange logistics, and contribute to a sustainable circular economy. Track your environmental impact.
            </p>
            <div className="mt-6 p-4 bg-gradient-to-br from-stone-50 to-emerald-50 rounded-2xl border border-stone-100">
              <p className="text-sm text-stone-700 font-medium">✓ Impact tracking</p>
              <p className="text-sm text-stone-700">✓ Carbon credits earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div id="about-us" data-section className="bg-gradient-to-br from-emerald-50 via-amber-50/30 to-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${visibleSections.has('about-us') ? 'animate-fade-in-left' : 'opacity-0'}`}>
              <h2 className="text-5xl mb-8 bg-gradient-to-r from-stone-600 via-amber-600 to-emerald-700 bg-clip-text text-transparent font-bold">
                About Us
              </h2>
              <p className="text-xl text-stone-600 mb-8 leading-relaxed">
                We're pioneering the circular economy by connecting industries to transform waste into opportunity.
                Our platform facilitates the exchange of industrial by-products, reducing environmental impact while
                creating economic value.
              </p>
              <p className="text-xl text-stone-600 mb-8 leading-relaxed">
                Join thousands of businesses already reducing costs, minimizing waste, and building a more
                sustainable future together.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-600 flex items-center justify-center shadow-lg">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-stone-900 font-semibold text-lg">Committed to Sustainability</p>
                  <p className="text-stone-600">Driving the transition to a circular economy</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-amber-100 px-4 py-2 rounded-full border border-emerald-200 hover:shadow-lg transition-shadow cursor-pointer">
                        <Star className="w-5 h-5 text-amber-500" />
                        <span className="text-stone-700 font-medium">4.9/5 Rating</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Based on 2,500+ verified reviews</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-stone-100 px-4 py-2 rounded-full border border-amber-200 hover:shadow-lg transition-shadow cursor-pointer">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-stone-700 font-medium">ISO Certified</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>ISO 14001 Environmental Management</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className={`transition-all duration-1000 ${visibleSections.has('about-us') ? 'animate-fade-in-right animate-delay-200' : 'opacity-0'}`}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1582669300365-630322b86cf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcmVjeWNsaW5nJTIwZmFjdG9yeXxlbnwxfHx8fDE3Njc2ODEyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Industrial recycling"
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-amber-500 rounded-3xl shadow-2xl flex items-center justify-center animate-float-3d">
                  <Recycle className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-amber-400 to-stone-500 rounded-2xl shadow-2xl flex items-center justify-center animate-pulse-3d">
                  <Leaf className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div id="metrics" data-section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('metrics') ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl mb-6 bg-gradient-to-r from-emerald-600 via-amber-600 to-stone-700 bg-clip-text text-transparent font-bold">
            Our Impact
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Real numbers that demonstrate our commitment to sustainability and circular economy
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TooltipProvider>
            <div className={`text-center p-10 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 border-2 border-emerald-100 hover:border-amber-300 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${visibleSections.has('metrics') ? 'animate-scale-in' : 'opacity-0'}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-6xl mb-6 bg-gradient-to-r from-emerald-600 to-amber-700 bg-clip-text text-transparent font-bold">
                    500K+
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tons of waste diverted from landfills</p>
                </TooltipContent>
              </Tooltip>
              <p className="text-xl text-stone-700 font-semibold">Tons Recycled</p>
              <div className="mt-4 w-16 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full mx-auto"></div>
            </div>
            <div className={`text-center p-10 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-stone-50 border-2 border-amber-100 hover:border-stone-300 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${visibleSections.has('metrics') ? 'animate-scale-in animate-delay-200' : 'opacity-0'}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-6xl mb-6 bg-gradient-to-r from-amber-600 to-stone-700 bg-clip-text text-transparent font-bold">
                    2,500+
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verified industrial partners worldwide</p>
                </TooltipContent>
              </Tooltip>
              <p className="text-xl text-stone-700 font-semibold">Industries Onboarded</p>
              <div className="mt-4 w-16 h-1 bg-gradient-to-r from-amber-400 to-stone-400 rounded-full mx-auto"></div>
            </div>
            <div className={`text-center p-10 rounded-3xl bg-gradient-to-br from-stone-50 via-white to-emerald-50 border-2 border-stone-100 hover:border-emerald-300 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${visibleSections.has('metrics') ? 'animate-scale-in animate-delay-400' : 'opacity-0'}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-6xl mb-6 bg-gradient-to-r from-stone-600 to-emerald-700 bg-clip-text text-transparent font-bold">
                    250K
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Equivalent CO₂ emissions prevented</p>
                </TooltipContent>
              </Tooltip>
              <p className="text-xl text-stone-700 font-semibold">Tons CO₂ Saved</p>
              <div className="mt-4 w-16 h-1 bg-gradient-to-r from-stone-400 to-emerald-400 rounded-full mx-auto"></div>
            </div>
          </TooltipProvider>
        </div>
      </div>

      {/* Footer */}
      <footer id="footer" data-section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 transition-all duration-1000 ${visibleSections.has('footer') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-600 flex items-center justify-center mr-4 shadow-lg">
                  <Recycle className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                  Waste Exchange
                </span>
              </div>
              <p className="text-stone-300 mb-8 max-w-md leading-relaxed">
                Connecting industries to build a sustainable circular economy through efficient waste exchange and smart recycling solutions.
              </p>
              <div className="flex gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-12 h-12 rounded-xl bg-stone-800 hover:bg-gradient-to-br hover:from-emerald-500 hover:to-amber-600 flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg">
                        <Linkedin className="w-6 h-6" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on LinkedIn</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-12 h-12 rounded-xl bg-stone-800 hover:bg-gradient-to-br hover:from-amber-500 hover:to-stone-600 flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg">
                        <Twitter className="w-6 h-6" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-12 h-12 rounded-xl bg-stone-800 hover:bg-gradient-to-br hover:from-stone-500 hover:to-emerald-600 flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg">
                        <Facebook className="w-6 h-6" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className={`transition-all duration-1000 ${visibleSections.has('footer') ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'}`}>
              <h3 className="text-xl mb-6 bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent font-semibold">Contact</h3>
              <div className="space-y-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-3 text-stone-300 hover:text-emerald-400 transition-colors cursor-pointer group">
                      <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>hello@wasteexchange.com</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send us an email</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-3 text-stone-300 hover:text-amber-400 transition-colors cursor-pointer group">
                      <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Call us for support</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-3 text-stone-300 hover:text-stone-400 transition-colors cursor-pointer group">
                      <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>San Francisco, CA</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visit our headquarters</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className={`transition-all duration-1000 ${visibleSections.has('footer') ? 'animate-fade-in-up animate-delay-400' : 'opacity-0'}`}>
              <h3 className="text-xl mb-6 bg-gradient-to-r from-amber-400 to-stone-400 bg-clip-text text-transparent font-semibold">Legal</h3>
              <div className="space-y-4">
                <p className="text-stone-300 hover:text-emerald-400 transition-colors cursor-pointer hover:translate-x-1 transform duration-200">
                  Privacy Policy
                </p>
                <p className="text-stone-300 hover:text-amber-400 transition-colors cursor-pointer hover:translate-x-1 transform duration-200">
                  Terms of Service
                </p>
                <p className="text-stone-300 hover:text-stone-400 transition-colors cursor-pointer hover:translate-x-1 transform duration-200">
                  Cookie Policy
                </p>
              </div>
            </div>
          </div>

          <div className={`border-t border-stone-700 mt-12 pt-8 text-center transition-all duration-1000 ${visibleSections.has('footer') ? 'animate-slide-in-up animate-delay-600' : 'opacity-0'}`}>
            <p className="text-stone-400">&copy; 2026 Waste Exchange Platform. All rights reserved.</p>
            <div className="mt-4 flex justify-center gap-6 text-sm text-stone-500">
              <span className="hover:text-emerald-400 transition-colors cursor-pointer">Environmental Impact</span>
              <span className="hover:text-amber-400 transition-colors cursor-pointer">Sustainability Report</span>
              <span className="hover:text-stone-400 transition-colors cursor-pointer">Carbon Calculator</span>
            </div>
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