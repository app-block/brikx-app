
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/hooks/useWallet';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import { User, Wallet, Copy, Check } from 'lucide-react';

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  wallet_address: string | null;
}

const Settings = () => {
  const { user, signOut } = useAuth();
  const { address, isConnected, connectWallet, disconnectWallet, formatAddress } = useWallet();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            email: user.email || '',
            wallet_address: address || null
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
        } else if (newProfile) {
          setProfile(newProfile);
          setFirstName(newProfile.first_name || '');
          setLastName(newProfile.last_name || '');
        }
      } else if (error) {
        console.error('Error loading profile:', error);
      } else if (data) {
        setProfile(data);
        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const updateProfile = async () => {
    if (!user || !profile) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          wallet_address: address || null,
        })
        .eq('id', user.id);

      if (error) {
        toast.error('Error updating profile');
        console.error('Error:', error);
      } else {
        toast.success('Profile updated successfully!');
        setProfile({ 
          ...profile, 
          first_name: firstName, 
          last_name: lastName,
          wallet_address: address || null
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyWalletAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success('Wallet address copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      if (isConnected) {
        disconnectWallet();
      }
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  if (!user && !isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <Card className="glass-card border border-primary/20 premium-glow">
            <CardContent className="p-6">
              <p className="text-muted-foreground premium-text">Please sign in or connect wallet to access settings.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text luxury-heading mb-2">Settings</h1>
          <p className="text-muted-foreground premium-text">Manage your profile and wallet settings</p>
        </div>

        <div className="grid gap-6">
          {/* Profile Information */}
          {user && (
            <Card className="glass-card border border-primary/20 premium-glow">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2 luxury-heading">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-200">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-slate-100"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-200">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-slate-100"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200">Email</Label>
                  <Input
                    id="email"
                    value={user.email || ''}
                    disabled
                    className="bg-slate-700/30 border-slate-600 text-slate-400"
                  />
                  <p className="text-sm text-slate-400">Email cannot be changed</p>
                </div>
                <Button 
                  onClick={updateProfile}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Wallet Information */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Wallet Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isConnected && address ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-slate-200 font-medium">Connected Wallet</p>
                      <p className="text-slate-400 text-sm">{formatAddress(address)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={copyWalletAddress}
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={disconnectWallet}
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-400 hover:bg-red-600/20"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">
                    <p>• Your wallet is connected and linked to your profile</p>
                    <p>• You can use this wallet for investments and transactions</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                    <p className="text-slate-300 mb-3">No wallet connected</p>
                    <Button
                      onClick={connectWallet}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Connect Wallet
                    </Button>
                  </div>
                  <div className="text-sm text-slate-400">
                    <p>• Connect a wallet to make investments</p>
                    <p>• Your wallet will be securely linked to your profile</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Account Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Separator className="bg-slate-700" />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-100 font-medium">Sign Out</h3>
                    <p className="text-sm text-slate-400">Sign out of your account and disconnect wallet</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleSignOut}
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
