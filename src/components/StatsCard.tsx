
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
}

const StatsCard = ({ label, value, change }: StatsCardProps) => {
  const isPositive = change.startsWith('+');
  
  return (
    <Card className="bg-slate-800/50 hover:bg-slate-700/50 hover:shadow-2xl transition-all duration-300 border border-slate-700/50 hover:border-blue-500/50 group backdrop-blur-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="text-xs sm:text-sm font-semibold text-slate-400 mb-2 sm:mb-3 uppercase tracking-wide">{label}</div>
        <div className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3 sm:mb-4 group-hover:text-blue-400 transition-colors">{value}</div>
        <div className={`flex items-center gap-2 text-sm font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{change}</span>
          <span className="text-slate-500 font-normal text-xs sm:text-sm">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
