
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X } from "lucide-react";
import { useWallet } from '@/hooks/useWallet';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { address, isConnected, isConnecting, connectWallet, disconnectWallet, formatAddress } = useWallet();

  const handleWalletAction = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                R
              </div>
              <div className="ml-2 sm:ml-3 flex flex-col">
                <span className="text-lg sm:text-2xl font-bold text-blue-400">
                  RealEstateX
                </span>
                <Badge variant="secondary" className="bg-emerald-900/50 text-emerald-300 text-xs w-fit border-emerald-500/30">
                  Enterprise
                </Badge>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-baseline space-x-1">
                <a href="#" className="text-slate-100 hover:text-blue-400 px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-slate-800/50">
                  Marketplace
                </a>
                <a href="#" className="text-slate-300 hover:text-blue-400 px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-slate-800/50">
                  Analytics
                </a>
                <a href="#" className="text-slate-300 hover:text-blue-400 px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-slate-800/50">
                  DAO
                </a>
                <a href="#" className="text-slate-300 hover:text-blue-400 px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-slate-800/50">
                  Intelligence
                </a>
              </div>
            </div>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 font-medium text-sm"
            >
              Enterprise
            </Button>
            <Button
              onClick={handleWalletAction}
              disabled={isConnecting}
              variant={isConnected ? "outline" : "default"}
              className={isConnected 
                ? "border-emerald-500/50 text-emerald-400 hover:bg-emerald-950/50 font-semibold text-sm" 
                : "bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg text-sm"
              }
            >
              {isConnecting ? (
                "Connecting..."
              ) : isConnected ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  {address && formatAddress(address)}
                </div>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-slate-100 hover:bg-slate-800/50"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block text-slate-100 hover:text-blue-400 px-3 py-2 rounded-md text-base font-semibold hover:bg-slate-800/50">
                Marketplace
              </a>
              <a href="#" className="block text-slate-300 hover:text-blue-400 px-3 py-2 rounded-md text-base font-semibold hover:bg-slate-800/50">
                Analytics
              </a>
              <a href="#" className="block text-slate-300 hover:text-blue-400 px-3 py-2 rounded-md text-base font-semibold hover:bg-slate-800/50">
                DAO
              </a>
              <a href="#" className="block text-slate-300 hover:text-blue-400 px-3 py-2 rounded-md text-base font-semibold hover:bg-slate-800/50">
                Intelligence
              </a>
              <div className="pt-4 pb-2 border-t border-slate-700/50 mt-4">
                <Button
                  onClick={handleWalletAction}
                  disabled={isConnecting}
                  variant={isConnected ? "outline" : "default"}
                  className="w-full"
                >
                  {isConnecting ? (
                    "Connecting..."
                  ) : isConnected ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      Connected
                    </div>
                  ) : (
                    "Connect Wallet"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
