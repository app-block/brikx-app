
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
    <div className="min-h-screen bg-gradient-to-br from-business-blue-dark via-business-blue to-slate-900">
      <Navigation />

      {/* Enhanced Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-[1100px] h-96 bg-gold/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-0 w-72 h-72 bg-gold/30 rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex flex-col items-center justify-center w-full">
            <span className="inline-flex items-center gap-2 bg-gold/10 text-gold border border-gold/30 rounded-full px-6 py-2 text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm uppercase tracking-wide">
              Premier Real Estate Investing
            </span>
            <h1 className="font-playfair text-center text-5xl sm:text-6xl lg:text-7xl font-black text-gold drop-shadow-lg leading-tight mb-6">
              Build Wealth <br className="hidden sm:block"/> with Real Assets
            </h1>
            <p className="text-center text-lg sm:text-2xl text-white/80 max-w-3xl mx-auto mb-9 leading-relaxed font-medium">
              Institutional-grade property investments. Secure, diversified, and legacy-driven. Elevate your portfolio with the next generation of real estate finance.
            </p>
            <div className="flex gap-4 flex-col sm:flex-row justify-center w-full mb-10">
              <Button
                onClick={() => navigate('/marketplace')}
                size="lg"
                className="bg-gold text-business-blue font-bold border-none px-8 py-4 text-lg rounded-xl shadow-xl hover:bg-gold-dark hover:text-white hover:scale-105 transition"
              >
                Browse Properties
              </Button>
              <Button
                onClick={() => navigate('/analytics')}
                variant="outline"
                size="lg"
                className="border-gold text-gold font-semibold px-8 py-4 text-lg rounded-xl hover:bg-gold/10 hover:text-white hover:border-gold-dark hover:scale-105 transition"
              >
                Investment Analytics
              </Button>
            </div>
          </div>
          {/* Iconic Illustrative Placeholder - you can replace this div with a real SVG or image */}
          <div className="w-full max-w-3xl h-52 flex items-center justify-center mb-0">
            <div className="w-full h-44 bg-gradient-to-r from-gold via-gold/40 to-gold/60 rounded-2xl opacity-20 flex items-end">
              <div className="w-[90%] mx-auto h-1/2 bg-white/60 rounded-t-2xl shadow-md opacity-30" />
            </div>
            {/* Optionally, you could add a real estate SVG/skyscraper here */}
          </div>
        </div>
      </section>

      {/* Welcome Section for Authenticated Users */}
      {user && (
        <section className="py-8 px-4 max-w-7xl mx-auto animate-fade-in">
          <div className="bg-business-blue/70 backdrop-blur-sm rounded-3xl p-10 border border-gold/10 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gold mb-2">
                  Welcome back, {user.user_metadata?.first_name || 'Investor'}!
                </h2>
                <p className="text-white/70 text-lg">
                  Ready to explore new investment opportunities?
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gold text-business-blue font-bold shadow-md transition"
                >
                  View Dashboard
                </Button>
                <Button 
                  onClick={() => navigate('/settings')}
                  variant="outline"
                  className="border-gold text-gold"
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
        <section className="py-8 px-4 max-w-7xl mx-auto animate-fade-in">
          <div className="bg-gradient-to-r from-business-blue/80 to-gold/10 backdrop-blur-sm rounded-3xl p-10 border border-gold/20 text-center shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-3">
              Begin Your Real Estate Investment Journey
            </h2>
            <p className="text-white/80 mb-6 text-lg">
              Join elite investors building generational wealth with modern real estate.
            </p>
            <Button 
              onClick={() => navigate('/auth')}
              size="lg"
              className="bg-gold text-business-blue font-bold px-8 shadow-lg"
            >
              Get Started
            </Button>
          </div>
        </section>
      )}
      
      {/* Platform Performance Metrics */}
      <section className="py-16 px-2 sm:px-4 max-w-[96vw] sm:max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gold mb-3 tracking-tight">Platform Results</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Sophisticated data, simple choices. Transparent performance at your fingertips.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {platformStats.map((stat, idx) => (
            <StatsCard key={idx} {...stat} />
          ))}
        </div>
      </section>

      {/* Premium Investment Section */}
      <section className="py-20 px-2 sm:px-4 max-w-[98vw] sm:max-w-7xl mx-auto">
        <div className="bg-slate-100/5 backdrop-blur-lg rounded-3xl p-10 border border-gold/30 shadow-2xl drop-shadow-xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="bg-gold/10 text-gold font-semibold border-gold/20 uppercase tracking-wide mb-4 px-6 py-2">
              Featured Portfolio
            </Badge>
            <h2 className="text-4xl font-bold text-gold mb-3">
              Premium Property Opportunities
            </h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto font-medium">
              Vetted, high-performance properties across sought-after markets.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="text-center">
            <Button 
              onClick={() => navigate('/marketplace')}
              size="lg" 
              className="bg-gold text-business-blue font-bold px-10 py-4 rounded-xl hover:bg-gold-dark hover:text-white"
            >
              Explore Marketplace
            </Button>
          </div>
        </div>
      </section>

      <FeatureSection />
      
      {/* Analytics Dashboard Preview */}
      <section className="py-14 px-2 sm:px-4 max-w-[98vw] sm:max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gold mb-4">Professional Analytics Tools</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-medium">
            Visualize performance, rebalance allocations, and access smart insights for strategic success.
          </p>
        </div>
        <Card className="bg-business-blue/70 border-gold/20 overflow-hidden backdrop-blur-sm">
          <CardHeader className="bg-gold/5 border-b border-gold/10">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-3 text-2xl text-gold">
              AI-Enhanced Analytics Dashboard
              <Badge variant="secondary" className="bg-gold/10 text-gold ml-auto w-fit border-gold/20">Live</Badge>
            </CardTitle>
            <CardDescription className="text-lg text-gold/80">
              Real-time performance and data-driven opportunity alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="text-center p-6 bg-gold/10 rounded-2xl border border-gold/20">
                <div className="text-4xl font-bold text-gold mb-2">$347,890</div>
                <div className="text-gold/80 font-semibold mb-2 text-lg">Total Portfolio Value</div>
                <div className="flex items-center justify-center gap-1 text-gold">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-base font-semibold">+24.8% YTD</span>
                </div>
              </div>
              <div className="text-center p-6 bg-business-blue/60 rounded-2xl border border-gold/10">
                <div className="text-4xl font-bold text-gold mb-2">22.4%</div>
                <div className="text-gold/80 font-semibold mb-2 text-lg">Weighted Average APY</div>
                <div className="flex items-center justify-center gap-1 text-gold">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-base font-semibold">Above Market</span>
                </div>
              </div>
              <div className="text-center p-6 bg-gold/10 rounded-2xl border border-gold/20">
                <div className="text-4xl font-bold text-gold mb-2">$8,947</div>
                <div className="text-gold/80 font-semibold mb-2 text-lg">Monthly Passive Income</div>
                <div className="flex items-center justify-center gap-1 text-gold">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-base font-semibold">+12.3% Growth</span>
                </div>
              </div>
            </div>
            {/* Featured properties and progress bars */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 bg-business-blue/60 rounded-xl gap-3 border border-gold/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/20 rounded-lg flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gold text-base">Dubai Marina Resort (DXB-001)</span>
                    <div className="text-xs sm:text-sm text-gold/60">Hospitality • UAE</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-gold/20 text-gold font-semibold border-gold/10 w-fit">+22.5% APY</Badge>
              </div>
              <Progress value={82} className="h-2 sm:h-3" />
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 bg-business-blue/60 rounded-xl gap-3 border border-gold/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/20 rounded-lg flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gold text-base">Bangalore Tech Hub (BLR-002)</span>
                    <div className="text-xs sm:text-sm text-gold/60">Commercial • India</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-gold/20 text-gold font-semibold border-gold/10 w-fit">+18.8% APY</Badge>
              </div>
              <Progress value={65} className="h-2 sm:h-3" />
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 bg-business-blue/60 rounded-xl gap-3 border border-gold/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/20 rounded-lg flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gold text-base">Costa Rica Eco-Resort (CRC-003)</span>
                    <div className="text-xs sm:text-sm text-gold/60">Sustainable • Costa Rica</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-gold/20 text-gold font-semibold border-gold/10 w-fit">+25.2% APY</Badge>
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

