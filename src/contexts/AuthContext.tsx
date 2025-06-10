
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useAccount } from 'wagmi';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  walletAddress: string | undefined;
  isWalletConnected: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  linkWalletToProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { address: walletAddress, isConnected: isWalletConnected } = useAccount();

  // User is authenticated if they have either a Supabase session OR a connected wallet
  const isAuthenticated = !!(session?.user || isWalletConnected);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // If user signs in with email and has a wallet connected, link them
        if (event === 'SIGNED_IN' && session?.user && walletAddress) {
          setTimeout(() => {
            linkWalletToProfile();
          }, 0);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [walletAddress]);

  // Link wallet address to user profile when both are available
  const linkWalletToProfile = async () => {
    if (!user?.id || !walletAddress) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          wallet_address: walletAddress,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });

      if (error) {
        console.error('Error linking wallet to profile:', error);
      } else {
        console.log('Wallet linked to profile successfully');
      }
    } catch (error) {
      console.error('Error in linkWalletToProfile:', error);
    }
  };

  // Link wallet when it gets connected and user is already signed in
  useEffect(() => {
    if (user?.id && walletAddress && isWalletConnected) {
      linkWalletToProfile();
    }
  }, [user?.id, walletAddress, isWalletConnected]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName,
          wallet_address: walletAddress, // Include wallet if connected during signup
        }
      }
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value: AuthContextType = {
    user,
    session,
    walletAddress,
    isWalletConnected,
    isAuthenticated,
    loading,
    signIn,
    signUp,
    signOut,
    linkWalletToProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
