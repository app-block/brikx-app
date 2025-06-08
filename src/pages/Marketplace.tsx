
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

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
    },
    {
      id: 5,
      name: "Beachfront Villa Complex",
      location: "Maldives",
      totalValue: 4800000,
      tokenPrice: 4800,
      tokensAvailable: 550,
      totalTokens: 1000,
      apy: 28.7,
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop",
      type: "Hospitality",
      verified: true
    },
    {
      id: 6,
      name: "Solar Energy Farm",
      location: "California, USA",
      totalValue: 18000000,
      tokenPrice: 18000,
      tokensAvailable: 200,
      totalTokens: 1000,
      apy: 16.3,
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
      type: "Sustainable",
      verified: true
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || property.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'apy':
        return b.apy - a.apy;
      case 'price-low':
        return a.tokenPrice - b.tokenPrice;
      case 'price-high':
        return b.tokenPrice - a.tokenPrice;
      case 'value':
        return b.totalValue - a.totalValue;
      default:
        return 0; // featured order
    }
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-100 mb-4">Property Marketplace</h1>
            <p className="text-xl text-slate-300 mb-6 max-w-3xl mx-auto">
              Discover and invest in premium real estate opportunities worldwide. 
              Start building your diversified portfolio today.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/60">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search properties by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-slate-700/60 border-slate-600/60 text-slate-100 placeholder:text-slate-400 rounded-xl h-12 text-lg"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-700/60 border-slate-600/60 text-slate-100 rounded-xl h-12">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="sustainable">Sustainable</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-700/60 border-slate-600/60 text-slate-100 rounded-xl h-12">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="apy">Highest APY</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="value">Asset Value</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="border-slate-600/60 hover:border-blue-500/60 hover:bg-blue-950/40 text-slate-300 hover:text-blue-400 rounded-xl h-12 px-6"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-slate-400 text-lg">
            Showing <span className="text-blue-400 font-semibold">{sortedProperties.length}</span> properties
            {searchTerm && ` matching "${searchTerm}"`}
            {filterType !== 'all' && ` in ${filterType}`}
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* No Results */}
        {sortedProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">No Properties Found</h3>
            <p className="text-slate-400 text-lg mb-6">
              Try adjusting your search criteria or clear all filters
            </p>
            <Button
              onClick={handleClearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
