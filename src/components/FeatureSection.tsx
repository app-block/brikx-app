
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, ArrowUp, CirclePlus, Download } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: CircleCheck,
      title: "Smart Contract Security",
      description: "OpenZeppelin-standard contracts with multi-signature security and automated revenue distribution.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: ArrowUp,
      title: "AI-Powered Valuations",
      description: "Machine learning algorithms provide real-time property valuations based on market data and trends.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: CirclePlus,
      title: "Global Marketplace",
      description: "Trade property tokens instantly with our decentralized exchange supporting multiple cryptocurrencies.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Download,
      title: "Passive Income Streams",
      description: "Earn from rental income, Airbnb revenue, and property appreciation automatically distributed in stablecoins.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Revolutionary Features
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience the future of real estate investment with cutting-edge blockchain technology 
          and AI-powered analytics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-0 group">
            <CardHeader className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-center">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
