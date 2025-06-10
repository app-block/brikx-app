
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Settings, User, Wallet } from "lucide-react";
import { useWallet } from '@/hooks/useWallet';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { address, isConnected, isConnecting, connectWallet, disconnectWallet, formatAddress } = useWallet();
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleWalletAction = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

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

  const navItems = [
    { label: 'Marketplace', path: '/marketplace' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Analytics', path: '/analytics' }
  ];

  const isActive = (path: string) => location.pathname === path;

  // Determine user display info
  const getUserDisplayInfo = () => {
    if (user) {
      return {
        name: user.user_metadata?.first_name || 'Account',
        type: 'email'
      };
    } else if (isConnected && address) {
      return {
        name: formatAddress(address),
        type: 'wallet'
      };
    }
    return null;
  };

  const userInfo = getUserDisplayInfo();

  return (
    <nav className="bg-slate-900/98 backdrop-blur-lg border-b border-slate-700/60 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg group-hover:bg-blue-700 transition-all duration-300 group-hover:scale-105">
                B
              </div>
              <div className="ml-3 flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                  BrikX
                </span>
                <Badge variant="secondary" className="bg-emerald-900/60 text-emerald-300 text-xs w-fit border-emerald-500/40 font-medium">
                  Enterprise
                </Badge>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-baseline space-x-2">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`px-4 xl:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-slate-800/60 hover:scale-105 ${
                      isActive(item.path) 
                        ? 'text-blue-400 bg-slate-800/60 shadow-md' 
                        : 'text-slate-300 hover:text-blue-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {isAuthenticated && (
              <Button
                onClick={() => navigate('/settings')}
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 rounded-xl"
              >
                <Settings className="h-5 w-5" />
              </Button>
            )}
            
            {/* User Account Button */}
            <Button
              onClick={handleAuthAction}
              variant={isAuthenticated ? "outline" : "ghost"}
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isAuthenticated
                  ? "border-emerald-500/60 text-emerald-400 hover:bg-emerald-950/60 hover:border-emerald-400" 
                  : "text-slate-300 hover:text-slate-100 hover:bg-slate-800/60"
              }`}
            >
              {isAuthenticated && userInfo ? (
                <div className="flex items-center gap-2">
                  {userInfo.type === 'email' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Wallet className="w-4 h-4" />
                  )}
                  <span>{userInfo.name}</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Wallet Connect Button - Show only if not wallet-authenticated */}
            {!isConnected && (
              <Button
                onClick={handleWalletAction}
                disabled={isConnecting}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}

            {/* Wallet Status - Show when connected but not primary auth */}
            {isConnected && user && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-600">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-300">{address && formatAddress(address)}</span>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 rounded-xl"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700/60 bg-slate-900/95 backdrop-blur-lg rounded-b-xl">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold hover:bg-slate-800/60 transition-all duration-300 ${
                    isActive(item.path) 
                      ? 'text-blue-400 bg-slate-800/60' 
                      : 'text-slate-300 hover:text-blue-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 pb-2 border-t border-slate-700/60 mt-4 space-y-2">
                {isAuthenticated && (
                  <Button
                    onClick={() => {
                      navigate('/settings');
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full rounded-xl"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                )}
                
                <Button
                  onClick={() => {
                    handleAuthAction();
                    setMobileMenuOpen(false);
                  }}
                  variant={isAuthenticated ? "outline" : "default"}
                  className="w-full rounded-xl"
                >
                  {isAuthenticated ? (
                    <div className="flex items-center gap-2">
                      {userInfo?.type === 'email' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Wallet className="w-4 h-4" />
                      )}
                      Sign Out
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                
                {!isConnected && (
                  <Button
                    onClick={() => {
                      handleWalletAction();
                      setMobileMenuOpen(false);
                    }}
                    disabled={isConnecting}
                    variant="default"
                    className="w-full rounded-xl"
                  >
                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                  </Button>
                )}

                {isConnected && (
                  <div className="flex items-center justify-center gap-2 py-2 text-sm text-slate-400">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    Wallet: {address && formatAddress(address)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
