
import { useState } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InvestmentModal from "@/components/InvestmentModal";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewCards from "@/components/dashboard/OverviewCards";
import InvestmentHoldings from "@/components/dashboard/InvestmentHoldings";
import AuthenticationRequired from "@/components/dashboard/AuthenticationRequired";
import AddPropertyForm from "@/components/dashboard/AddPropertyForm";
import UserProperties from "@/components/dashboard/UserProperties";
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/hooks/useWallet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        
        <Tabs defaultValue="portfolio" className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/60 border border-slate-700">
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="add-property" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Add Property
            </TabsTrigger>
            <TabsTrigger value="my-properties" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              My Properties
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio" className="space-y-8 mt-8">
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
          </TabsContent>
          
          <TabsContent value="add-property" className="mt-8">
            <AddPropertyForm />
          </TabsContent>
          
          <TabsContent value="my-properties" className="mt-8">
            <UserProperties />
          </TabsContent>
        </Tabs>
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
