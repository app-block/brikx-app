
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { Building, Edit, Trash2, Eye, Clock } from "lucide-react";

interface UserProperty {
  id: string;
  name: string;
  location: string;
  type: string;
  token_price: number;
  total_value: number;
  apy: number;
  verified: boolean;
  created_at: string;
}

const UserProperties = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [properties, setProperties] = useState<UserProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProperties();
    }
  }, [isAuthenticated, user]);

  const fetchUserProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('user_properties')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: "Failed to load your properties.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const { error } = await supabase
        .from('user_properties')
        .delete()
        .eq('id', propertyId);

      if (error) throw error;

      setProperties(prev => prev.filter(p => p.id !== propertyId));
      toast({
        title: "Property Deleted",
        description: "Property has been removed from the marketplace.",
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property.",
        variant: "destructive"
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <Card className="bg-slate-800/60 border-slate-700">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="text-slate-400">Loading your properties...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/60 border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center gap-2">
          <Building className="w-5 h-5 text-blue-400" />
          Your Properties ({properties.length})
        </CardTitle>
        <CardDescription className="text-slate-400">
          Manage your listed properties on the marketplace
        </CardDescription>
      </CardHeader>
      <CardContent>
        {properties.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">No Properties Listed</h3>
            <p className="text-slate-400">Add your first property to start receiving investments.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {properties.map((property) => (
              <div key={property.id} className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/40">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-100 text-lg">{property.name}</h3>
                    <p className="text-slate-400 text-sm">{property.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge 
                      variant={property.verified ? "default" : "secondary"} 
                      className={property.verified ? "bg-emerald-600" : "bg-orange-600"}
                    >
                      {property.verified ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Token Price</p>
                    <p className="text-slate-200 font-semibold">${property.token_price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Total Value</p>
                    <p className="text-slate-200 font-semibold">${property.total_value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">APY</p>
                    <p className="text-slate-200 font-semibold">{property.apy}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Type</p>
                    <p className="text-slate-200 font-semibold capitalize">{property.type}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    Listed {new Date(property.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 hover:bg-slate-600 text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 hover:bg-slate-600 text-xs"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(property.id)}
                      className="border-red-600 hover:bg-red-600 text-red-400 hover:text-white text-xs"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProperties;
