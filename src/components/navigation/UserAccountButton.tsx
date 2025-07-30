
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
      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
        isAuthenticated
          ? "border-primary/40 text-primary hover:text-primary-foreground hover:bg-primary/20 shadow-lg glow-subtle" 
          : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
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
  );
};

export default UserAccountButton;
