
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Elements - PRYPCO Mint inspired */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          {/* Status Badge - PRYPCO style */}
          <div className="inline-flex items-center gap-2 glass-effect rounded-full px-6 py-3 text-sm text-foreground backdrop-blur-sm border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="font-semibold">Live & Fully Regulated</span>
          </div>

          {/* Main Heading - PRYPCO style */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              Enter the future of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-400">
                real estate
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Fractional property ownership powered by blockchain technology.
              <br className="hidden sm:block" />
              Starting from $2,000 with 8-12% projected annual returns.
            </p>
          </div>

          {/* CTA Buttons - PRYPCO style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              onClick={() => navigate('/marketplace')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-glow"
            >
              Get started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => navigate('/auth')}
              variant="outline"
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
            >
              Login
            </Button>
          </div>

          {/* Feature Icons - PRYPCO style */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-16 max-w-5xl mx-auto">
            <div className="glass-effect p-6 rounded-2xl text-center space-y-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-sm font-semibold text-foreground">Starting from</div>
              <div className="text-lg font-bold text-primary">$2,000</div>
            </div>
            <div className="glass-effect p-6 rounded-2xl text-center space-y-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="text-sm font-semibold text-foreground">8-12% net</div>
              <div className="text-lg font-bold text-primary">annual ROI</div>
            </div>
            <div className="glass-effect p-6 rounded-2xl text-center space-y-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div className="text-sm font-semibold text-foreground">Fractional</div>
              <div className="text-lg font-bold text-primary">ownership</div>
            </div>
            <div className="glass-effect p-6 rounded-2xl text-center space-y-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-primary rounded-sm"></div>
              </div>
              <div className="text-sm font-semibold text-foreground">Blockchain</div>
              <div className="text-lg font-bold text-primary">backed</div>
            </div>
            <div className="glass-effect p-6 rounded-2xl text-center space-y-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary rounded-full"></div>
              </div>
              <div className="text-sm font-semibold text-foreground">Buy and sell</div>
              <div className="text-lg font-bold text-primary">tokens</div>
            </div>
            <div className="glass-effect p-6 rounded-2xl text-center space-y-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-primary/30 rounded border border-primary"></div>
              </div>
              <div className="text-sm font-semibold text-foreground">Full</div>
              <div className="text-lg font-bold text-primary">transparency</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
