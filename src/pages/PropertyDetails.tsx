import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Shield, TrendingUp, MapPin, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InvestmentModal from "@/components/InvestmentModal";
import { getPropertyById } from "@/data/properties";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [investModalOpen, setInvestModalOpen] = useState(false);
  const [tokenQuantity, setTokenQuantity] = useState(1);

  // Always use string id for getPropertyById to match static and Supabase IDs
  const property = getPropertyById(id || '');

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold gradient-text luxury-heading mb-4">Property Not Found</h1>
            <p className="text-muted-foreground premium-text mb-8">The property you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/marketplace')} variant="default">
              Back to Marketplace
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const fundedPercentage = ((property.totalTokens - property.tokensAvailable) / property.totalTokens) * 100;
  const totalInvestment = tokenQuantity * property.tokenPrice;

  const handleInvestClick = () => {
    setInvestModalOpen(true);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBackClick}
          className="mb-6 text-muted-foreground hover:text-foreground hover:bg-card"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Image and Details */}
          <div>
            <div className="relative mb-6">
              <img 
                src={property.image} 
                alt={property.name}
                className="w-full h-80 object-cover rounded-xl"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-card/95 text-card-foreground border-border">
                  {property.type}
                </Badge>
                {property.verified && (
                  <Badge className="bg-emerald-600/90 text-white flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-blue-600/90 text-white flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {property.apy}% APY
                </Badge>
              </div>
            </div>

            <h1 className="text-3xl font-bold gradient-text luxury-heading mb-2">{property.name}</h1>
            <div className="flex items-center gap-1 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              {property.location}
            </div>
            
            <p className="text-muted-foreground premium-text mb-6">{property.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="text-sm text-muted-foreground mb-1">Total Value</div>
                <div className="text-xl font-bold text-foreground">${property.totalValue.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="text-sm text-muted-foreground mb-1">Token Price</div>
                <div className="text-xl font-bold text-foreground">${property.tokenPrice}</div>
              </div>
            </div>
          </div>

          {/* Investment Panel */}
          <div>
            <Card className="glass-card border border-primary/20 mb-6 premium-glow">
              <CardHeader>
                <CardTitle className="text-foreground luxury-heading">Investment Opportunity</CardTitle>
                <CardDescription className="text-muted-foreground premium-text">
                  Purchase tokens to own a fraction of this property
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-300">Funding Progress</span>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {fundedPercentage.toFixed(1)}% Funded
                    </Badge>
                  </div>
                  <Progress value={fundedPercentage} className="h-3 bg-slate-700" />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>{property.tokensAvailable.toLocaleString()} tokens available</span>
                    <span>{property.totalTokens.toLocaleString()} total</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tokenQuantity" className="text-slate-200">Number of Tokens</Label>
                    <Input
                      id="tokenQuantity"
                      type="number"
                      min="1"
                      max={property.tokensAvailable}
                      value={tokenQuantity}
                      onChange={(e) => setTokenQuantity(Number(e.target.value))}
                      className="mt-1 bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>

                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300">Token Price:</span>
                      <span className="font-semibold text-slate-100">${property.tokenPrice}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300">Quantity:</span>
                      <span className="font-semibold text-slate-100">{tokenQuantity}</span>
                    </div>
                    <div className="border-t border-slate-600 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Total Investment:</span>
                        <span className="text-xl font-bold text-blue-400">${totalInvestment.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleInvestClick}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl"
                    disabled={tokenQuantity <= 0 || tokenQuantity > property.tokensAvailable}
                  >
                    Invest via Blockchain
                  </Button>

                  <div className="text-xs text-slate-400 text-center">
                    Expected monthly return: ${((totalInvestment * property.apy / 100) / 12).toFixed(2)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />

      <InvestmentModal
        isOpen={investModalOpen}
        onClose={() => setInvestModalOpen(false)}
        propertyId={typeof property.id === "number" ? property.id : 0}
        propertyName={property.name}
        tokenPrice={property.tokenPrice}
        mode="invest"
      />
    </div>
  );
};

export default PropertyDetails;
