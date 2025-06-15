
import { Wallet } from "lucide-react";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useWallet } from "@/hooks/useWallet";

// Floating connect wallet icon for mobile friendliness
const ConnectWalletIcon = () => {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useWallet();

  if (isConnected) return null; // Hide if wallet is already connected

  return (
    <button
      onClick={() => openConnectModal && openConnectModal()}
      className="fixed z-50 bottom-5 right-5 md:bottom-8 md:right-8 p-4 rounded-full bg-gradient-to-br from-blue-600 to-emerald-600 shadow-lg shadow-blue-800/30 active:scale-95 hover:scale-105 transition-all text-white"
      aria-label="Connect wallet"
      style={{ boxShadow: "0 2px 18px 2px rgba(24,90,219,.14)" }}
    >
      <Wallet className="w-7 h-7" />
    </button>
  );
};

export default ConnectWalletIcon;
