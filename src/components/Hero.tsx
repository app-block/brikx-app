
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, TrendingUp, Globe, ChevronRight } from "lucide-react";
import { useWallet } from '@/hooks/useWallet';

const Hero = () => {
  const { isConnected, connectWallet } = useWallet();

  return (
    <section className="relative py-16 sm:py-24 px-4 overflow-hidden bg-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Top Badge */}
        <div className="text-center mb-6 sm:mb-8">
          <Badge variant="secondary" className="mb-4 sm:mb-6 bg-blue-900/50 text-blue-300 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold border border-blue-500/30 shadow-sm">
            <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Democratizing Global Real Estate Investment
          </Badge>
        </div>

        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="text-blue-400">
              Enterprise-Grade
            </span>
            <br />
            <span className="text-slate-100">
              Property Tokenization
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 sm:mb-12 max-w-5xl mx-auto leading-relaxed font-medium px-4">
            Unlock fractional ownership of premium real estate assets through blockchain technology. 
            Build diversified portfolios, earn passive income, and participate in property governance 
            with institutional-grade security and transparency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group w-full sm:w-auto"
              onClick={() => !isConnected && connectWallet()}
            >
              {isConnected ? "Explore Investment Opportunities" : "Start Investing Today"}
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-slate-500 hover:border-blue-500 hover:bg-blue-950/50 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold group text-slate-300 hover:text-blue-400 w-full sm:w-auto"
            >
              Schedule Enterprise Demo
              <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16 px-4">
          <div className="flex flex-col items-center text-center p-6 sm:p-8 bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-slate-100">Bank-Grade Security</h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">Multi-signature smart contracts and institutional custody solutions ensure your investments are protected</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 sm:p-8 bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-slate-100">Proven Returns</h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">Average 18-25% APY from diversified income streams including rentals and property appreciation</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 sm:p-8 bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
              <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-slate-100">Global Access</h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">Invest in premium properties across emerging markets with full regulatory compliance and legal protection</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mb-2">$2.4B+</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">Assets Under Management</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mb-2">150K+</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">Global Investors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mb-2">850+</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">Tokenized Properties</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mb-2">25</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
