
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
}

const StatsCard = ({ label, value, change }: StatsCardProps) => {
  const isPositive = change.startsWith('+');
  
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="text-sm font-medium text-gray-600 mb-2">{label}</div>
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <ArrowUp className={`w-4 h-4 ${!isPositive && 'rotate-180'}`} />
          <span>{change}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
