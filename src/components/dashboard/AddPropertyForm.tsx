
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload } from "lucide-react";

const AddPropertyForm = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    type: 'commercial',
    image: '',
    tokenPrice: '',
    totalValue: '',
    totalTokens: '',
    tokensAvailable: '',
    apy: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add properties.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('user_properties')
        .insert({
          user_id: user.id,
          name: formData.name,
          description: formData.description,
          location: formData.location,
          type: formData.type,
          image: formData.image || '/placeholder.svg',
          token_price: parseInt(formData.tokenPrice),
          total_value: parseInt(formData.totalValue),
          total_tokens: parseInt(formData.totalTokens),
          tokens_available: parseInt(formData.tokensAvailable),
          apy: parseFloat(formData.apy),
          verified: false
        });

      if (error) throw error;

      toast({
        title: "Property Added Successfully",
        description: "Your property has been added to the marketplace.",
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        location: '',
        type: 'commercial',
        image: '',
        tokenPrice: '',
        totalValue: '',
        totalTokens: '',
        tokensAvailable: '',
        apy: ''
      });

    } catch (error) {
      console.error('Error adding property:', error);
      toast({
        title: "Error",
        description: "Failed to add property. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="bg-slate-800/60 border-slate-700">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">Authentication Required</h3>
            <p className="text-slate-400">Please sign in or connect your wallet to add properties.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/60 border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-400" />
          Add New Property
        </CardTitle>
        <CardDescription className="text-slate-400">
          List your property on the marketplace for tokenized investment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Property Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Marina Bay Office Complex"
                className="bg-slate-700/60 border-slate-600 text-slate-100"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-slate-300">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Dubai, UAE"
                className="bg-slate-700/60 border-slate-600 text-slate-100"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your property..."
              className="bg-slate-700/60 border-slate-600 text-slate-100 min-h-20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-slate-300">Property Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className="bg-slate-700/60 border-slate-600 text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="sustainable">Sustainable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tokenPrice" className="text-slate-300">Token Price (USD) *</Label>
              <Input
                id="tokenPrice"
                type="number"
                value={formData.tokenPrice}
                onChange={(e) => handleInputChange('tokenPrice', e.target.value)}
                placeholder="1000"
                className="bg-slate-700/60 border-slate-600 text-slate-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apy" className="text-slate-300">Expected APY (%) *</Label>
              <Input
                id="apy"
                type="number"
                step="0.1"
                value={formData.apy}
                onChange={(e) => handleInputChange('apy', e.target.value)}
                placeholder="12.5"
                className="bg-slate-700/60 border-slate-600 text-slate-100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalValue" className="text-slate-300">Total Property Value (USD) *</Label>
              <Input
                id="totalValue"
                type="number"
                value={formData.totalValue}
                onChange={(e) => handleInputChange('totalValue', e.target.value)}
                placeholder="1000000"
                className="bg-slate-700/60 border-slate-600 text-slate-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalTokens" className="text-slate-300">Total Tokens *</Label>
              <Input
                id="totalTokens"
                type="number"
                value={formData.totalTokens}
                onChange={(e) => handleInputChange('totalTokens', e.target.value)}
                placeholder="1000"
                className="bg-slate-700/60 border-slate-600 text-slate-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tokensAvailable" className="text-slate-300">Tokens Available *</Label>
              <Input
                id="tokensAvailable"
                type="number"
                value={formData.tokensAvailable}
                onChange={(e) => handleInputChange('tokensAvailable', e.target.value)}
                placeholder="1000"
                className="bg-slate-700/60 border-slate-600 text-slate-100"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-slate-300">Property Image URL</Label>
            <div className="flex gap-2">
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/property-image.jpg"
                className="bg-slate-700/60 border-slate-600 text-slate-100"
              />
              <Button
                type="button"
                variant="outline"
                className="border-slate-600 hover:bg-slate-700"
              >
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? "Adding Property..." : "Add Property to Marketplace"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddPropertyForm;
