
import { Button } from "@/components/ui/button";
import { Settings, User, Wallet } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/hooks/useWallet';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, signOut } = useAuth();
  const { address, isConnected, isConnecting, connectWallet, disconnectWallet, formatAddress } = useWallet();

  const navItems = [
    { label: 'Marketplace', path: '/marketplace' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Analytics', path: '/analytics' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleAuthAction = () => {
    if (isAuthenticated) {
      signOut();
      if (isConnected) {
        disconnectWallet();
      }
    } else {
      navigate('/auth');
    }
    onClose();
  };

  const handleWalletAction = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
    onClose();
  };

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

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-slate-700/60 bg-slate-900/95 backdrop-blur-lg rounded-b-xl">
      <div className="px-2 pt-2 pb-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              onClose();
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
                onClose();
              }}
              variant="outline"
              className="w-full rounded-xl"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          )}
          
          <Button
            onClick={handleAuthAction}
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
              onClick={handleWalletAction}
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
  );
};

export default MobileMenu;
