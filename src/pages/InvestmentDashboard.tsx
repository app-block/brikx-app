
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const InvestmentDashboard = () => {
  const [investments] = useState([
    {
      id: 1,
      name: "Dubai Marina Resort",
      tokens: 50,
      totalValue: 425000,
      currentValue: 467500,
      apy: 22.5,
      monthlyIncome: 1875,
      change: 10.0
    },
    {
      id: 2,
      name: "Bangalore Tech Hub",
      tokens: 25,
      totalValue: 300000,
      currentValue: 315000,
      apy: 18.8,
      monthlyIncome: 1250,
      change: 5.0
    }
  ]);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.totalValue, 0);
  const currentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalReturn = currentValue - totalInvested;
  const totalMonthlyIncome = investments.reduce((sum, inv) => sum + inv.monthlyIncome, 0);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-4">Investment Dashboard</h1>
          <p className="text-slate-300">Track your real estate portfolio performance</p>
        </div>

        {/* Overview Cards */}
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

        {/* Investment Holdings */}
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
                    <Button variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-950">
                      Buy More
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-950">
                      Sell
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default InvestmentDashboard;
