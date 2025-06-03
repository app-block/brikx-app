import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, BarChart3, DollarSign } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import StatsCard from "@/components/StatsCard";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [connectedWallet, setConnectedWallet] = useState(false);

  const featuredProperties = [
    {
      id: 1,
      name: "Luxury Marina Resort",
      location: "Dubai Marina, UAE",
      totalValue: 8500000,
      tokenPrice: 8500,
      tokensAvailable: 280,
      totalTokens: 1000,
      apy: 22.5,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      type: "Hospitality",
      verified: true
    },
    {
      id: 2,
      name: "Tech Innovation Hub",
      location: "Bangalore, India",
      totalValue: 12000000,
      tokenPrice: 12000,
      tokensAvailable: 150,
      totalTokens: 1000,
      apy: 18.8,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      type: "Commercial",
      verified: true
    },
    {
      id: 3,
      name: "Eco-Resort Development",
      location: "Costa Rica",
      totalValue: 6200000,
      tokenPrice: 6200,
      tokensAvailable: 420,
      totalTokens: 1000,
      apy: 25.2,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
      type: "Sustainable",
      verified: true
    }
  ];

  const platformStats = [
    { label: "Total Assets Under Management", value: "$2.4B", change: "+18.5%" },
    { label: "Global Investment Volume", value: "$847M", change: "+32.1%" },
    { label: "Active Institutional Clients", value: "1,247", change: "+24.7%" },
    { label: "Distributed Yields YTD", value: "$156M", change: "+41.3%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10">
      <Navigation />
      
      <Hero />
      
      {/* Platform Performance Metrics */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Performance</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time metrics showcasing our institutional-grade performance and growth trajectory.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      </section>

      {/* Premium Investment Opportunities */}
      <section className="py-20 px-4 max-w-7xl mx-auto bg-white/50 rounded-3xl mx-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-4 py-2 mb-4 font-semibold">
            Exclusive Access
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent mb-6">
            Premium Investment Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Carefully curated real estate opportunities from high-growth markets. 
            Each property undergoes rigorous due diligence and legal compliance verification.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold shadow-xl">
            Explore All Opportunities
          </Button>
        </div>
      </section>

      <FeatureSection />
      
      {/* Professional Analytics Dashboard */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Professional Investment Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Advanced portfolio management tools with real-time analytics, risk assessment, 
            and AI-powered market insights for informed investment decisions.
          </p>
        </div>
        
        <Card className="bg-white shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
              Portfolio Analytics Dashboard
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 ml-auto">Live Data</Badge>
            </CardTitle>
            <CardDescription className="text-lg">
              Real-time performance metrics and AI-powered investment insights
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100">
                <div className="text-4xl font-bold text-emerald-600 mb-2">$347,890</div>
                <div className="text-gray-700 font-semibold mb-2">Total Portfolio Value</div>
                <div className="flex items-center justify-center gap-1 text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">+24.8% YTD</span>
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">22.4%</div>
                <div className="text-gray-700 font-semibold mb-2">Weighted Average APY</div>
                <div className="flex items-center justify-center gap-1 text-blue-600">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Above Market</span>
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                <div className="text-4xl font-bold text-purple-600 mb-2">$8,947</div>
                <div className="text-gray-700 font-semibold mb-2">Monthly Passive Income</div>
                <div className="flex items-center justify-center gap-1 text-purple-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-semibold">+12.3% Growth</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Dubai Marina Resort (DXB-001)</span>
                    <div className="text-sm text-gray-600">Hospitality • UAE</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 font-semibold">+22.5% APY</Badge>
              </div>
              <Progress value={82} className="h-3" />
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Bangalore Tech Hub (BLR-002)</span>
                    <div className="text-sm text-gray-600">Commercial • India</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-semibold">+18.8% APY</Badge>
              </div>
              <Progress value={65} className="h-3" />
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Costa Rica Eco-Resort (CRC-003)</span>
                    <div className="text-sm text-gray-600">Sustainable • Costa Rica</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 font-semibold">+25.2% APY</Badge>
              </div>
              <Progress value={58} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
