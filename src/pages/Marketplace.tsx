
import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { properties } from "@/data/properties";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'available' && property.availableTokens > 0) ||
                         (filterBy === 'high-yield' && property.apy >= 20);
    
    return matchesSearch && matchesFilter;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'apy-high':
        return b.apy - a.apy;
      case 'apy-low':
        return a.apy - b.apy;
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6">
              Investment Marketplace
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Premium
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Real Estate Opportunities
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Invest in tokenized real estate with fractional ownership. Start building your global property portfolio today.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              {/* Filter */}
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="high-yield">High Yield (20%+)</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="apy-high">Highest APY</SelectItem>
                  <SelectItem value="apy-low">Lowest APY</SelectItem>
                  <SelectItem value="price-high">Highest Price</SelectItem>
                  <SelectItem value="price-low">Lowest Price</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border border-slate-600 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none border-0"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none border-0"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-slate-300">
              Showing <span className="text-white font-semibold">{sortedProperties.length}</span> of{' '}
              <span className="text-white font-semibold">{properties.length}</span> properties
            </p>
          </div>

          {/* Properties Grid */}
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {sortedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                name={property.name}
                location={property.location}
                price={property.price}
                image={property.image}
                apy={property.apy}
                totalTokens={property.totalTokens}
                availableTokens={property.availableTokens}
                monthlyRent={property.monthlyRent}
              />
            ))}
          </div>

          {/* Empty State */}
          {sortedProperties.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No properties found</h3>
              <p className="text-slate-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
