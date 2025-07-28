
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

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/property/${property.id}`);
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <>
      <Card
        className="group overflow-hidden glass-card hover:shadow-2xl hover:ring-2 hover:ring-primary/60 transition-all duration-500 border border-primary/20 hover:border-primary/60 hover:-translate-y-3 cursor-pointer backdrop-blur-md premium-glow"
        onClick={handleCardClick}
      >
        {/* Property image & top badges */}
        <div className="relative overflow-hidden">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <Badge variant="secondary" className="bg-slate-700/95 text-slate-200 font-semibold border-slate-600/60 text-xs shadow-md backdrop-blur-md uppercase tracking-wide px-3 py-1">{property.type}</Badge>
            {property.verified && (
              <Badge variant="secondary" className="bg-emerald-600 text-white flex items-center gap-1 font-semibold shadow-md text-xs">
                <Shield className="w-3 h-3" />
                Verified
              </Badge>
            )}
          </div>
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="secondary" className="bg-blue-700 text-white flex items-center gap-1 font-bold text-xs shadow-md">
              <TrendingUp className="w-3 h-3" />
              {property.apy}% APY
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 text-white z-10">
            <div className="flex items-center gap-1 text-xs font-medium bg-slate-900/70 px-3 py-1.5 rounded-lg">
              <MapPin className="w-4 h-4" />
              {property.location}
            </div>
          </div>
        </div>

        {/* Card Content */}
        <CardHeader className="pb-3 pt-6">
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 luxury-heading">
            {property.name}
          </CardTitle>
          <CardDescription className="text-muted-foreground font-semibold premium-text">
            Institutional-grade investment opportunity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-2 pt-0">
          {/* Info values row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col bg-slate-700/70 rounded-xl px-4 py-3 gap-1 border border-slate-600/70">
              <span className="text-xs text-slate-400 font-semibold tracking-wide">Asset Value</span>
              <span className="text-lg font-bold text-gold-300">${property.totalValue.toLocaleString()}</span>
            </div>
            <div className="flex flex-col bg-slate-700/70 rounded-xl px-4 py-3 gap-1 border border-slate-600/70">
              <span className="text-xs text-slate-400 font-semibold tracking-wide">Token Price</span>
              <span className="text-lg font-bold text-blue-300">${property.tokenPrice}</span>
            </div>
          </div>
          {/* Progress bar, availability, funded */}
          <div>
            <div className="flex flex-row flex-wrap items-center justify-between mb-1 gap-1">
              <span className="text-xs font-semibold text-slate-400 uppercase">Investment Progress</span>
              <Badge
                variant="outline"
                className="text-xs font-bold border-gold-400/60 text-gold-300 bg-black/10 px-3"
              >
                {fundedPercentage.toFixed(1)}% Funded
              </Badge>
            </div>
            <Progress value={fundedPercentage} className="h-2.5 bg-gold-300/10" />
            <div className="flex justify-between mt-1 text-xs text-slate-500 font-medium">
              <span className="pr-2">
                <span className="font-bold text-green-400">{property.tokensAvailable.toLocaleString()}</span> tokens available
              </span>
              <span>
                <span className="font-bold text-slate-100">{property.totalTokens.toLocaleString()}</span> total
              </span>
            </div>
          </div>
          {/* CTA Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleInvestClick}
              className="flex-1 luxury-button text-black font-bold shadow-2xl hover:shadow-2xl transition-all rounded-xl border-0"
            >
              Invest Now
            </Button>
            <Button
              onClick={handleDetailsClick}
              variant="outline"
              className="px-6 border-primary/60 text-primary font-bold rounded-xl hover:bg-primary/20 premium-glow"
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
