
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
        className="px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:scale-105"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    );
  }

  // Show wallet status when connected but not primary auth
  if (isConnected && user) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 shadow-md">
        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
        <span className="text-xs text-slate-300 font-medium">{address && formatAddress(address)}</span>
      </div>
    );
  }

  return null;
};

export default WalletButton;
