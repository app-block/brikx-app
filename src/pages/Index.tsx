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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      {/* Responsive Hero */}
      <Hero />
      
      {/* Welcome Section for Authenticated Users */}
      {user && (
        <section className="py-8 px-4 max-w-7xl mx-auto">
          <div className="bg-blue-900/30 backdrop-blur-sm rounded-3xl p-8 sm:p-10 md:p-12 border border-blue-500/30 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-300 mb-2">
                  Welcome back, {user.user_metadata?.first_name || 'Investor'}!
                </h2>
                <p className="text-slate-300 text-base sm:text-lg">
                  Ready to explore new investment opportunities?
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-blue-600 hover:bg-blue-700 shadow-xl transition"
                >
                  View Dashboard
                </Button>
                <Button 
                  onClick={() => navigate('/settings')}
                  variant="outline"
                  className="border-blue-500/50 text-blue-300"
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
        <section className="py-8 px-4 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-sm rounded-3xl p-8 sm:p-10 md:p-12 border border-blue-500/30 text-center shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">
              Start Your Investment Journey
            </h2>
            <p className="text-slate-300 mb-6 text-base sm:text-lg">
              Join thousands of investors building wealth through real estate tokenization
            </p>
            <Button 
              onClick={() => navigate('/auth')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 px-8 shadow-xl"
            >
              Get Started Today
            </Button>
          </div>
        </section>
      )}
      
      {/* Platform Performance Metrics */}
      <section className="py-12 sm:py-16 lg:py-20 px-2 sm:px-4 max-w-[96vw] sm:max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 mb-3">Platform Performance</h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real-time metrics showcasing our institutional-grade performance and growth trajectory.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {platformStats.map((stat, idx) => (
            <StatsCard key={idx} {...stat} />
          ))}
        </div>
      </section>

      {/* Premium Investment Opportunities - Responsive, Balanced Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-2 sm:px-4 max-w-[98vw] sm:max-w-7xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 sm:p-10 md:p-14 border border-slate-700/50 shadow-2xl drop-shadow-xl">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 px-4 py-2 mb-4 font-semibold border-blue-500/30">
              Exclusive Access
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Premium Investment Portfolio
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto font-medium">
              Carefully curated real estate opportunities from high-growth markets. 
              Each property undergoes rigorous due diligence and legal compliance verification.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-10 mb-10 sm:mb-14">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="text-center">
            <Button 
              onClick={() => navigate('/marketplace')}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg"
            >
              Explore All Opportunities
            </Button>
          </div>
        </div>
      </section>

      <FeatureSection />
      
      {/* Professional Analytics Dashboard - Responsive */}
      <section className="py-10 sm:py-12 lg:py-16 px-2 sm:px-4 max-w-[98vw] sm:max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Professional Investment Analytics
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-medium">
            Advanced portfolio management tools with real-time analytics, risk assessment, 
            and AI-powered market insights for informed investment decisions.
          </p>
        </div>
        <Card className="bg-slate-800/50 shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-slate-600/50">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-3 text-xl sm:text-2xl text-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                Portfolio Analytics Dashboard
              </div>
              <Badge variant="secondary" className="bg-emerald-900/50 text-emerald-300 sm:ml-auto w-fit border-emerald-500/30">Live Data</Badge>
            </CardTitle>
            <CardDescription className="text-base sm:text-lg text-slate-300">
              Real-time performance metrics and AI-powered investment insights
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-emerald-900/30 to-green-900/30 rounded-2xl border border-emerald-500/30">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2">$347,890</div>
                <div className="text-slate-300 font-semibold mb-2 text-sm sm:text-base">Total Portfolio Value</div>
                <div className="flex items-center justify-center gap-1 text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">+24.8% YTD</span>
                </div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl border border-blue-500/30">
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">22.4%</div>
                <div className="text-slate-300 font-semibold mb-2 text-sm sm:text-base">Weighted Average APY</div>
                <div className="flex items-center justify-center gap-1 text-blue-400">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Above Market</span>
                </div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/30">
                <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">$8,947</div>
                <div className="text-slate-300 font-semibold mb-2 text-sm sm:text-base">Monthly Passive Income</div>
                <div className="flex items-center justify-center gap-1 text-purple-400">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-semibold">+12.3% Growth</span>
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
