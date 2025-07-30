import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from '@/components/Navigation';
import { TrendingUp, TrendingDown, DollarSign, Users, Building, BarChart3 } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Bar } from "recharts";
import { properties } from "@/data/properties";

const Analytics = () => {
  // Mock data for analytics
  const metrics = [
    {
      title: "Total Investment",
      value: "$2,847,392",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Properties",
      value: "47",
      change: "+3",
      trend: "up",
      icon: Building,
    },
    {
      title: "Total Investors",
      value: "1,284",
      change: "+8.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Average ROI",
      value: "18.7%",
      change: "-2.1%",
      trend: "down",
      icon: BarChart3,
    },
  ];

  const topProperties = [
    { name: "Manhattan Luxury Condo", roi: "24.5%", investment: "$485,920" },
    { name: "Brooklyn Heights Townhouse", roi: "21.8%", investment: "$298,740" },
    { name: "Queens Commercial Space", roi: "19.3%", investment: "$367,550" },
    { name: "Bronx Multi-Family", roi: "17.9%", investment: "$198,630" },
  ];

  // Create investment performance data from sample properties
  const investmentPerformance = useMemo(() => {
    // Simulate a time-based monthly return performance for the top few properties
    // Real app: replace with fetched/historical data
    return [
      { month: "Jan", roi: 6 },
      { month: "Feb", roi: 9 },
      { month: "Mar", roi: 12 },
      { month: "Apr", roi: 14 },
      { month: "May", roi: 18 },
      { month: "Jun", roi: 23 },
      { month: "Jul", roi: 24 },
      { month: "Aug", roi: 31 },
      { month: "Sep", roi: 35 },
      { month: "Oct", roi: 38 },
      { month: "Nov", roi: 44 },
      { month: "Dec", roi: 49 },
    ];
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text luxury-heading mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground premium-text">Track your real estate investment performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.title} className="glass-card border border-primary/20 premium-glow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-slate-100">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-emerald-400 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                      )}
                      <span className={`text-sm ${
                        metric.trend === "up" ? "text-emerald-400" : "text-red-400"
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <metric.icon className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Real investment chart with recharts */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Investment Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={investmentPerformance}
                  margin={{ top: 16, right: 32, left: 0, bottom: 0 }}
                  barSize={36}
                >
                  <XAxis
                    dataKey="month"
                    stroke="#a3a3a3"
                    axisLine={false}
                    tickLine={false}
                    className="text-xs font-semibold"
                  />
                  <YAxis
                    tickFormatter={v => `${v}%`}
                    className="text-xs font-semibold"
                    stroke="#a3a3a3"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip contentStyle={{ backgroundColor: "#22223", borderRadius: 8, color: "#f1f1f1" }} />
                  <Legend />
                  <Bar dataKey="roi" fill="#34d399" radius={[8, 8, 0, 0]} name="ROI (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Performing Properties */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Top Performing Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProperties.map((property, index) => (
                <div key={property.name} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-slate-100 font-medium">{property.name}</p>
                      <p className="text-slate-400 text-sm">{property.investment}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-900/60 text-emerald-300">
                    {property.roi} ROI
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-slate-100">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New investment", property: "Manhattan Luxury Condo", amount: "$5,000", time: "2 hours ago" },
                { action: "Dividend received", property: "Brooklyn Heights Townhouse", amount: "$1,250", time: "1 day ago" },
                { action: "Property valuation updated", property: "Queens Commercial Space", amount: "+$15,000", time: "2 days ago" },
                { action: "New investment", property: "Bronx Multi-Family", amount: "$3,500", time: "3 days ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-b border-slate-700/50 last:border-b-0">
                  <div>
                    <p className="text-slate-100 font-medium">{activity.action}</p>
                    <p className="text-slate-400 text-sm">{activity.property}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-100 font-medium">{activity.amount}</p>
                    <p className="text-slate-400 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
