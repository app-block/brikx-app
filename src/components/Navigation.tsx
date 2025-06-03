
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  connectedWallet: boolean;
  setConnectedWallet: (connected: boolean) => void;
}

const Navigation = ({ connectedWallet, setConnectedWallet }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWalletConnect = () => {
    setConnectedWallet(!connectedWallet);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                R
              </div>
              <div className="ml-3 flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RealEstateX
                </span>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs w-fit">
                  Enterprise
                </Badge>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-baseline space-x-1">
                <a href="#" className="text-gray-900 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-blue-50">
                  Asset Marketplace
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-blue-50">
                  Portfolio Analytics
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-blue-50">
                  DAO Governance
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-blue-50">
                  Market Intelligence
                </a>
              </div>
            </div>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Enterprise Solutions
            </Button>
            <Button
              onClick={handleWalletConnect}
              variant={connectedWallet ? "outline" : "default"}
              className={connectedWallet 
                ? "border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-semibold" 
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg"
              }
            >
              {connectedWallet ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  0x1234...Ab8f
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
              className="text-gray-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-base font-semibold">
                Asset Marketplace
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-semibold">
                Portfolio Analytics
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-semibold">
                DAO Governance
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-semibold">
                Market Intelligence
              </a>
              <div className="pt-4 pb-2 border-t border-gray-100 mt-4">
                <Button
                  onClick={handleWalletConnect}
                  variant={connectedWallet ? "outline" : "default"}
                  className="w-full"
                >
                  {connectedWallet ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      Connected Wallet
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
