
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useInvestmentContract, useInvestmentData } from '@/services/contractService';
import { useWallet } from '@/hooks/useWallet';
import { toast } from "sonner";

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
  propertyName: string;
  tokenPrice: number;
  mode: 'invest' | 'withdraw';
}

const InvestmentModal = ({ isOpen, onClose, propertyId, propertyName, tokenPrice, mode }: InvestmentModalProps) => {
  const [amount, setAmount] = useState('');
  const { address, isConnected, connectWallet } = useWallet();
  const { investInProperty, withdrawFromProperty, isLoading } = useInvestmentContract();
  const { userInvestment, totalPoolValue } = useInvestmentData(propertyId);

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
        await investInProperty(propertyId, amount);
        toast.success(`Successfully invested ${amount} ETH in ${propertyName}`);
      } else {
        if (parseFloat(amount) > parseFloat(userInvestment)) {
          toast.error("Cannot withdraw more than your investment");
          return;
        }
        await withdrawFromProperty(propertyId, amount);
        toast.success(`Successfully withdrew ${amount} ETH from ${propertyName}`);
      }
      
      setAmount('');
      onClose();
    } catch (error) {
      toast.error(`${mode === 'invest' ? 'Investment' : 'Withdrawal'} failed. Please try again.`);
    }
  };

  const tokens = amount ? (parseFloat(amount) / (tokenPrice / 1000)).toFixed(2) : '0';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {mode === 'invest' ? (
              <>
                <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                Invest in Property
              </>
            ) : (
              <>
                <ArrowDownRight className="w-5 h-5 text-blue-400" />
                Withdraw Investment
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {propertyName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Current Investment Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="text-xs text-slate-400 mb-1">Your Investment</div>
              <div className="text-lg font-bold text-slate-100">{userInvestment} ETH</div>
            </div>
            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="text-xs text-slate-400 mb-1">Total Pool</div>
              <div className="text-lg font-bold text-slate-100">{totalPoolValue} ETH</div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-slate-200">
              Amount (ETH)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.001"
              min="0"
              placeholder="0.1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-slate-700 border-slate-600 text-slate-100"
            />
            {amount && (
              <div className="text-sm text-slate-400">
                ≈ {tokens} tokens
              </div>
            )}
          </div>

          {/* Transaction Summary */}
          <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/40">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300">Transaction Type:</span>
              <Badge variant={mode === 'invest' ? 'default' : 'secondary'}>
                {mode === 'invest' ? 'Investment' : 'Withdrawal'}
              </Badge>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300">Amount:</span>
              <span className="font-semibold text-slate-100">{amount || '0'} ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Network:</span>
              <span className="text-blue-400">Ethereum</span>
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
              className={`flex-1 font-semibold ${
                mode === 'invest' 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : isConnected ? (
                `${mode === 'invest' ? 'Invest' : 'Withdraw'} ${amount || '0'} ETH`
              ) : (
                'Connect Wallet'
              )}
            </Button>
          </div>

          {mode === 'invest' && (
            <div className="text-xs text-slate-500 text-center">
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
