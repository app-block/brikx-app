
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/hooks/useWallet';

const DashboardHeader = () => {
  const { user } = useAuth();
  const { isConnected, address, formatAddress } = useWallet();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-4">Investment Dashboard</h1>
          <p className="text-slate-300">Track your real estate portfolio performance</p>
        </div>
        <div className="text-right">
          {user && (
            <p className="text-sm text-slate-400 mb-1">
              Welcome back, {user.user_metadata?.first_name || 'Investor'}
            </p>
          )}
          {isConnected && address && (
            <p className="text-sm text-emerald-400">
              Wallet: {formatAddress(address)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
