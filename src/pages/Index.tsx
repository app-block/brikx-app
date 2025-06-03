
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, CircleCheck, CirclePlus, Download } from "lucide-react";
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
      name: "Luxury Beachfront Villa",
      location: "Goa, India",
      totalValue: 2500000,
      tokenPrice: 2500,
      tokensAvailable: 400,
      totalTokens: 1000,
      apy: 12.5,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      type: "Vacation Rental",
      verified: true
    },
    {
      id: 2,
      name: "Commercial Tech Hub",
      location: "São Paulo, Brazil",
      totalValue: 5000000,
      tokenPrice: 5000,
      tokensAvailable: 200,
      totalTokens: 1000,
      apy: 15.8,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      type: "Commercial",
      verified: true
    },
    {
      id: 3,
      name: "Sustainable Farmland",
      location: "Bali, Indonesia",
      totalValue: 800000,
      tokenPrice: 800,
      tokensAvailable: 650,
      totalTokens: 1000,
      apy: 18.2,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
      type: "Agricultural",
      verified: true
    }
  ];

  const platformStats = [
    { label: "Total Properties", value: "2,847", change: "+12.5%" },
    { label: "Assets Under Management", value: "$1.2B", change: "+8.3%" },
    { label: "Active Investors", value: "89,421", change: "+15.7%" },
    { label: "Revenue Distributed", value: "$45.7M", change: "+22.1%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation connectedWallet={connectedWallet} setConnectedWallet={setConnectedWallet} />
      
      <Hero connectedWallet={connectedWallet} setConnectedWallet={setConnectedWallet} />
      
      {/* Platform Stats */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Featured Property Investments
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover tokenized real estate opportunities from high-growth markets worldwide. 
            Own fractions, earn passive income, and vote on property decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
            View All Properties
          </Button>
        </div>
      </section>

      <FeatureSection />
      
      {/* Investment Dashboard Preview */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            AI-Powered Investment Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make informed decisions with our advanced analytics dashboard featuring ML-driven valuations and ROI predictions.
          </p>
        </div>
        
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              Portfolio Performance
            </CardTitle>
            <CardDescription>Real-time analytics and AI-powered insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">$127,450</div>
                <div className="text-gray-600">Total Portfolio Value</div>
                <div className="flex items-center justify-center gap-1 text-green-600 mt-1">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm">+14.2%</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">18.7%</div>
                <div className="text-gray-600">Average APY</div>
                <div className="flex items-center justify-center gap-1 text-blue-600 mt-1">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm">+2.1%</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">$2,847</div>
                <div className="text-gray-600">Monthly Income</div>
                <div className="flex items-center justify-center gap-1 text-purple-600 mt-1">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm">+8.5%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Beachfront Villa (GOA-001)</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">+12.5% APY</Badge>
              </div>
              <Progress value={75} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Tech Hub (SAO-002)</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">+15.8% APY</Badge>
              </div>
              <Progress value={60} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Sustainable Farm (BAL-003)</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">+18.2% APY</Badge>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
