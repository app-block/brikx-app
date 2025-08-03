
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe, Zap, Star, Sparkles, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-crypto-real-estate.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* MANTRA-style minimal background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Real Estate Platform" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      </div>

      {/* Clean geometric elements */}
      <div className="absolute inset-0">
        {/* Minimal floating elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/3 rounded-full blur-2xl floating-element" style={{animationDelay: '3s'}}></div>
        
        {/* Simple geometric shapes */}
        <div className="absolute top-20 right-20 w-24 h-24 border border-primary/20 rotate-45 rounded-2xl"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 border border-primary/15 rotate-12 rounded-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center space-y-12 animate-fade-in">
          {/* MANTRA-style minimal badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span className="text-xs font-medium text-foreground/80">Build with BRIKX</span>
          </div>

          {/* MANTRA-inspired clean heading */}
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold text-foreground leading-[0.9] tracking-tight">
              Bringing the world's
              <br />
              <span className="gradient-text bg-gradient-primary bg-clip-text text-transparent">
                real estate ecosystem
              </span>
              <br />
              onchain
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              BRIKX is a purpose-built real estate investment platform, capable of adherence to real world regulatory requirements.
            </p>
          </div>

          {/* MANTRA-style clean CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={() => navigate('/marketplace')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Start Investing
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="border border-border bg-transparent hover:bg-muted text-foreground px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              View Dashboard
            </button>
          </div>

          {/* Clean minimal stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-20 max-w-5xl mx-auto">
            <div className="text-center space-y-4 glass-card p-6 rounded-2xl">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-semibold text-foreground">$2.5B+</div>
                <div className="text-sm text-muted-foreground">Assets Under Management</div>
              </div>
            </div>
            <div className="text-center space-y-4 glass-card p-6 rounded-2xl">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-semibold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Institutional Investors</div>
              </div>
            </div>
            <div className="text-center space-y-4 glass-card p-6 rounded-2xl">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-semibold text-foreground">25+</div>
                <div className="text-sm text-muted-foreground">Global Markets</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
