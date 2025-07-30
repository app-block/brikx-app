
import { Button } from "@/components/ui/button";
import { useWallet } from '@/hooks/useWallet';
import { useAuth } from '@/contexts/AuthContext';

const WalletButton = () => {
  const { address, isConnected, isConnecting, connectWallet, formatAddress } = useWallet();
  const { user } = useAuth();

  const handleWalletAction = () => {
    connectWallet();
  };

  // Show connect button only if not connected
  if (!isConnected) {
    return (
      <Button
        onClick={handleWalletAction}
        disabled={isConnecting}
        variant="premium"
        className="px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    );
  }

  // Show wallet status when connected but not primary auth
  if (isConnected && user) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-primary/20 shadow-lg backdrop-blur-sm glow-subtle">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <span className="text-xs text-foreground font-medium">{address && formatAddress(address)}</span>
      </div>
    );
  }

  return null;
};

export default WalletButton;
