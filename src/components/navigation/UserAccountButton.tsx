
import { Button } from "@/components/ui/button";
import { User, Wallet } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/hooks/useWallet';

interface UserAccountButtonProps {
  onClick: () => void;
}

const UserAccountButton = ({ onClick }: UserAccountButtonProps) => {
  const { user, isAuthenticated } = useAuth();
  const { address, isConnected, formatAddress } = useWallet();

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
    <Button
      onClick={onClick}
      variant={isAuthenticated ? "outline" : "ghost"}
      className={`relative px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 group overflow-hidden ${
        isAuthenticated
          ? "border-gradient-to-r from-emerald-500/60 to-cyan-500/60 text-emerald-300 hover:text-white bg-gradient-to-r hover:from-emerald-950/60 hover:to-cyan-950/60 shadow-lg shadow-emerald-500/20" 
          : "text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-700/60 hover:to-slate-600/60"
      }`}
    >
      {/* Glow effect for authenticated users */}
      {isAuthenticated && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      
      <div className="relative z-10">
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
      </div>
    </Button>
  );
};

export default UserAccountButton;
