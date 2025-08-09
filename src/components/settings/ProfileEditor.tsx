import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Camera, 
  MapPin, 
  Calendar, 
  Link as LinkIcon,
  Edit3,
  Save,
  X,
  Upload,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/hooks/useWallet';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProfileData {
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

interface ProfileEditorProps {
  onProfileUpdate?: (profile: ProfileData) => void;
}

export const ProfileEditor = ({ onProfileUpdate }: ProfileEditorProps) => {
  const { user } = useAuth();
  const { address } = useWallet();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    location: '',
    website: '',
    twitter: '',
    linkedin: '',
  });

  // Load profile data
  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user?.id]);

  const loadProfile = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          bio: data.bio || '',
          location: data.location || '',
          website: data.website || '',
          twitter: data.twitter || '',
          linkedin: data.linkedin || '',
        });
      } else {
        // Create initial profile if it doesn't exist
        const newProfile = {
          id: user.id,
          first_name: null,
          last_name: null,
          email: user.email,
          wallet_address: address || null,
          bio: null,
          location: null,
          avatar_url: null,
          website: null,
          twitter: null,
          linkedin: null,
          created_at: new Date().toISOString(),
        };
        
        const { error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile);

        if (!insertError) {
          setProfile(newProfile);
        }
      }
    } catch (error) {
      console.error('Error in loadProfile:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user || !profile) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          wallet_address: address || null,
        })
        .eq('id', user.id);

      if (error) {
        toast.error('Error updating profile');
        console.error('Error:', error);
      } else {
        toast.success('Profile updated successfully!');
        const updatedProfile = { 
          ...profile!, 
          ...formData,
          wallet_address: address || null
        };
        setProfile(updatedProfile);
        onProfileUpdate?.(updatedProfile);
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      website: profile?.website || '',
      twitter: profile?.twitter || '',
      linkedin: profile?.linkedin || '',
    });
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Image size must be less than 5MB');
      return;
    }

    setUploadingAvatar(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        toast.error('Error uploading image');
        console.error('Upload error:', uploadError);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) {
        toast.error('Error updating profile');
        console.error('Update error:', updateError);
        return;
      }

      // Update local state
      const updatedProfile = { ...profile!, avatar_url: publicUrl };
      setProfile(updatedProfile);
      onProfileUpdate?.(updatedProfile);
      
      toast.success('Avatar updated successfully!');
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Error:', error);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const getInitials = () => {
    const firstName = formData.first_name || profile?.first_name || '';
    const lastName = formData.last_name || profile?.last_name || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getJoinDate = () => {
    if (profile?.created_at) {
      return new Date(profile.created_at).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });
    }
    return 'Recently';
  };

  return (
    <Card className="glass-card border border-primary/20 premium-glow">
      <CardHeader className="space-y-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile
          </CardTitle>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
              className="border-primary/40 text-primary hover:bg-primary/10"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={loading}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
                className="border-muted-foreground/40"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Profile Header */}
        <div className="flex items-start gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24 ring-2 ring-primary/20">
              <AvatarImage src={profile?.avatar_url} alt="Profile" />
              <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                onClick={handleAvatarClick}
                disabled={uploadingAvatar}
                size="sm"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-primary hover:bg-primary/90"
              >
                {uploadingAvatar ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </Button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="flex-1 space-y-3">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-muted-foreground text-sm">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className="bg-background/50 border-border"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-muted-foreground text-sm">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className="bg-background/50 border-border"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {formData.first_name || formData.last_name 
                    ? `${formData.first_name} ${formData.last_name}` 
                    : 'Anonymous User'}
                </h3>
                <p className="text-muted-foreground">{profile?.email}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Calendar className="w-3 h-3 mr-1" />
                Joined {getJoinDate()}
              </Badge>
              {address && (
                <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary/20">
                  Wallet Connected
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Bio Section */}
        <div className="space-y-3">
          <Label className="text-foreground font-medium">Bio</Label>
          {isEditing ? (
            <Textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="bg-background/50 border-border min-h-[100px]"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-muted-foreground">
              {formData.bio || 'No bio added yet.'}
            </p>
          )}
        </div>

        <Separator className="bg-border" />

        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="text-foreground font-medium">Contact Information</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              {isEditing ? (
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="bg-background/50 border-border"
                  placeholder="e.g., New York, NY"
                />
              ) : (
                <p className="text-foreground">{formData.location || 'Not specified'}</p>
              )}
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                Website
              </Label>
              {isEditing ? (
                <Input
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="bg-background/50 border-border"
                  placeholder="https://yourwebsite.com"
                />
              ) : (
                <p className="text-foreground">
                  {formData.website ? (
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" 
                       className="text-primary hover:underline">
                      {formData.website}
                    </a>
                  ) : 'Not specified'}
                </p>
              )}
            </div>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Social Links */}
        <div className="space-y-4">
          <h4 className="text-foreground font-medium">Social Links</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Twitter */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Twitter</Label>
              {isEditing ? (
                <Input
                  value={formData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  className="bg-background/50 border-border"
                  placeholder="@username"
                />
              ) : (
                <p className="text-foreground">
                  {formData.twitter ? (
                    <a href={`https://twitter.com/${formData.twitter.replace('@', '')}`} 
                       target="_blank" rel="noopener noreferrer" 
                       className="text-primary hover:underline">
                      {formData.twitter}
                    </a>
                  ) : 'Not connected'}
                </p>
              )}
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">LinkedIn</Label>
              {isEditing ? (
                <Input
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  className="bg-background/50 border-border"
                  placeholder="linkedin.com/in/username"
                />
              ) : (
                <p className="text-foreground">
                  {formData.linkedin ? (
                    <a href={formData.linkedin.startsWith('http') ? formData.linkedin : `https://${formData.linkedin}`} 
                       target="_blank" rel="noopener noreferrer" 
                       className="text-primary hover:underline">
                      LinkedIn Profile
                    </a>
                  ) : 'Not connected'}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};