
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CircleCheck, ArrowUp } from "lucide-react";

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
    <Card className="group overflow-hidden bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 border-0 hover:scale-105">
      <div className="relative overflow-hidden">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-700">
            {property.type}
          </Badge>
          {property.verified && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 flex items-center gap-1">
              <CircleCheck className="w-3 h-3" />
              Verified
            </Badge>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 flex items-center gap-1">
            <ArrowUp className="w-3 h-3" />
            {property.apy}% APY
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl font-bold">{property.name}</CardTitle>
        <CardDescription className="text-gray-600">{property.location}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600">Total Value</div>
            <div className="font-semibold">${property.totalValue.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-600">Token Price</div>
            <div className="font-semibold">${property.tokenPrice}</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Funding Progress</span>
            <span className="font-medium">{fundedPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={fundedPercentage} className="h-2" />
          <div className="text-xs text-gray-500">
            {property.tokensAvailable} of {property.totalTokens} tokens available
          </div>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
          Invest Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
