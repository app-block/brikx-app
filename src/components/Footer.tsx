
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-white py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base">
                R
              </div>
              <span className="ml-2 text-lg sm:text-xl font-bold">RealEstateX</span>
              <Badge variant="secondary" className="ml-2 bg-green-900/50 text-green-300 text-xs border-green-500/30">
                Beta
              </Badge>
            </div>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Democratizing real estate investment through blockchain technology and fractional ownership.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-slate-200">Platform</h3>
            <ul className="space-y-2 text-slate-400 text-sm sm:text-base">
              <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">DAO Governance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-slate-200">Resources</h3>
            <ul className="space-y-2 text-slate-400 text-sm sm:text-base">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Audit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Legal Framework</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-slate-200">Community</h3>
            <ul className="space-y-2 text-slate-400 text-sm sm:text-base">
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Telegram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Medium</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-xs sm:text-sm">
            © 2024 RealEstateX. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Risk Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
