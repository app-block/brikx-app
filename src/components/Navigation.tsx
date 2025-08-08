
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
import { ThemeToggle } from './ThemeToggle';

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
    <nav className="relative bg-background/80 backdrop-blur-xl border-b border-border/40 sticky top-0 z-50 shadow-elegant transition-all duration-300">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
          {/* Logo and Navigation Section */}
          <div className="flex items-center space-x-6 sm:space-x-8 lg:space-x-12">
            <NavigationLogo />
            <NavigationMenu />
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
            <ThemeToggle />
            
            {isAuthenticated && (
              <Button
                onClick={() => navigate('/settings')}
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-xl transition-all duration-300 hover:scale-105 border border-transparent hover:border-accent/30 h-10 w-10"
              >
                <Settings className="h-5 w-5" />
              </Button>
            )}
            
            <div className="flex items-center space-x-3 lg:space-x-4">
              <UserAccountButton onClick={handleAuthAction} />
              <WalletButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-xl transition-all duration-300 border border-transparent hover:border-accent/30 h-10 w-10"
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
