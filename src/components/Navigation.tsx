
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Settings } from "lucide-react";
import { useWallet } from '@/hooks/useWallet';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavigationLogo from './navigation/NavigationLogo';
import NavigationMenu from './navigation/NavigationMenu';
import UserAccountButton from './navigation/UserAccountButton';
import WalletButton from './navigation/WalletButton';
import MobileMenu from './navigation/MobileMenu';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isConnected, disconnectWallet } = useWallet();
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      signOut();
      if (isConnected) {
        disconnectWallet();
      }
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="relative bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/40 sticky top-0 z-50 shadow-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-0 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo and Navigation Section */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <NavigationLogo />
            <NavigationMenu />
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {isAuthenticated && (
              <Button
                onClick={() => navigate('/settings')}
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-xl transition-all duration-300 hover:scale-105 group"
              >
                <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              </Button>
            )}
            
            <UserAccountButton onClick={handleAuthAction} />
            <WalletButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-xl transition-all duration-300 hover:scale-105"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />
      </div>
    </nav>
  );
};

export default Navigation;
