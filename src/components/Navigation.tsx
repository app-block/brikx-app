
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavigationProps {
  connectedWallet: boolean;
  setConnectedWallet: (connected: boolean) => void;
}

const Navigation = ({ connectedWallet, setConnectedWallet }: NavigationProps) => {
  const handleWalletConnect = () => {
    setConnectedWallet(!connectedWallet);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RealEstateX
              </span>
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 text-xs">
                Beta
              </Badge>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Marketplace
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Portfolio
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  DAO Governance
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Analytics
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleWalletConnect}
              variant={connectedWallet ? "outline" : "default"}
              className={connectedWallet 
                ? "border-green-500 text-green-600 hover:bg-green-50" 
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              }
            >
              {connectedWallet ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  0x1234...5678
                </div>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
