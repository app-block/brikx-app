
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Mantra-style Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/6 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-primary/4 rounded-full blur-3xl"></div>
        
        {/* Geometric elements inspired by Mantra */}
        <div className="absolute top-40 right-20 w-32 h-32 border border-primary/20 rotate-45 rounded-lg"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border border-primary/15 rotate-12 rounded-lg"></div>
        <div className="absolute top-60 left-1/3 w-16 h-16 bg-primary/10 rotate-45 rounded-lg"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 glass-card rounded-full px-6 py-3 text-sm text-foreground backdrop-blur-sm">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="font-medium">Platform Live & Secured</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              Bringing the world's
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400">
                financial ecosystem
              </span>
              <br />
              onchain
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              BrikX is a purpose-built real estate investment platform, capable of adherence to real world regulatory requirements.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              onClick={() => navigate('/marketplace')}
              size="lg"
              className="mantra-button mantra-glow text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 group"
            >
              Start Building
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              size="lg"
              className="glass-card border-primary/30 text-foreground hover:bg-primary/10 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              View Dashboard
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-20 max-w-5xl mx-auto">
            <div className="text-center space-y-4 glass-card p-6 rounded-2xl">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-foreground">$2.5B+</div>
              <div className="text-muted-foreground font-medium">Assets Under Management</div>
            </div>
            <div className="text-center space-y-4 glass-card p-6 rounded-2xl">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-foreground">50K+</div>
              <div className="text-muted-foreground font-medium">Global Investors</div>
            </div>
            <div className="text-center space-y-4 glass-card p-6 rounded-2xl">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-foreground">25+</div>
              <div className="text-muted-foreground font-medium">Countries Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
