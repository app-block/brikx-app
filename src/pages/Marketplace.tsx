import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { fetchAllProperties, Property } from "@/data/properties";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const allProperties = await fetchAllProperties();
      setProperties(allProperties);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="text-slate-400">Loading properties...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text luxury-heading mb-4">Property Marketplace</h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto premium-text">
              Discover and invest in premium real estate opportunities worldwide. 
              Start building your diversified portfolio today.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="glass-card rounded-2xl p-6 border border-primary/20 premium-glow">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search properties by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12 text-lg"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-48 bg-input border-border text-foreground rounded-xl h-12">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="sustainable">Sustainable</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 bg-input border-border text-foreground rounded-xl h-12">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
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
                  className="border-border hover:border-primary/60 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-xl h-12 px-6"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground text-lg premium-text">
            Showing <span className="text-primary font-semibold">{sortedProperties.length}</span> properties
            {searchTerm && ` matching "${searchTerm}"`}
            {filterType !== 'all' && ` in ${filterType}`}
          </p>
        </div>

        {/* Properties Grid */}
        <div
          className="
            grid
            grid-cols-1
            xs:grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-y-10 gap-x-4 md:gap-x-10 md:gap-y-14
            transition-all
          "
        >
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
