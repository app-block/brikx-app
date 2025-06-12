
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Investment {
  id: number;
  name: string;
  tokens: number;
  totalValue: number;
  currentValue: number;
  apy: number;
  monthlyIncome: number;
  change: number;
  tokenPrice: number;
}

interface InvestmentHoldingsProps {
  investments: Investment[];
  onBuyMore: (investment: Investment) => void;
  onSell: (investment: Investment) => void;
}

const InvestmentHoldings = ({ investments, onBuyMore, onSell }: InvestmentHoldingsProps) => {
  return (
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
                  onClick={() => onBuyMore(investment)}
                >
                  Buy More
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-blue-600 text-blue-400 hover:bg-blue-950"
                  onClick={() => onSell(investment)}
                >
                  Withdraw
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentHoldings;
