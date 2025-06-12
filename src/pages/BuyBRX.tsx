
import { useState, useEffect } from 'react';
import { CreditCard, Wallet, TrendingUp, Shield, Zap, ArrowRight, Copy, CheckCircle } from 'lucide-react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWallet } from '@/hooks/useWallet';
import { useAuth } from '@/contexts/AuthContext';
import { contractService } from '@/services/contractService';
import { useToast } from '@/hooks/use-toast';

const BuyBRX = () => {
  const [usdAmount, setUsdAmount] = useState('');
  const [brxAmount, setBrxAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  
  const { address, isConnected } = useWallet();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isConnected && address) {
      loadWalletData();
    }
  }, [isConnected, address]);

  const loadWalletData = async () => {
    if (address) {
      const balance = await contractService.getBRXBalance(address);
      const history = await contractService.getTransactionHistory(address);
      setWalletBalance(balance);
      setTransactionHistory(history);
    }
  };

  const handleUsdChange = (value: string) => {
    setUsdAmount(value);
    setBrxAmount(value); // 1:1 ratio
  };

  const handleBrxChange = (value: string) => {
    setBrxAmount(value);
    setUsdAmount(value); // 1:1 ratio
  };

  const handlePurchase = async () => {
    if (!address) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to purchase BRX tokens.",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(brxAmount);
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      await contractService.purchaseBRX(address, amount);
      
      toast({
        title: "Purchase Successful!",
        description: `${amount} BRX tokens have been added to your wallet.`,
      });

      // Reset form and reload data
      setUsdAmount('');
      setBrxAmount('');
      await loadWalletData();
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Zero Gas Fees
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Buy BRX Tokens
              <span className="block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                $1 = 1 BRX
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Purchase BRX tokens to invest in premium real estate properties worldwide. Simple, secure, and instant.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Purchase Form */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/50 backdrop-blur-md border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-emerald-400" />
                    Purchase BRX Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Amount Input */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">USD Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={usdAmount}
                          onChange={(e) => handleUsdChange(e.target.value)}
                          className="pl-8 bg-slate-700/50 border-slate-600 text-white text-lg h-12"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">BRX Tokens</label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={brxAmount}
                          onChange={(e) => handleBrxChange(e.target.value)}
                          className="bg-slate-700/50 border-slate-600 text-white text-lg h-12"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400 font-semibold">BRX</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {[50, 100, 500, 1000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => handleUsdChange(amount.toString())}
                        className="border-slate-600 hover:border-emerald-500 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-300"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>

                  {/* Purchase Button */}
                  <Button
                    onClick={handlePurchase}
                    disabled={!address || !brxAmount || isProcessing}
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-4 text-lg rounded-xl transform transition-all duration-300 hover:scale-105"
                  >
                    {isProcessing ? (
                      "Processing..."
                    ) : !address ? (
                      "Connect Wallet to Purchase"
                    ) : (
                      <>
                        Purchase {brxAmount} BRX Tokens
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  {/* Connection Status */}
                  {isConnected && address && (
                    <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-emerald-300 font-medium">Wallet Connected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300">{formatAddress(address)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyAddress}
                          className="h-6 w-6 p-0 hover:bg-emerald-500/20"
                        >
                          {copied ? (
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3 text-slate-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-slate-800/30 backdrop-blur-md border border-slate-700/30 rounded-xl">
                  <Shield className="w-8 h-8 text-blue-400 mb-2" />
                  <h3 className="font-semibold text-white mb-1">Secure</h3>
                  <p className="text-sm text-slate-400">Blockchain-secured transactions</p>
                </div>
                <div className="p-4 bg-slate-800/30 backdrop-blur-md border border-slate-700/30 rounded-xl">
                  <Zap className="w-8 h-8 text-yellow-400 mb-2" />
                  <h3 className="font-semibold text-white mb-1">Zero Fees</h3>
                  <p className="text-sm text-slate-400">No gas fees on transactions</p>
                </div>
                <div className="p-4 bg-slate-800/30 backdrop-blur-md border border-slate-700/30 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-emerald-400 mb-2" />
                  <h3 className="font-semibold text-white mb-1">Instant</h3>
                  <p className="text-sm text-slate-400">Immediate token delivery</p>
                </div>
              </div>
            </div>

            {/* Wallet Info */}
            <div className="space-y-6">
              {/* Balance Card */}
              <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-md border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-emerald-400" />
                    Your BRX Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    {walletBalance.toLocaleString()} BRX
                  </div>
                  <div className="text-slate-300">
                    ≈ ${walletBalance.toLocaleString()} USD
                  </div>
                </CardContent>
              </Card>

              {/* Transaction History */}
              <Card className="bg-slate-800/50 backdrop-blur-md border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {transactionHistory.length > 0 ? (
                    <div className="space-y-3">
                      {transactionHistory.slice(0, 5).map((tx, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                          <div>
                            <div className="text-white font-medium">
                              {tx.type === 'purchase' ? 'Purchased' : tx.type === 'investment' ? 'Invested' : 'Withdrawal'}
                            </div>
                            <div className="text-sm text-slate-400">
                              {new Date(tx.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-semibold ${
                              tx.type === 'purchase' ? 'text-emerald-400' : 
                              tx.type === 'investment' ? 'text-blue-400' : 'text-orange-400'
                            }`}>
                              {tx.type === 'purchase' ? '+' : '-'}{tx.amount} BRX
                            </div>
                            {tx.property && (
                              <div className="text-sm text-slate-400">{tx.property}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-slate-400">
                      No transactions yet
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="bg-slate-800/50 backdrop-blur-md border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white text-lg">How it Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-emerald-500/20 text-emerald-300">1</Badge>
                    <span>Connect your crypto wallet</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-emerald-500/20 text-emerald-300">2</Badge>
                    <span>Choose how much BRX to buy</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-emerald-500/20 text-emerald-300">3</Badge>
                    <span>Tokens are instantly added to your wallet</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-emerald-500/20 text-emerald-300">4</Badge>
                    <span>Use BRX to invest in properties</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BuyBRX;
