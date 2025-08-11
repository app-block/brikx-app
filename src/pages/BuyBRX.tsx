
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Coins, CreditCard, Wallet, TrendingUp, Shield, History, CheckCircle, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useBRXToken } from '@/services/contractService';
import { useBRXContract, useUSDTContract } from '@/services/blockchainService';
import { useWallet } from '@/hooks/useWallet';
import { useAuth } from '@/contexts/AuthContext';
import { useChainId } from 'wagmi';
import { toast } from "sonner";
import USDTPaymentModal from '@/components/blockchain/USDTPaymentModal';

const BuyBRX = () => {
  const [usdAmount, setUsdAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [brxBalance, setBrxBalance] = useState<number | null>(null);
  const { buyBRX, getBRXBalance, getTransactionHistory } = useBRXToken();
  const { isConnected, address, connectWallet, formatAddress } = useWallet();
  const { isAuthenticated } = useAuth();

  const handleBuyBRX = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    if (!usdAmount || parseFloat(usdAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    try {
      const result = await buyBRX(parseFloat(usdAmount));
      if (result.success) {
        toast.success(`Successfully purchased ${result.amount} BRX tokens! (Zero gas fees)`);
        setUsdAmount('');
        setBrxBalance(result.newBalance);
      }
    } catch (error) {
      toast.error("Purchase failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load balance is handled by the hooks automatically for blockchain mode
  React.useEffect(() => {
    // No need to manually load balance for blockchain mode
  }, [isConnected]);

  const brxAmount = usdAmount ? parseFloat(usdAmount) : 0;
  const transactions = isConnected ? getTransactionHistory() : [];
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 premium-glow">
            <Coins className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold gradient-text luxury-heading mb-4">Buy BRX Tokens</h1>
          <p className="text-muted-foreground text-lg premium-text">
            Purchase BRX tokens using USDT from your connected wallet
          </p>
          
          {/* Payment Method Toggle */}
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant={paymentMethod === 'usdt' ? 'default' : 'outline'}
              onClick={() => setPaymentMethod('usdt')}
              className="flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Real USDT Payment
            </Button>
            <Button
              variant={paymentMethod === 'demo' ? 'default' : 'outline'}
              onClick={() => setPaymentMethod('demo')}
              className="flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Demo Mode
            </Button>
          </div>
        </div>

        {/* Wallet Status */}
        {isConnected && address && (
          <Card className="glass-card border border-primary/20 mb-6 premium-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-300">Connected: {formatAddress(address)}</span>
                </div>
                <div className="flex items-center gap-4">
                  {paymentMethod === 'usdt' && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-blue-400" />
                      <span className="font-semibold text-blue-400">{parseFloat(usdtBalance).toFixed(2)} USDT</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-emerald-400">
                      {brxBalance !== null ? brxBalance.toFixed(2) : '0.00'} BRX
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Purchase Form */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                Purchase BRX Tokens
              </CardTitle>
              <CardDescription className="text-slate-300">
                {paymentMethod === 'usdt' ? '1 USDT = 1 BRX Token • Blockchain Payment' : '1 USD = 1 BRX Token • Demo Mode'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="usdAmount" className="text-slate-200">
                  Amount (USD)
                </Label>
                <Input
                  id="usdAmount"
                  type="number"
                  step="0.01"
                  min="1"
                  placeholder="100"
                  value={usdAmount}
                  onChange={(e) => setUsdAmount(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-slate-100"
                />
                {usdAmount && (
                  <div className="text-sm text-slate-400">
                    You will receive: {brxAmount} BRX tokens
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">USD Amount:</span>
                  <span className="font-semibold text-slate-100">${usdAmount || '0'}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">BRX Tokens:</span>
                  <span className="font-semibold text-slate-100">{brxAmount}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Gas Fees:</span>
                  <span className="font-semibold text-emerald-400">
                    {paymentMethod === 'usdt' ? 'Network fees apply' : '$0.00'}
                  </span>
                </div>
                <div className="border-t border-slate-600 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total Cost:</span>
                    <span className="text-emerald-400 font-bold">${usdAmount || '0'}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleBuyBRX}
                disabled={isLoading || !usdAmount || parseFloat(usdAmount) <= 0}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : isConnected ? (
                  `Buy ${brxAmount} BRX for $${usdAmount || '0'}`
                ) : (
                  'Connect Wallet'
                )}
              </Button>

              <div className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                {paymentMethod === 'usdt' ? (
                  <>
                    <Zap className="w-3 h-3" />
                    Real blockchain transaction • USDT payment required
                  </>
                ) : (
                  <>
                    <Shield className="w-3 h-3" />
                    Demo mode • Zero gas fees • Instant wallet transfer
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Information and Balance Panel */}
          <div className="space-y-6">
            {isConnected && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-emerald-400" />
                    Your Wallet Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethod === 'usdt' && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">
                          {parseFloat(usdtBalance).toFixed(2)} USDT
                        </div>
                        <div className="text-sm text-slate-400">Available for payments</div>
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-1">
                        {brxBalance !== null ? brxBalance.toFixed(2) : '0.00'} BRX
                      </div>
                      <div className="text-sm text-slate-400">
                        ≈ ${brxBalance !== null ? brxBalance.toFixed(2) : '0.00'} USD value
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-emerald-400 mt-4">
                    <CheckCircle className="w-4 h-4" />
                    {paymentMethod === 'usdt' ? 'On-chain wallet storage' : 'Demo wallet storage'}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Why BRX Tokens?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethod === 'usdt' ? (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-slate-200">Blockchain Powered</h4>
                        <p className="text-sm text-slate-400">Real USDT payments on Ethereum, BSC, Polygon</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-slate-200">Smart Contracts</h4>
                        <p className="text-sm text-slate-400">Automated token minting and property investments</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-slate-200">Real-time Updates</h4>
                        <p className="text-sm text-slate-400">Blockchain event listening and instant balance updates</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-slate-200">Demo Mode</h4>
                        <p className="text-sm text-slate-400">Test the platform without real payments</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-slate-200">Zero Gas Fees</h4>
                        <p className="text-sm text-slate-400">No transaction costs for testing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-slate-200">Instant Transfers</h4>
                        <p className="text-sm text-slate-400">Immediate demo wallet storage</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-100">Quick Purchase Amounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[50, 100, 250, 500].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => setUsdAmount(amount.toString())}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions - Only show for demo mode */}
            {paymentMethod === 'demo' && recentTransactions.length > 0 && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-400" />
                    Recent Demo Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm text-slate-300 capitalize">{tx.type}</span>
                        </div>
                        <span className="text-sm font-semibold text-emerald-400">+{tx.amount} BRX</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      {/* USDT Payment Modal */}
      <USDTPaymentModal
        isOpen={showUSDTModal}
        onClose={() => setShowUSDTModal(false)}
        onSuccess={handleUSDTSuccess}
      />
      
      <Footer />
    </div>
  );
};

export default BuyBRX;
