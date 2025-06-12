
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewCardsProps {
  totalInvested: number;
  currentValue: number;
  totalReturn: number;
  totalMonthlyIncome: number;
}

const OverviewCards = ({ totalInvested, currentValue, totalReturn, totalMonthlyIncome }: OverviewCardsProps) => {
  return (
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
  );
};

export default OverviewCards;
