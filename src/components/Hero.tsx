
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, TrendingUp, Globe, ChevronRight } from "lucide-react";

interface HeroProps {
  connectedWallet: boolean;
  setConnectedWallet: (connected: boolean) => void;
}

const Hero = ({ connectedWallet, setConnectedWallet }: HeroProps) => {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-blue-50/10 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Top Badge */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 text-sm font-semibold border border-blue-200/50 shadow-sm">
            <Globe className="w-4 h-4 mr-2" />
            Democratizing Global Real Estate Investment
          </Badge>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
              Enterprise-Grade
            </span>
            <br />
            <span className="text-gray-900">
              Property Tokenization
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 max-w-5xl mx-auto leading-relaxed font-medium">
            Unlock fractional ownership of premium real estate assets through blockchain technology. 
            Build diversified portfolios, earn passive income, and participate in property governance 
            with institutional-grade security and transparency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
              onClick={() => !connectedWallet && setConnectedWallet(true)}
            >
              {connectedWallet ? "Explore Investment Opportunities" : "Start Investing Today"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 px-10 py-4 text-lg font-semibold group"
            >
              Schedule Enterprise Demo
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="flex flex-col items-center text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Bank-Grade Security</h3>
            <p className="text-gray-600 leading-relaxed">Multi-signature smart contracts and institutional custody solutions ensure your investments are protected</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Proven Returns</h3>
            <p className="text-gray-600 leading-relaxed">Average 18-25% APY from diversified income streams including rentals and property appreciation</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Global Access</h3>
            <p className="text-gray-600 leading-relaxed">Invest in premium properties across emerging markets with full regulatory compliance and legal protection</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">$2.4B+</div>
            <div className="text-sm text-gray-600 font-medium">Assets Under Management</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">150K+</div>
            <div className="text-sm text-gray-600 font-medium">Global Investors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">850+</div>
            <div className="text-sm text-gray-600 font-medium">Tokenized Properties</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">25</div>
            <div className="text-sm text-gray-600 font-medium">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
