
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, TrendingUp, MapPin, Calendar } from "lucide-react";

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
  const fundedPercentage = ((property.totalTokens - property.tokensAvailable) / property.totalTokens) * 100;
  
  return (
    <Card className="group overflow-hidden bg-slate-800/50 hover:bg-slate-700/50 hover:shadow-2xl transition-all duration-500 border border-slate-700/50 hover:border-blue-500/50 hover:-translate-y-2 backdrop-blur-sm">
      <div className="relative overflow-hidden">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-48 sm:h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-slate-900/30"></div>
        
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2">
          <Badge variant="secondary" className="bg-slate-800/95 text-slate-200 font-semibold border-slate-600 shadow-sm text-xs">
            {property.type}
          </Badge>
          {property.verified && (
            <Badge variant="secondary" className="bg-emerald-600/90 text-white flex items-center gap-1 font-semibold shadow-sm text-xs">
              <Shield className="w-3 h-3" />
              Verified
            </Badge>
          )}
        </div>
        
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
          <Badge variant="secondary" className="bg-blue-600/90 text-white flex items-center gap-1 font-bold shadow-sm text-xs">
            <TrendingUp className="w-3 h-3" />
            {property.apy}% APY
          </Badge>
        </div>

        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
          <div className="flex items-center gap-1 text-xs sm:text-sm font-medium">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            {property.location}
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
          {property.name}
        </CardTitle>
        <CardDescription className="text-slate-400 font-medium text-sm">
          Premium real estate investment opportunity
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-slate-700/50 rounded-xl">
            <div className="text-xs sm:text-sm text-slate-400 font-medium mb-1">Asset Value</div>
            <div className="text-base sm:text-lg font-bold text-slate-100">${property.totalValue.toLocaleString()}</div>
          </div>
          <div className="p-3 sm:p-4 bg-slate-700/50 rounded-xl">
            <div className="text-xs sm:text-sm text-slate-400 font-medium mb-1">Token Price</div>
            <div className="text-base sm:text-lg font-bold text-slate-100">${property.tokenPrice}</div>
          </div>
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm font-semibold text-slate-300">Investment Progress</span>
            <Badge variant="outline" className="text-xs font-bold border-slate-600 text-slate-300">
              {fundedPercentage.toFixed(1)}% Funded
            </Badge>
          </div>
          <Progress value={fundedPercentage} className="h-2 sm:h-3 bg-slate-700" />
          <div className="flex justify-between text-xs text-slate-500">
            <span>{property.tokensAvailable.toLocaleString()} tokens available</span>
            <span>{property.totalTokens.toLocaleString()} total</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm">
            Invest Now
          </Button>
          <Button variant="outline" className="px-4 sm:px-6 border-slate-600 hover:border-blue-500 hover:bg-blue-950/50 font-semibold text-slate-300 hover:text-blue-400 text-sm">
            Details
          </Button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-700">
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
