
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Wallet, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InvestmentModal from "@/components/InvestmentModal";
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/hooks/useWallet';

const InvestmentDashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const { isConnected, address, connectWallet, formatAddress } = useWallet();
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
        
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-10 h-10 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-slate-100 mb-4">Investment Dashboard</h1>
              <p className="text-slate-300 text-lg mb-8">
                Access your real estate portfolio and track your investments
              </p>
            </div>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-100 mb-3">
                      Authentication Required
                    </h2>
                    <p className="text-slate-300 mb-6">
                      To view your investment dashboard, please sign in to your account or connect your crypto wallet.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-700/50 border-slate-600 p-6">
                      <div className="text-center">
                        <User className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                        <h3 className="font-semibold text-slate-100 mb-2">Sign In</h3>
                        <p className="text-sm text-slate-300 mb-4">
                          Access your account with email and password
                        </p>
                        <Button 
                          onClick={() => window.location.href = '/auth'}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Sign In
                        </Button>
                      </div>
                    </Card>

                    <Card className="bg-slate-700/50 border-slate-600 p-6">
                      <div className="text-center">
                        <Wallet className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                        <h3 className="font-semibold text-slate-100 mb-2">Connect Wallet</h3>
                        <p className="text-sm text-slate-300 mb-4">
                          Connect your crypto wallet to get started
                        </p>
                        <Button 
                          onClick={connectWallet}
                          className="w-full bg-emerald-600 hover:bg-emerald-700"
                        >
                          Connect Wallet
                        </Button>
                      </div>
                    </Card>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-sm text-slate-400">
                      Don't have an account?{' '}
                      <a href="/auth" className="text-blue-400 hover:text-blue-300">
                        Create one here
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
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

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-300">Total Invested</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-100">${totalInvested.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-300">Current Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-100">${currentValue.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-300">Total Return</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">+${totalReturn.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-300">Monthly Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">${totalMonthlyIncome.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Investment Holdings */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-slate-100">Your Investments</CardTitle>
            <CardDescription className="text-slate-300">Manage your property token holdings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investments.map((investment) => (
                <div key={investment.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-100">{investment.name}</h3>
                    <p className="text-sm text-slate-400">{investment.tokens} tokens owned</p>
                  </div>
                  <div className="text-right mr-4">
                    <p className="font-semibold text-slate-100">${investment.currentValue.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      {investment.change > 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      )}
                      <span className={investment.change > 0 ? "text-emerald-400" : "text-red-400"}>
                        {investment.change}%
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-emerald-600 text-emerald-400 hover:bg-emerald-950"
                      onClick={() => handleBuyMore(investment)}
                    >
                      Buy More
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-blue-600 text-blue-400 hover:bg-blue-950"
                      onClick={() => handleSell(investment)}
                    >
                      Withdraw
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
