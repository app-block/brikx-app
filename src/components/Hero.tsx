
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe, Zap, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0">
        {/* Floating gold orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/15 rounded-full blur-3xl floating-element" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/12 rounded-full blur-2xl floating-element" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl floating-element" style={{animationDelay: '1s'}}></div>
        
        {/* Geometric luxury elements */}
        <div className="absolute top-40 right-20 w-32 h-32 border border-primary/40 rotate-45 rounded-3xl luxury-glow"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border border-primary/35 rotate-12 rounded-2xl luxury-glow" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-60 left-1/3 w-16 h-16 bg-primary/20 rotate-45 rounded-xl luxury-glow" style={{animationDelay: '3s'}}></div>
        
        {/* Premium accent dots */}
        <div className="absolute top-10 left-1/2 w-3 h-3 bg-primary rounded-full luxury-glow"></div>
        <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-primary-glow rounded-full luxury-glow" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-1/2 left-10 w-4 h-4 bg-primary/80 rounded-full luxury-glow" style={{animationDelay: '3.5s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center space-y-12">
          {/* Premium Status Badge */}
          <div className="inline-flex items-center gap-3 glass-card rounded-full px-8 py-4 text-sm text-foreground backdrop-blur-md premium-glow">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-lg"></div>
            <span className="font-semibold premium-text">Enterprise-Grade Platform • Live & Secured</span>
            <Star className="w-4 h-4 text-primary" />
          </div>

          {/* Hero Heading */}
          <div className="space-y-10">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-foreground leading-tight tracking-tight luxury-heading">
              The Future of
              <br />
              <span className="gradient-text font-extrabold">
                Real Estate Investment
              </span>
              <br />
              <span className="text-4xl sm:text-5xl lg:text-6xl text-muted-foreground">Is Here</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed premium-text font-medium">
              Institutional-grade real estate tokenization platform built for the next generation of investors. 
              Fully compliant, globally accessible, and powered by cutting-edge blockchain technology.
            </p>
          </div>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12">
            <Button
              onClick={() => navigate('/marketplace')}
              size="lg"
              className="luxury-button text-black px-12 py-6 text-xl font-bold group shadow-2xl"
            >
              <Zap className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Launch Investment dApp
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              size="lg"
              className="glass-card border-primary/50 text-primary hover:bg-primary/20 px-12 py-6 text-xl font-bold backdrop-blur-md premium-glow"
            >
              Explore Portfolio
            </Button>
          </div>

          {/* Luxury Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-24 max-w-6xl mx-auto">
            <div className="text-center space-y-6 glass-card p-8 rounded-3xl premium-glow">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-primary/50 rounded-3xl flex items-center justify-center border border-primary/50 shadow-2xl">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="text-4xl sm:text-5xl font-bold gradient-text luxury-heading">$2.5B+</div>
              <div className="text-muted-foreground font-semibold text-lg premium-text">Assets Under Management</div>
            </div>
            <div className="text-center space-y-6 glass-card p-8 rounded-3xl premium-glow">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-primary/50 rounded-3xl flex items-center justify-center border border-primary/50 shadow-2xl">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="text-4xl sm:text-5xl font-bold gradient-text luxury-heading">50K+</div>
              <div className="text-muted-foreground font-semibold text-lg premium-text">Institutional Investors</div>
            </div>
            <div className="text-center space-y-6 glass-card p-8 rounded-3xl premium-glow">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-primary/50 rounded-3xl flex items-center justify-center border border-primary/50 shadow-2xl">
                  <Globe className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="text-4xl sm:text-5xl font-bold gradient-text luxury-heading">25+</div>
              <div className="text-muted-foreground font-semibold text-lg premium-text">Global Markets</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
