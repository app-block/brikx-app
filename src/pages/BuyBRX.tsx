
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Coins, CreditCard, Wallet, TrendingUp, Shield, History, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useBRXToken } from '@/services/contractService';
import { useWallet } from '@/hooks/useWallet';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

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

  const loadBalance = async () => {
    if (isConnected) {
      const balance = await getBRXBalance();
      setBrxBalance(balance);
    }
  };

  React.useEffect(() => {
    loadBalance();
  }, [isConnected]);

  const brxAmount = usdAmount ? parseFloat(usdAmount) : 0;
  const transactions = isConnected ? getTransactionHistory() : [];
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Coins className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-4">Buy BRX Tokens</h1>
          <p className="text-slate-300 text-lg">
            Purchase BRX tokens to invest in real estate properties • Zero Gas Fees
          </p>
        </div>

        {/* Wallet Status */}
        {isConnected && address && (
          <Card className="bg-slate-800 border-slate-700 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-300">Connected: {formatAddress(address)}</span>
                </div>
                {brxBalance !== null && (
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-emerald-400">{brxBalance} BRX</span>
                  </div>
                )}
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
                1 USD = 1 BRX Token • Zero Gas Fees
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
                  <span className="font-semibold text-emerald-400">$0.00</span>
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
                <Shield className="w-3 h-3" />
                Zero gas fees • Instant wallet transfer
              </div>
            </CardContent>
          </Card>

          {/* Information and Balance Panel */}
          <div className="space-y-6">
            {brxBalance !== null && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-emerald-400" />
                    Your BRX Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">
                      {brxBalance} BRX
                    </div>
                    <div className="text-sm text-slate-400">
                      ≈ ${brxBalance} USD value
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                    Stored in your wallet
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
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Zero Gas Fees</h4>
                    <p className="text-sm text-slate-400">No transaction costs for buying or transferring</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Stable Value</h4>
                    <p className="text-sm text-slate-400">1 BRX = 1 USD, providing stable investment value</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Instant Transfers</h4>
                    <p className="text-sm text-slate-400">Immediate wallet storage and property investments</p>
                  </div>
                </div>
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

            {/* Recent Transactions */}
            {recentTransactions.length > 0 && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-400" />
                    Recent Transactions
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
      
      <Footer />
    </div>
  );
};

export default BuyBRX;
