
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

const Settings = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

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
            email: user.email || ''
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
        } else {
          setProfile(newProfile);
          setFirstName(newProfile.first_name || '');
          setLastName(newProfile.last_name || '');
        }
      } else if (error) {
        console.error('Error loading profile:', error);
      } else {
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
        })
        .eq('id', user.id);

      if (error) {
        toast.error('Error updating profile');
        console.error('Error:', error);
      } else {
        toast.success('Profile updated successfully!');
        setProfile({ ...profile, first_name: firstName, last_name: lastName });
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardContent className="p-6">
              <p className="text-slate-300">Please sign in to access settings.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Settings</h1>
          <p className="text-slate-300">Manage your account settings and preferences</p>
        </div>

        <div className="grid gap-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Profile Information</CardTitle>
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
                    <p className="text-sm text-slate-400">Sign out of your account</p>
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
