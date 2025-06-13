
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
        className="relative px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-500 hover:via-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 group overflow-hidden"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <span className="relative z-10">
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </span>
      </Button>
    );
  }

  // Show wallet status when connected but not primary auth
  if (isConnected && user) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-600/50 backdrop-blur-sm shadow-lg">
        <div className="relative">
          <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
          <div className="absolute inset-0 w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping opacity-20"></div>
        </div>
        <span className="text-xs text-slate-300 font-medium">{address && formatAddress(address)}</span>
      </div>
    );
  }

  return null;
};

export default WalletButton;
