
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/hooks/useWallet';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import { ProfileEditor } from '@/components/settings/ProfileEditor';
import { PasswordChangeModal } from '@/components/settings/PasswordChangeModal';
import { TwoFactorModal } from '@/components/settings/TwoFactorModal';
import { Wallet, Copy, Check, Settings as SettingsIcon, Shield, Bell } from 'lucide-react';

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  wallet_address: string | null;
  bio?: string | null;
  location?: string | null;
  avatar_url?: string | null;
  website?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  created_at?: string;
}

const Settings = () => {
  const { user, signOut } = useAuth();
  const { address, isConnected, connectWallet, disconnectWallet, formatAddress } = useWallet();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);

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
        .maybeSingle();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            email: user.email || '',
            wallet_address: address || null,
            created_at: new Date().toISOString()
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
        } else if (newProfile) {
          setProfile(newProfile);
        }
      } else if (error) {
        console.error('Error loading profile:', error);
      } else if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
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

  const tabs = [
    { id: 'profile', label: 'Profile', icon: SettingsIcon },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <Card className="glass-card border border-primary/20 premium-glow">
            <CardContent className="p-6">
              <p className="text-muted-foreground premium-text">Please sign in to access settings.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text crypto-heading mb-2">Settings</h1>
          <p className="text-muted-foreground premium-text">Manage your profile, wallet, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="glass-card border border-primary/20 premium-glow">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                          activeTab === tab.id
                            ? 'bg-primary/20 text-primary border border-primary/40'
                            : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'profile' && (
              <ProfileEditor onProfileUpdate={handleProfileUpdate} />
            )}

            {activeTab === 'wallet' && (
              <Card className="glass-card border border-primary/20 premium-glow">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Wallet Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isConnected && address ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                        <div>
                          <p className="text-foreground font-medium">Connected Wallet</p>
                          <p className="text-muted-foreground text-sm">{formatAddress(address)}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={copyWalletAddress}
                            variant="outline"
                            size="sm"
                            className="border-border hover:bg-primary/10"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                          <Button
                            onClick={disconnectWallet}
                            variant="outline"
                            size="sm"
                            className="border-destructive text-destructive hover:bg-destructive/20"
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>• Your wallet is connected and linked to your profile</p>
                        <p>• You can use this wallet for investments and transactions</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-background/50 rounded-lg text-center border border-border">
                        <p className="text-foreground mb-3">No wallet connected</p>
                        <Button onClick={connectWallet} className="bg-primary hover:bg-primary/90">
                          Connect Wallet
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>• Connect a wallet to make investments</p>
                        <p>• Your wallet will be securely linked to your profile</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card className="glass-card border border-primary/20 premium-glow">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                      <div>
                        <h3 className="text-foreground font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="border-border"
                        onClick={() => setShowTwoFactorModal(true)}
                      >
                        Manage 2FA
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                      <div>
                        <h3 className="text-foreground font-medium">Password</h3>
                        <p className="text-sm text-muted-foreground">Change your account password</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="border-border"
                        onClick={() => setShowPasswordModal(true)}
                      >
                        Change Password
                      </Button>
                    </div>

                    <Separator className="bg-border" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-foreground font-medium">Sign Out</h3>
                        <p className="text-sm text-muted-foreground">Sign out of your account and disconnect wallet</p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={handleSignOut}
                        className="border-destructive text-destructive hover:bg-destructive/20"
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card className="glass-card border border-primary/20 premium-glow">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                      <div>
                        <h3 className="text-foreground font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                      <div>
                        <h3 className="text-foreground font-medium">Investment Updates</h3>
                        <p className="text-sm text-muted-foreground">Get notified about your investment performance</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                      <div>
                        <h3 className="text-foreground font-medium">Marketing Communications</h3>
                        <p className="text-sm text-muted-foreground">Receive news about new opportunities</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Modals */}
        <PasswordChangeModal 
          open={showPasswordModal} 
          onOpenChange={setShowPasswordModal} 
        />
        <TwoFactorModal 
          open={showTwoFactorModal} 
          onOpenChange={setShowTwoFactorModal} 
        />
      </div>
    </div>
  );
};

export default Settings;
