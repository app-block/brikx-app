
import { useState } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InvestmentModal from "@/components/InvestmentModal";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewCards from "@/components/dashboard/OverviewCards";
import InvestmentHoldings from "@/components/dashboard/InvestmentHoldings";
import AuthenticationRequired from "@/components/dashboard/AuthenticationRequired";
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/hooks/useWallet';

const InvestmentDashboard = () => {
  const { isAuthenticated } = useAuth();
  const { isConnected, connectWallet } = useWallet();
  const [investModalOpen, setInvestModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  
  const [investments] = useState([
    {
      id: 1,
      name: "Dubai Marina Resort",
      tokens: 50,
      totalValue: 425000,
      currentValue: 467500,
      apy: 22.5,
      monthlyIncome: 1875,
      change: 10.0,
      tokenPrice: 8500
    },
    {
      id: 2,
      name: "Bangalore Tech Hub",
      tokens: 25,
      totalValue: 300000,
      currentValue: 315000,
      apy: 18.8,
      monthlyIncome: 1250,
      change: 5.0,
      tokenPrice: 12000
    }
  ]);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.totalValue, 0);
  const currentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalReturn = currentValue - totalInvested;
  const totalMonthlyIncome = investments.reduce((sum, inv) => sum + inv.monthlyIncome, 0);

  const handleBuyMore = (investment: any) => {
    setSelectedProperty(investment);
    setInvestModalOpen(true);
  };

  const handleSell = (investment: any) => {
    setSelectedProperty(investment);
    setWithdrawModalOpen(true);
  };

  // Show access required message if user is not authenticated and wallet is not connected
  if (!isAuthenticated && !isConnected) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        <AuthenticationRequired connectWallet={connectWallet} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <DashboardHeader />
        
        <OverviewCards 
          totalInvested={totalInvested}
          currentValue={currentValue}
          totalReturn={totalReturn}
          totalMonthlyIncome={totalMonthlyIncome}
        />

        <InvestmentHoldings 
          investments={investments}
          onBuyMore={handleBuyMore}
          onSell={handleSell}
        />
      </div>
      
      <Footer />

      {/* Investment Modal */}
      {selectedProperty && (
        <>
          <InvestmentModal
            isOpen={investModalOpen}
            onClose={() => {
              setInvestModalOpen(false);
              setSelectedProperty(null);
            }}
            propertyId={selectedProperty.id}
            propertyName={selectedProperty.name}
            tokenPrice={selectedProperty.tokenPrice}
            mode="invest"
          />
          
          <InvestmentModal
            isOpen={withdrawModalOpen}
            onClose={() => {
              setWithdrawModalOpen(false);
              setSelectedProperty(null);
            }}
            propertyId={selectedProperty.id}
            propertyName={selectedProperty.name}
            tokenPrice={selectedProperty.tokenPrice}
            mode="withdraw"
          />
        </>
      )}
    </div>
  );
};

export default InvestmentDashboard;
