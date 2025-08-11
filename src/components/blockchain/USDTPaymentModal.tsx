import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, DollarSign, Coins, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { useUSDTContract, useUSDTToBRXExchange, useBRXContract } from '@/services/blockchainService';
import { useWallet } from '@/hooks/useWallet';
import { useAccount, useChainId } from 'wagmi';
import { toast } from "sonner";

interface USDTPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (txHash: string, brxAmount: number) => void;
}

const USDTPaymentModal = ({ isOpen, onClose, onSuccess }: USDTPaymentModalProps) => {
  const [usdtAmount, setUsdtAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'input' | 'approval' | 'exchange' | 'success'>('input');
  const [txHash, setTxHash] = useState('');
  
  const { address, isConnected, connectWallet } = useWallet();
  const chainId = useChainId();
  const { usdtBalance, usdtAllowance } = useUSDTContract(chainId);
  const { brxBalance } = useBRXContract();
  const { exchangeUSDTForBRX, exchangeRate } = useUSDTToBRXExchange();

  const usdtAmountNum = parseFloat(usdtAmount) || 0;
  const brxAmountExpected = usdtAmountNum * exchangeRate;
  const needsApproval = parseFloat(usdtAllowance) < usdtAmountNum;

  const handlePayment = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    if (!usdtAmount || usdtAmountNum <= 0) {
      toast.error("Please enter a valid USDT amount");
      return;
    }

    if (usdtAmountNum > parseFloat(usdtBalance)) {
      toast.error("Insufficient USDT balance");
      return;
    }

    setIsProcessing(true);
    setCurrentStep(needsApproval ? 'approval' : 'exchange');

    try {
      const result = await exchangeUSDTForBRX(usdtAmountNum);
      
      if (result.success) {
        setTxHash(result.txHash);
        setCurrentStep('success');
        toast.success(`Successfully exchanged ${usdtAmount} USDT for ${result.brxAmount} BRX!`);
        onSuccess(result.txHash, result.brxAmount);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error("Payment failed. Please try again.");
      setCurrentStep('input');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setUsdtAmount('');
    setCurrentStep('input');
    setTxHash('');
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 'approval':
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Approving USDT</h3>
              <p className="text-slate-400">Please approve USDT spending in your wallet</p>
            </div>
          </div>
        );
      
      case 'exchange':
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Processing Exchange</h3>
              <p className="text-slate-400">Converting USDT to BRX tokens...</p>
            </div>
          </div>
        );
      
      case 'success':
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Payment Successful!</h3>
              <p className="text-slate-400">Your BRX tokens have been credited to your wallet</p>
              {txHash && (
                <a 
                  href={`https://etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                >
                  View on Etherscan <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (currentStep !== 'input') {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-[#192132] border-[#242B3B] rounded-2xl shadow-xl text-slate-100 max-w-md">
          <div className="p-6">
            {getStepContent()}
            {currentStep === 'success' && (
              <div className="mt-6">
                <Button onClick={handleClose} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Continue
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#192132] border-[#242B3B] rounded-2xl shadow-xl text-slate-100 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            Pay with USDT
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Purchase BRX tokens using USDT from your connected wallet
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Wallet Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#22273B] rounded-lg p-4 border border-[#384677]">
              <div className="text-xs text-slate-400 mb-1">USDT Balance</div>
              <div className="text-lg font-bold text-slate-100">{parseFloat(usdtBalance).toFixed(2)}</div>
            </div>
            <div className="bg-[#22273B] rounded-lg p-4 border border-[#384677]">
              <div className="text-xs text-slate-400 mb-1">BRX Balance</div>
              <div className="text-lg font-bold text-slate-100">{parseFloat(brxBalance).toFixed(2)}</div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="usdtAmount" className="text-slate-200">
              USDT Amount
            </Label>
            <Input
              id="usdtAmount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="100.00"
              value={usdtAmount}
              onChange={(e) => setUsdtAmount(e.target.value)}
              className="bg-[#25304C] border-blue-400/20 text-slate-100 rounded-xl text-lg px-4 py-3"
            />
            {usdtAmount && (
              <div className="text-sm text-blue-200">
                You will receive: {brxAmountExpected.toFixed(4)} BRX tokens
              </div>
            )}
          </div>

          {/* Exchange Rate */}
          <div className="bg-[#22273B]/70 rounded-lg p-4 border border-[#364057]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300">Exchange Rate:</span>
              <span className="text-emerald-400 font-semibold">1 USDT = {exchangeRate} BRX</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300">Network:</span>
              <Badge variant="secondary">
                {chainId === 1 ? 'Ethereum' : chainId === 56 ? 'BSC' : chainId === 137 ? 'Polygon' : 'Unknown'}
              </Badge>
            </div>
            {needsApproval && (
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Approval Required:</span>
                <Badge variant="outline" className="text-orange-400 border-orange-400">
                  USDT Approval Needed
                </Badge>
              </div>
            )}
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[10, 50, 100, 500].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => setUsdtAmount(amount.toString())}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                ${amount}
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isProcessing || !usdtAmount || usdtAmountNum <= 0 || usdtAmountNum > parseFloat(usdtBalance)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 font-semibold"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : isConnected ? (
                <>
                  <Coins className="w-4 h-4 mr-2" />
                  Pay {usdtAmount || '0'} USDT
                </>
              ) : (
                'Connect Wallet'
              )}
            </Button>
          </div>

          {/* Security Notice */}
          <div className="text-xs text-slate-500 text-center bg-slate-800/50 rounded-lg p-3">
            🔒 Secure blockchain transaction • Gas fees apply • Transactions are irreversible
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default USDTPaymentModal;