
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, Globe, Coins, BarChart3, Users } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Institutional Security",
      description: "Multi-signature smart contracts with bank-grade custody solutions and comprehensive insurance coverage for maximum asset protection.",
      color: "bg-emerald-600",
      stats: "99.9% Uptime"
    },
    {
      icon: BarChart3,
      title: "AI Market Analytics",
      description: "Advanced machine learning algorithms provide real-time property valuations, market predictions, and investment insights.",
      color: "bg-blue-600",
      stats: "85% Accuracy"
    },
    {
      icon: Globe,
      title: "Global Marketplace",
      description: "Access premium properties across 25+ countries with instant trading, cross-border payments, and regulatory compliance.",
      color: "bg-purple-600",
      stats: "25+ Countries"
    },
    {
      icon: Coins,
      title: "Automated Revenue",
      description: "Smart contracts automatically distribute rental income, dividends, and appreciation gains in stablecoins to your wallet.",
      color: "bg-orange-600",
      stats: "Monthly Payouts"
    },
    {
      icon: Users,
      title: "DAO Governance",
      description: "Participate in property management decisions, platform upgrades, and investment strategies through decentralized voting.",
      color: "bg-indigo-600",
      stats: "150K+ Voters"
    },
    {
      icon: TrendingUp,
      title: "DeFi Integration",
      description: "Use property tokens as collateral for loans, participate in liquidity pools, and access advanced DeFi strategies.",
      color: "bg-teal-600",
      stats: "18% Average APY"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-400 mb-4 sm:mb-6">
          Enterprise-Grade Infrastructure
        </h2>
        <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
          Built on cutting-edge blockchain technology with institutional-grade security, 
          AI-powered analytics, and seamless user experience for professional investors.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="bg-slate-800/50 hover:bg-slate-700/50 hover:shadow-2xl transition-all duration-500 border border-slate-700/50 hover:border-blue-500/50 group hover:-translate-y-1 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 ${feature.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-xl`}>
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </CardTitle>
              <div className="text-xs sm:text-sm font-semibold text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full w-fit mx-auto border border-blue-500/30">
                {feature.stats}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300 text-center leading-relaxed font-medium text-sm sm:text-base">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enterprise CTA */}
      <div className="mt-16 sm:mt-20 text-center">
        <div className="bg-blue-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready for Enterprise?</h3>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Join leading institutions and family offices in revolutionizing real estate investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <button className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base">
              Schedule Demo
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors text-sm sm:text-base">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
