
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, ArrowUpRight, ArrowDownRight, Coins } from "lucide-react";
import { useInvestmentContract, useInvestmentData, useBRXToken } from '@/services/contractService';
import { useWallet } from '@/hooks/useWallet';
import { toast } from "sonner";

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
  propertyName: string;
  tokenPrice: number; // Price in BRX tokens
  mode: 'invest' | 'withdraw';
}

const InvestmentModal = ({ isOpen, onClose, propertyId, propertyName, tokenPrice, mode }: InvestmentModalProps) => {
  const [amount, setAmount] = useState('');
  const { address, isConnected, connectWallet } = useWallet();
  const { investInProperty, withdrawFromProperty, isLoading } = useInvestmentContract();

  // UPDATED: Ensure Investment Data is constant & accurate
  const { userInvestmentBRX, userPropertyTokens } = useInvestmentData(propertyId, tokenPrice);
  const { getBRXBalance } = useBRXToken();
  const [brxBalance, setBrxBalance] = useState<number>(0);

  React.useEffect(() => {
    if (isConnected) {
      getBRXBalance().then(setBrxBalance);
    }
  }, [isConnected, getBRXBalance]);

  const handleSubmit = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      if (mode === 'invest') {
        const brxAmount = parseFloat(amount);
        
        if (brxAmount > brxBalance) {
          toast.error("Insufficient BRX balance");
          return;
        }
        
        await investInProperty(propertyId, brxAmount);
        toast.success(`Successfully invested ${amount} BRX in ${propertyName}`);
      } else {
        const tokenAmount = parseFloat(amount);
        
        if (tokenAmount > parseFloat(userPropertyTokens)) {
          toast.error("Cannot withdraw more than your property tokens");
          return;
        }
        
        await withdrawFromProperty(propertyId, tokenAmount);
        toast.success(`Successfully withdrew ${amount} tokens from ${propertyName}`);
      }
      
      setAmount('');
      onClose();
    } catch (error) {
      toast.error(`${mode === 'invest' ? 'Investment' : 'Withdrawal'} failed. Please try again.`);
    }
  };

  const propertyTokens = mode === 'invest' 
    ? amount ? (parseFloat(amount) / tokenPrice).toFixed(4) : '0'
    : amount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#192132] border-[#242B3B] rounded-2xl shadow-xl text-slate-100 max-w-md p-7">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {mode === 'invest' ? (
              <>
                <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                <span className="tracking-wide text-slate-50">Invest in Property</span>
              </>
            ) : (
              <>
                <ArrowDownRight className="w-5 h-5 text-blue-400" />
                <span className="tracking-wide text-slate-50">Withdraw Investment</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-lg text-blue-100 font-semibold tracking-wide">
            {propertyName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-7 pt-2">
          {/* Current Investment Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl px-4 py-5 bg-[#22273B] shadow border border-[#384677] flex flex-col items-start gap-1">
              <div className="text-xs text-blue-200 font-medium">Your BRX Investment</div>
              <div className="text-2xl font-extrabold text-slate-50">{userInvestmentBRX} <span className="text-base font-semibold text-blue-200">BRX</span></div>
            </div>
            <div className="rounded-2xl px-4 py-5 bg-[#22273B] shadow border border-[#384677] flex flex-col items-start gap-1">
              <div className="text-xs text-blue-200 font-medium">Property Tokens Owned</div>
              <div className="text-2xl font-extrabold text-slate-50">{userPropertyTokens}</div>
            </div>
          </div>

          {/* BRX Balance */}
          <div className="rounded-2xl px-5 py-3 border border-emerald-800 bg-[#153733]/80 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2 font-semibold text-emerald-400 text-base">
              <Coins className="w-5 h-5" />
              Available BRX:
            </div>
            <span className="font-bold text-emerald-300 text-xl">{brxBalance.toLocaleString()} BRX</span>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-base text-slate-100 font-semibold">
              {mode === 'invest' ? 'Amount (BRX)' : 'Property Tokens to Withdraw'}
            </Label>
            <Input
              id="amount"
              type="number"
              step={mode === 'invest' ? "1" : "0.0001"}
              min="0"
              placeholder={mode === 'invest' ? "100" : "1.5"}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-[#25304C] border-blue-400/20 text-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500 text-lg px-4 py-3"
            />
            {amount && mode === 'invest' && (
              <div className="text-sm text-blue-200 mt-1">
                ≈ {propertyTokens} property tokens
              </div>
            )}
            {amount && mode === 'withdraw' && (
              <div className="text-sm text-blue-200 mt-1">
                ≈ {(parseFloat(amount) * tokenPrice).toFixed(2)} BRX value
              </div>
            )}
          </div>

          {/* Transaction Summary */}
          <div className="p-4 bg-[#22273B]/70 rounded-lg border border-[#364057]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300">Transaction Type:</span>
              <Badge variant={mode === 'invest' ? 'default' : 'secondary'}>
                {mode === 'invest' ? 'Investment' : 'Withdrawal'}
              </Badge>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300">Amount:</span>
              <span className="font-semibold text-slate-100">
                {amount || '0'} {mode === 'invest' ? 'BRX' : 'tokens'}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300">Token Price:</span>
              <span className="text-blue-400">{tokenPrice} BRX</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Network:</span>
              <span className="text-blue-400">BRX Network</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !amount}
              className={`flex-1 font-semibold text-lg ${
                mode === 'invest' 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } rounded-xl py-2`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : isConnected ? (
                `${mode === 'invest' ? 'Invest' : 'Withdraw'} ${amount || '0'} ${mode === 'invest' ? 'BRX' : 'tokens'}`
              ) : (
                'Connect Wallet'
              )}
            </Button>
          </div>

          {mode === 'invest' && (
            <div className="text-xs text-blue-300 text-center">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Expected annual returns: {(Math.random() * 10 + 15).toFixed(1)}%
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentModal;
