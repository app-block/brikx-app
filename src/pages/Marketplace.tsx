
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const properties = [
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
    },
    {
      id: 4,
      name: "Manhattan Office Tower",
      location: "New York, USA",
      totalValue: 25000000,
      tokenPrice: 25000,
      tokensAvailable: 320,
      totalTokens: 1000,
      apy: 15.4,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      type: "Commercial",
      verified: true
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || property.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-4">Property Marketplace</h1>
          <p className="text-slate-300 mb-6">Discover and invest in premium real estate opportunities worldwide</p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-slate-100"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-800 border-slate-700 text-slate-100">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="hospitality">Hospitality</SelectItem>
                <SelectItem value="sustainable">Sustainable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
