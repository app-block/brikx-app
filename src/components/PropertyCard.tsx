
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Users, Calendar } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface PropertyCardProps {
  id: number;
  name: string;
  location: string;
  price: number;
  image: string;
  apy: number;
  totalTokens: number;
  availableTokens: number;
  monthlyRent: number;
}

const PropertyCard = ({ 
  id, 
  name, 
  location, 
  price, 
  image, 
  apy, 
  totalTokens, 
  availableTokens, 
  monthlyRent 
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleViewDetails = () => {
    navigate(`/property/${id}`);
  };

  const availabilityPercentage = ((totalTokens - availableTokens) / totalTokens) * 100;

  return (
    <Card 
      className="group overflow-hidden bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur-sm transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 sm:h-56">
        <img 
          src={image} 
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* APY Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-emerald-500/90 text-white font-semibold px-3 py-1 backdrop-blur-sm">
            {apy}% APY
          </Badge>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-4 left-4">
          <Badge 
            variant="outline" 
            className={`font-semibold px-3 py-1 backdrop-blur-sm border-white/30 text-white ${
              availableTokens > 0 ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}
          >
            {availableTokens > 0 ? 'Available' : 'Sold Out'}
          </Badge>
        </div>

        {/* Quick Stats Overlay */}
        <div className={`absolute inset-x-4 bottom-4 transform transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <div className="flex gap-2 text-white text-sm">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {totalTokens - availableTokens}/{totalTokens}
            </div>
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              ${monthlyRent.toLocaleString()}/mo
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Property Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
          {name}
        </h3>
        
        {/* Location */}
        <div className="flex items-center text-slate-400 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Price and Stats */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-white">{price.toLocaleString()} BRX</p>
              <p className="text-sm text-slate-400">per token</p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-emerald-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="font-semibold">{apy}%</span>
              </div>
              <p className="text-xs text-slate-400">Annual Return</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Funding Progress</span>
              <span>{availabilityPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-1000 ease-out"
                style={{ width: `${availabilityPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>{totalTokens - availableTokens} tokens sold</span>
              <span>{availableTokens} remaining</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleViewDetails}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          disabled={availableTokens === 0}
        >
          {availableTokens > 0 ? 'View Details & Invest' : 'Sold Out'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
