
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, TrendingUp, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InvestmentModal from "./InvestmentModal";
import { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();
  const [investModalOpen, setInvestModalOpen] = useState(false);
  const fundedPercentage =
    ((property.totalTokens - property.tokensAvailable) / property.totalTokens) * 100;

  const handleInvestClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInvestModalOpen(true);
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const isFullyFunded = fundedPercentage >= 100;

  return (
    <>
      <Card
        className="group overflow-hidden glass-effect hover:bg-card/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-border hover:border-primary/50 backdrop-blur-sm rounded-2xl cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Property image & badges */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {isFullyFunded && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold text-xl">
                100% FUNDED!
              </div>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1 rounded-full">
              {property.apy}% Projected ROI
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3">
            <div className="text-xs font-medium text-white bg-background/80 px-3 py-1.5 rounded-full">
              {property.location}
            </div>
          </div>
        </div>

        {/* Card Content - PRYPCO style */}
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {property.name}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground font-medium">{property.apy}% Projected ROI</span>
              <span className="text-sm font-medium text-primary">7.5% Gross yield</span>
            </div>
          </div>

          <Button 
            onClick={handleInvestClick}
            disabled={isFullyFunded}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="w-4 h-4 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
            </span>
            {isFullyFunded ? 'Fully Funded' : 'Join PRYPCO Mint'}
          </Button>
        </CardContent>
      </Card>

      <InvestmentModal
        isOpen={investModalOpen}
        onClose={() => setInvestModalOpen(false)}
        propertyId={typeof property.id === "number" ? property.id : 0}
        propertyName={property.name}
        tokenPrice={property.tokenPrice}
        mode="invest"
      />
    </>
  );
};

export default PropertyCard;
