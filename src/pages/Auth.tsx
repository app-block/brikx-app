
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/hooks/useWallet';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Wallet, Mail } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, isAuthenticated } = useAuth();
  const { address, isConnected, isConnecting, connectWallet, formatAddress } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Signed in successfully!');
        navigate('/');
      }
    } catch (error: any) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signUp(email, password, firstName, lastName);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Account created! Please check your email for verification.');
      }
    } catch (error: any) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    try {
      await connectWallet();
      if (isConnected) {
        toast.success('Wallet connected successfully!');
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-100">Welcome to BrikX</CardTitle>
          <CardDescription className="text-slate-300">
            Sign in with your email or connect your wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Wallet Connect Option */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Wallet className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-slate-200">Wallet Authentication</span>
            </div>
            <Button
              onClick={handleWalletConnect}
              disabled={isConnecting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isConnecting ? (
                "Connecting..."
              ) : isConnected ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  {address && formatAddress(address)}
                </div>
              ) : (
                "Connect Wallet to Sign In"
              )}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-slate-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-800 px-2 text-slate-400">Or continue with email</span>
            </div>
          </div>

          {/* Email Authentication */}
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
              <TabsTrigger value="signin" className="data-[state=active]:bg-blue-600">
                <Mail className="w-4 h-4 mr-1" />
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-blue-600">
                <Mail className="w-4 h-4 mr-1" />
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-700/50 border-slate-600 text-slate-100"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-200">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-700/50 border-slate-600 text-slate-100"
                    placeholder="Enter your password"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-slate-600 hover:bg-slate-700"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In with Email'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-200">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-slate-100"
                      placeholder="First name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-200">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-slate-100"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-slate-200">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-700/50 border-slate-600 text-slate-100"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-slate-200">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-700/50 border-slate-600 text-slate-100"
                    placeholder="Create a password"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-slate-600 hover:bg-slate-700"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account with Email'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {isConnected && (
            <div className="text-center">
              <p className="text-xs text-slate-400">
                Wallet connected: {address && formatAddress(address)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                You can also create an email account to link with your wallet
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
