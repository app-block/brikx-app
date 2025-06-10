
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
        className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    );
  }

  // Show wallet status when connected but not primary auth
  if (isConnected && user) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-600">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-slate-300">{address && formatAddress(address)}</span>
      </div>
    );
  }

  return null;
};

export default WalletButton;
