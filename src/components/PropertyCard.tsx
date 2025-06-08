
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, TrendingUp, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Property {
  id: number;
  name: string;
  location: string;
  totalValue: number;
  tokenPrice: number;
  tokensAvailable: number;
  totalTokens: number;
  apy: number;
  image: string;
  type: string;
  verified: boolean;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();
  const fundedPercentage = ((property.totalTokens - property.tokensAvailable) / property.totalTokens) * 100;
  
  const handleInvestClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Navigating to invest in property ${property.id}`);
    navigate(`/property/${property.id}?action=invest`);
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Navigating to details for property ${property.id}`);
    navigate(`/property/${property.id}`);
  };

  const handleCardClick = () => {
    console.log(`Card clicked for property ${property.id}`);
    navigate(`/property/${property.id}`);
  };

  return (
    <Card 
      className="group overflow-hidden bg-slate-800/80 hover:bg-slate-700/80 hover:shadow-2xl transition-all duration-500 border border-slate-700/60 hover:border-blue-500/60 hover:-translate-y-2 cursor-pointer backdrop-blur-sm"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-48 sm:h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all duration-500"></div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="bg-slate-800/95 text-slate-200 font-semibold border-slate-600/60 shadow-md text-xs backdrop-blur-sm">
            {property.type}
          </Badge>
          {property.verified && (
            <Badge variant="secondary" className="bg-emerald-600/90 text-white flex items-center gap-1 font-semibold shadow-md text-xs backdrop-blur-sm">
              <Shield className="w-3 h-3" />
              Verified
            </Badge>
          )}
        </div>
        
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-blue-600/90 text-white flex items-center gap-1 font-bold shadow-md text-xs backdrop-blur-sm">
            <TrendingUp className="w-3 h-3" />
            {property.apy}% APY
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center gap-1 text-sm font-medium bg-slate-900/60 px-3 py-1.5 rounded-lg backdrop-blur-sm">
            <MapPin className="w-4 h-4" />
            {property.location}
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2">
          {property.name}
        </CardTitle>
        <CardDescription className="text-slate-400 font-medium">
          Premium real estate investment opportunity
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-700/60 rounded-xl backdrop-blur-sm">
            <div className="text-sm text-slate-400 font-medium mb-1">Asset Value</div>
            <div className="text-lg font-bold text-slate-100">${property.totalValue.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-slate-700/60 rounded-xl backdrop-blur-sm">
            <div className="text-sm text-slate-400 font-medium mb-1">Token Price</div>
            <div className="text-lg font-bold text-slate-100">${property.tokenPrice}</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-300">Investment Progress</span>
            <Badge variant="outline" className="text-xs font-bold border-slate-600/60 text-slate-300 bg-slate-800/40">
              {fundedPercentage.toFixed(1)}% Funded
            </Badge>
          </div>
          <Progress value={fundedPercentage} className="h-3 bg-slate-700/60" />
          <div className="flex justify-between text-xs text-slate-500">
            <span>{property.tokensAvailable.toLocaleString()} tokens available</span>
            <span>{property.totalTokens.toLocaleString()} total</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            onClick={handleInvestClick}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl"
          >
            Invest Now
          </Button>
          <Button 
            onClick={handleDetailsClick}
            variant="outline" 
            className="px-6 border-slate-600/60 hover:border-blue-500/60 hover:bg-blue-950/40 font-semibold text-slate-300 hover:text-blue-400 rounded-xl transition-all duration-300"
          >
            Details
          </Button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="w-3 h-3" />
            Listed 2 days ago
          </div>
          <div className="text-xs text-emerald-400 font-semibold">
            +{((Math.random() * 5) + 2).toFixed(1)}% this week
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
