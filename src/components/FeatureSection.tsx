
import { Card, CardContent } from "@/components/ui/card";
import { Shield, TrendingUp, Globe, Zap, Users, BarChart3 } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-400" />,
      title: "Blockchain Security",
      description: "Your investments are secured by cutting-edge blockchain technology with smart contracts ensuring transparency and trust.",
      gradient: "from-blue-500/10 to-cyan-500/10",
      border: "border-blue-500/20"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
      title: "High Returns",
      description: "Earn up to 25% APY through rental income and property appreciation across our carefully selected portfolio.",
      gradient: "from-emerald-500/10 to-green-500/10",
      border: "border-emerald-500/20"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-400" />,
      title: "Global Portfolio",
      description: "Access premium real estate markets worldwide, from Dubai's luxury towers to Bangalore's tech hubs.",
      gradient: "from-purple-500/10 to-pink-500/10",
      border: "border-purple-500/20"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Zero Gas Fees",
      description: "Trade BRX tokens without worrying about gas fees. Our optimized system ensures cost-effective transactions.",
      gradient: "from-yellow-500/10 to-orange-500/10",
      border: "border-yellow-500/20"
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-400" />,
      title: "Fractional Ownership",
      description: "Start investing with as little as 1 BRX token. No need for millions to own premium real estate.",
      gradient: "from-indigo-500/10 to-blue-500/10",
      border: "border-indigo-500/20"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-rose-400" />,
      title: "Real-time Analytics",
      description: "Track your portfolio performance with detailed analytics and insights to make informed investment decisions.",
      gradient: "from-rose-500/10 to-red-500/10",
      border: "border-rose-500/20"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6">
            Why Choose BRX Platform
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Revolutionary Features for
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Modern Investors
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience the future of real estate investment with our innovative platform designed for the digital age.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`group bg-gradient-to-br ${feature.gradient} backdrop-blur-md border ${feature.border} hover:border-opacity-50 transition-all duration-500 hover:shadow-2xl hover:shadow-current/10 transform hover:-translate-y-2`}
            >
              <CardContent className="p-8">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "$50M+", label: "Total Value Locked" },
            { value: "25%", label: "Average APY" },
            { value: "10K+", label: "Active Investors" },
            { value: "50+", label: "Properties Listed" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
