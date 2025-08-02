
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe, Zap, Star, Sparkles, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-crypto-real-estate.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Crypto Real Estate Platform" 
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-mesh opacity-60"></div>
      </div>

      {/* Ultra-Premium Background Elements */}
      <div className="absolute inset-0">
        {/* Floating premium orbs with enhanced gradients */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-primary opacity-15 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-crypto opacity-20 rounded-full blur-3xl floating-element" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-secondary opacity-18 rounded-full blur-2xl floating-element" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-primary opacity-12 rounded-full blur-3xl floating-element" style={{animationDelay: '1s'}}></div>
        
        {/* Geometric crypto-native elements */}
        <div className="absolute top-40 right-20 w-32 h-32 border border-primary/50 rotate-45 rounded-3xl luxury-glow crypto-card"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border border-crypto/45 rotate-12 rounded-2xl luxury-glow crypto-card" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-60 left-1/3 w-16 h-16 bg-primary/25 rotate-45 rounded-xl luxury-glow trust-badge" style={{animationDelay: '3s'}}></div>
        
        {/* Enhanced premium accent elements */}
        <div className="absolute top-10 left-1/2 w-4 h-4 bg-primary rounded-full luxury-glow shadow-glow"></div>
        <div className="absolute bottom-10 right-1/3 w-3 h-3 bg-crypto rounded-full luxury-glow shadow-glow-crypto" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-1/2 left-10 w-5 h-5 bg-secondary rounded-full luxury-glow shadow-glow-trust" style={{animationDelay: '3.5s'}}></div>
        
        {/* Blockchain network visualization */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1 h-20 bg-gradient-primary opacity-30 rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1 h-24 bg-gradient-crypto opacity-25 rotate-12"></div>
          <div className="absolute top-3/4 left-3/4 w-1 h-16 bg-gradient-secondary opacity-35 rotate-75"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center space-y-16 animate-fade-in">
          {/* Ultra-Premium Status Badge */}
          <div className="inline-flex items-center gap-4 crypto-card rounded-full px-10 py-5 text-sm text-foreground backdrop-blur-3xl premium-glow border-primary/30">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-glow"></div>
            <span className="font-sora font-semibold premium-text">Enterprise-Grade Platform • Live & Secured</span>
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>

          {/* Ultra-Modern Hero Heading */}
          <div className="space-y-12 animate-slide-up">
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-sora font-black text-foreground leading-none tracking-tighter crypto-heading">
              The Future of
              <br />
              <span className="gradient-text font-black bg-gradient-primary bg-clip-text text-transparent animate-gradient-flow">
                Real Estate Investment
              </span>
              <br />
              <span className="text-5xl sm:text-6xl lg:text-7xl text-muted-foreground font-light">Is Here</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-6xl mx-auto leading-relaxed premium-text font-inter font-medium">
              Institutional-grade real estate tokenization platform built for the next generation of investors. 
              <br className="hidden sm:block" />
              <span className="text-primary font-semibold">Fully compliant, globally accessible,</span> and powered by cutting-edge blockchain technology.
            </p>
          </div>

          {/* Ultra-Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-16 animate-scale-in">
            <Button
              onClick={() => navigate('/marketplace')}
              variant="premium"
              size="xl"
              className="text-black px-16 py-6 text-xl font-bold group shadow-luxury hover:shadow-glow"
            >
              <Zap className="mr-4 h-7 w-7 group-hover:scale-125 transition-all duration-300" />
              Launch Investment dApp
              <ArrowRight className="ml-4 h-7 w-7 group-hover:translate-x-2 transition-all duration-300" />
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="crypto"
              size="xl"
              className="px-16 py-6 text-xl font-bold group"
            >
              <Shield className="mr-4 h-7 w-7 group-hover:scale-110 transition-all duration-300" />
              Explore Portfolio
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-primary opacity-70" />
          </div>

          {/* Ultra-Luxury Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-32 max-w-7xl mx-auto">
            <div className="text-center space-y-8 crypto-card p-10 rounded-3xl premium-glow hover:shadow-glow transition-all duration-500 group">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center border border-white/20 shadow-elegant group-hover:scale-110 transition-all duration-500">
                  <TrendingUp className="h-12 w-12 text-black" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl sm:text-6xl font-sora font-black gradient-text crypto-heading">$2.5B+</div>
                <div className="text-muted-foreground font-inter font-semibold text-xl premium-text">Assets Under Management</div>
              </div>
            </div>
            <div className="text-center space-y-8 crypto-card p-10 rounded-3xl premium-glow hover:shadow-glow-crypto transition-all duration-500 group">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-crypto rounded-3xl flex items-center justify-center border border-white/20 shadow-glow-crypto group-hover:scale-110 transition-all duration-500">
                  <Shield className="h-12 w-12 text-black" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl sm:text-6xl font-sora font-black gradient-text crypto-heading">50K+</div>
                <div className="text-muted-foreground font-inter font-semibold text-xl premium-text">Institutional Investors</div>
              </div>
            </div>
            <div className="text-center space-y-8 crypto-card p-10 rounded-3xl premium-glow hover:shadow-glow-trust transition-all duration-500 group">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-secondary rounded-3xl flex items-center justify-center border border-white/20 shadow-glow-trust group-hover:scale-110 transition-all duration-500">
                  <Globe className="h-12 w-12 text-black" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl sm:text-6xl font-sora font-black gradient-text crypto-heading">25+</div>
                <div className="text-muted-foreground font-inter font-semibold text-xl premium-text">Global Markets</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
