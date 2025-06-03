
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, Globe, Coins, BarChart3, Users } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Institutional Security",
      description: "Multi-signature smart contracts with bank-grade custody solutions and comprehensive insurance coverage for maximum asset protection.",
      color: "from-emerald-500 to-green-600",
      stats: "99.9% Uptime"
    },
    {
      icon: BarChart3,
      title: "AI Market Analytics",
      description: "Advanced machine learning algorithms provide real-time property valuations, market predictions, and investment insights.",
      color: "from-blue-500 to-cyan-600",
      stats: "85% Accuracy"
    },
    {
      icon: Globe,
      title: "Global Marketplace",
      description: "Access premium properties across 25+ countries with instant trading, cross-border payments, and regulatory compliance.",
      color: "from-purple-500 to-pink-600",
      stats: "25+ Countries"
    },
    {
      icon: Coins,
      title: "Automated Revenue",
      description: "Smart contracts automatically distribute rental income, dividends, and appreciation gains in stablecoins to your wallet.",
      color: "from-orange-500 to-red-500",
      stats: "Monthly Payouts"
    },
    {
      icon: Users,
      title: "DAO Governance",
      description: "Participate in property management decisions, platform upgrades, and investment strategies through decentralized voting.",
      color: "from-indigo-500 to-purple-600",
      stats: "150K+ Voters"
    },
    {
      icon: TrendingUp,
      title: "DeFi Integration",
      description: "Use property tokens as collateral for loans, participate in liquidity pools, and access advanced DeFi strategies.",
      color: "from-teal-500 to-blue-600",
      stats: "18% Average APY"
    }
  ];

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent mb-6">
          Enterprise-Grade Infrastructure
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
          Built on cutting-edge blockchain technology with institutional-grade security, 
          AI-powered analytics, and seamless user experience for professional investors.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="bg-white hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 group hover:-translate-y-1">
            <CardHeader className="text-center pb-4">
              <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-xl`}>
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </CardTitle>
              <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mx-auto">
                {feature.stats}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-center leading-relaxed font-medium">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enterprise CTA */}
      <div className="mt-20 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready for Enterprise?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join leading institutions and family offices in revolutionizing real estate investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Schedule Demo
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
