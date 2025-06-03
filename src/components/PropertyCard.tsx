
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
    <Card className="group overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="bg-white/95 text-gray-800 font-semibold border-0 shadow-sm">
            {property.type}
          </Badge>
          {property.verified && (
            <Badge variant="secondary" className="bg-emerald-500 text-white flex items-center gap-1 font-semibold shadow-sm">
              <Shield className="w-3 h-3" />
              Verified
            </Badge>
          )}
        </div>
        
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-blue-600 text-white flex items-center gap-1 font-bold shadow-sm">
            <TrendingUp className="w-3 h-3" />
            {property.apy}% APY
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center gap-1 text-sm font-medium">
            <MapPin className="w-4 h-4" />
            {property.location}
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {property.name}
        </CardTitle>
        <CardDescription className="text-gray-600 font-medium">
          Premium real estate investment opportunity
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 font-medium mb-1">Asset Value</div>
            <div className="text-lg font-bold text-gray-900">${property.totalValue.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 font-medium mb-1">Token Price</div>
            <div className="text-lg font-bold text-gray-900">${property.tokenPrice}</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Investment Progress</span>
            <Badge variant="outline" className="text-xs font-bold">
              {fundedPercentage.toFixed(1)}% Funded
            </Badge>
          </div>
          <Progress value={fundedPercentage} className="h-3 bg-gray-100" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{property.tokensAvailable.toLocaleString()} tokens available</span>
            <span>{property.totalTokens.toLocaleString()} total</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Invest Now
          </Button>
          <Button variant="outline" className="px-6 border-gray-300 hover:border-blue-500 hover:bg-blue-50 font-semibold">
            Details
          </Button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            Listed 2 days ago
          </div>
          <div className="text-xs text-emerald-600 font-semibold">
            +{((Math.random() * 5) + 2).toFixed(1)}% this week
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
