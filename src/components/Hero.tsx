
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 rounded-full px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-medium">Platform Live & Secured</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-100 leading-tight">
              Real Estate Investment
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Redefined
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
              Invest in premium global real estate through blockchain technology. 
              <br className="hidden sm:block" />
              Fractional ownership, instant liquidity, and transparent returns.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              onClick={() => navigate('/marketplace')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              Explore Properties
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              size="lg"
              className="border-slate-600 text-slate-300 hover:bg-slate-800/60 hover:text-slate-100 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            >
              View Dashboard
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-100">$2.5B+</div>
              <div className="text-slate-400 font-medium">Assets Under Management</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-100">50K+</div>
              <div className="text-slate-400 font-medium">Global Investors</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-100">25+</div>
              <div className="text-slate-400 font-medium">Countries Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
