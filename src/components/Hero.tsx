
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236366f1" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl animate-bounce delay-300"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm">
          <TrendingUp className="w-4 h-4 mr-2" />
          Revolutionizing Real Estate Investment
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Invest in
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
            Global Real Estate
          </span>
          with BRX Tokens
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Own fractional shares of premium properties worldwide through blockchain technology. 
          Earn passive income and build wealth with just <span className="text-emerald-400 font-semibold">$1 = 1 BRX</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            onClick={() => navigate('/marketplace')}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Explore Properties
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button 
            onClick={() => navigate('/buy-brx')}
            variant="outline" 
            size="lg" 
            className="border-2 border-blue-400/50 bg-transparent hover:bg-blue-500/10 text-blue-300 hover:text-blue-200 px-8 py-4 rounded-xl text-lg font-semibold backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
          >
            Buy BRX Tokens
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
            <Globe className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-2">Global Access</h3>
            <p className="text-slate-300">Invest in premium properties across major cities worldwide</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
            <Shield className="w-12 h-12 text-emerald-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-2">Secure & Transparent</h3>
            <p className="text-slate-300">Blockchain-powered security with zero gas fees</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
            <TrendingUp className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-2">High Returns</h3>
            <p className="text-slate-300">Earn up to 25% APY with monthly rental income</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
