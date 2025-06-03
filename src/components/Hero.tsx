
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, CircleCheck } from "lucide-react";

interface HeroProps {
  connectedWallet: boolean;
  setConnectedWallet: (connected: boolean) => void;
}

const Hero = ({ connectedWallet, setConnectedWallet }: HeroProps) => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 px-4 py-2">
          🏠 Tokenizing Real Estate Globally
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Fractional Ownership
          </span>
          <br />
          <span className="text-gray-900">
            Powered by Blockchain
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          Invest in tokenized real estate from emerging markets. Own fractions of vacation homes, 
          commercial properties, and farmlands. Earn passive income through AI-optimized revenue sharing.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
            onClick={() => !connectedWallet && setConnectedWallet(true)}
          >
            {connectedWallet ? "Explore Properties" : "Start Investing"}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-gray-300 hover:border-blue-500 px-8 py-4 text-lg"
          >
            View Demo
          </Button>
        </div>
        
        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
              <CircleCheck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Properties</h3>
            <p className="text-gray-600">All properties undergo rigorous verification and legal compliance checks</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
              <ArrowUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">High Returns</h3>
            <p className="text-gray-600">Average 15-20% APY from rental income and property appreciation</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
              <div className="w-8 h-8 text-white font-bold">DAO</div>
            </div>
            <h3 className="text-xl font-semibold mb-2">DAO Governance</h3>
            <p className="text-gray-600">Vote on property decisions and platform improvements as a token holder</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
