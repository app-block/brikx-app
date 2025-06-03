
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
    <Card className="bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
      <CardContent className="p-8">
        <div className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">{label}</div>
        <div className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{value}</div>
        <div className={`flex items-center gap-2 text-sm font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{change}</span>
          <span className="text-gray-500 font-normal">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
