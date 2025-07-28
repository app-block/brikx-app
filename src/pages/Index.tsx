import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, BarChart3, DollarSign } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PropertyCard from "@/components/PropertyCard";
import StatsCard from "@/components/StatsCard";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get the first 3 properties for featured section
  const featuredProperties = properties.slice(0, 3);

  const platformStats = [
    { label: "Total Assets Under Management", value: "$2.4B", change: "+18.5%" },
    { label: "Global Investment Volume", value: "$847M", change: "+32.1%" },
    { label: "Active Institutional Clients", value: "1,247", change: "+24.7%" },
    { label: "Distributed Yields YTD", value: "$156M", change: "+41.3%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Responsive Hero */}
      <Hero />
      
      {/* Welcome Section for Authenticated Users */}
      {user && (
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl p-10 sm:p-12 md:p-14 shadow-2xl premium-glow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold gradient-text luxury-heading mb-3">
                  Welcome back, {user.user_metadata?.first_name || 'Investor'}!
                </h2>
                <p className="text-muted-foreground text-lg sm:text-xl premium-text">
                  Ready to explore premium investment opportunities?
                </p>
              </div>
              <div className="flex gap-4">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="luxury-button text-black shadow-2xl px-8 py-4 text-lg font-bold"
                >
                  View Dashboard
                </Button>
                <Button 
                  onClick={() => navigate('/settings')}
                  variant="outline"
                  className="border-primary/50 text-primary glass-card premium-glow px-8 py-4 text-lg font-bold"
                >
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sign In CTA for Non-Authenticated Users */}
      {!user && (
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl p-10 sm:p-12 md:p-14 text-center shadow-2xl premium-glow">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text luxury-heading mb-4">
              Start Your Investment Journey
            </h2>
            <p className="text-muted-foreground mb-8 text-lg sm:text-xl premium-text max-w-2xl mx-auto">
              Join thousands of institutional investors building wealth through premium real estate tokenization
            </p>
            <Button 
              onClick={() => navigate('/auth')}
              size="lg"
              className="luxury-button text-black px-12 py-6 shadow-2xl text-xl font-bold"
            >
              Get Started Today
            </Button>
          </div>
        </section>
      )}
      
      {/* Platform Performance Metrics */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text luxury-heading mb-6">Platform Performance</h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed premium-text">
            Real-time metrics showcasing our institutional-grade performance and exponential growth trajectory.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
          {platformStats.map((stat, idx) => (
            <StatsCard key={idx} {...stat} />
          ))}
        </div>
      </section>

      {/* Premium Investment Opportunities */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl premium-glow">
          <div className="text-center mb-16 sm:mb-20">
            <Badge variant="secondary" className="bg-primary/30 text-primary px-6 py-3 mb-6 font-bold border-primary/50 text-lg luxury-heading shadow-xl">
              Exclusive Portfolio
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold gradient-text luxury-heading mb-6">
              Premium Real Estate Assets
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed premium-text">
              Institutional-grade properties from tier-1 global markets. Each asset undergoes comprehensive 
              due diligence, regulatory compliance verification, and third-party audits.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-16">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="text-center">
            <Button 
              onClick={() => navigate('/marketplace')}
              size="lg" 
              className="luxury-button text-black px-12 sm:px-16 py-4 sm:py-6 text-xl sm:text-2xl font-bold shadow-2xl"
            >
              Explore Full Marketplace
            </Button>
          </div>
        </div>
      </section>

      <FeatureSection />
      
      {/* Professional Analytics Dashboard */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text luxury-heading mb-6">
            Professional Investment Analytics
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto premium-text leading-relaxed">
            Advanced portfolio management tools with real-time analytics, risk assessment, 
            and AI-powered market insights for institutional-grade investment decisions.
          </p>
        </div>
        <Card className="glass-card shadow-2xl border border-primary/20 overflow-hidden backdrop-blur-md premium-glow">
          <CardHeader className="bg-gradient-to-r from-card/80 to-secondary/80 border-b border-primary/20">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-4 text-2xl sm:text-3xl text-foreground luxury-heading">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 bg-primary rounded-full animate-pulse shadow-lg"></div>
                Portfolio Analytics Dashboard
              </div>
              <Badge variant="secondary" className="bg-primary/30 text-primary sm:ml-auto w-fit border-primary/50 font-bold">Live Data</Badge>
            </CardTitle>
            <CardDescription className="text-lg sm:text-xl text-muted-foreground premium-text">
              Real-time performance metrics and AI-powered investment insights
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-12 sm:mb-16">
              <div className="text-center p-6 sm:p-8 glass-card rounded-3xl border border-primary/30 premium-glow">
                <div className="text-4xl sm:text-5xl font-bold gradient-text luxury-heading mb-3">$347,890</div>
                <div className="text-muted-foreground font-bold mb-3 text-base sm:text-lg premium-text">Total Portfolio Value</div>
                <div className="flex items-center justify-center gap-2 text-primary">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-base font-bold">+24.8% YTD</span>
                </div>
              </div>
              <div className="text-center p-6 sm:p-8 glass-card rounded-3xl border border-primary/30 premium-glow">
                <div className="text-4xl sm:text-5xl font-bold gradient-text luxury-heading mb-3">22.4%</div>
                <div className="text-muted-foreground font-bold mb-3 text-base sm:text-lg premium-text">Weighted Average APY</div>
                <div className="flex items-center justify-center gap-2 text-primary">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-base font-bold">Above Market</span>
                </div>
              </div>
              <div className="text-center p-6 sm:p-8 glass-card rounded-3xl border border-primary/30 premium-glow">
                <div className="text-4xl sm:text-5xl font-bold gradient-text luxury-heading mb-3">$8,947</div>
                <div className="text-muted-foreground font-bold mb-3 text-base sm:text-lg premium-text">Monthly Passive Income</div>
                <div className="flex items-center justify-center gap-2 text-primary">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-base font-bold">+12.3% Growth</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-slate-700/50 rounded-xl gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-slate-100 text-sm sm:text-base">Dubai Marina Resort (DXB-001)</span>
                    <div className="text-xs sm:text-sm text-slate-400">Hospitality • UAE</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-emerald-900/50 text-emerald-300 font-semibold border-emerald-500/30 w-fit">+22.5% APY</Badge>
              </div>
              <Progress value={82} className="h-2 sm:h-3" />
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-slate-700/50 rounded-xl gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-slate-100 text-sm sm:text-base">Bangalore Tech Hub (BLR-002)</span>
                    <div className="text-xs sm:text-sm text-slate-400">Commercial • India</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 font-semibold border-blue-500/30 w-fit">+18.8% APY</Badge>
              </div>
              <Progress value={65} className="h-2 sm:h-3" />
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-slate-700/50 rounded-xl gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-slate-100 text-sm sm:text-base">Costa Rica Eco-Resort (CRC-003)</span>
                    <div className="text-xs sm:text-sm text-slate-400">Sustainable • Costa Rica</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-purple-900/50 text-purple-300 font-semibold border-purple-500/30 w-fit">+25.2% APY</Badge>
              </div>
              <Progress value={58} className="h-2 sm:h-3" />
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
