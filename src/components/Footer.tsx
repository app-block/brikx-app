import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Twitter, Linkedin, Mail, Globe, Shield, TrendingUp } from "lucide-react";
const Footer = () => {
  return <footer className="bg-slate-900 border-t border-slate-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                B
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-blue-400">BrikX</span>
                <Badge variant="secondary" className="bg-emerald-900/60 text-emerald-300 text-xs w-fit border-emerald-500/40">
                  Enterprise
                </Badge>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Democratizing real estate investment through blockchain technology. 
              Secure, transparent, and accessible global property investments.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 rounded-xl">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 rounded-xl">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 rounded-xl">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h3 className="text-slate-100 font-semibold text-lg">Platform</h3>
            <div className="space-y-3">
              {['Marketplace', 'Dashboard', 'Analytics', 'Portfolio'].map(item => <Button key={item} variant="ghost" className="w-full justify-start text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 p-2 h-auto font-medium">
                  {item}
                </Button>)}
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-slate-100 font-semibold text-lg">Resources</h3>
            <div className="space-y-3">
              {['Documentation', 'API Reference', 'Help Center', 'Community'].map(item => <Button key={item} variant="ghost" className="w-full justify-start text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 p-2 h-auto font-medium">
                  {item}
                </Button>)}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-slate-100 font-semibold text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-400">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">support@brikx.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Globe className="h-4 w-4 text-blue-400" />
                <span className="text-sm">www.brikx.com</span>
              </div>
            </div>
            
            {/* Security Badges */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>SEC Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                <span>Licensed Platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/60 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm">© 2025 BrikX. All rights reserved. | Built with blockchain technology</p>
            <div className="flex space-x-6 text-sm">
              <Button variant="ghost" className="text-slate-500 hover:text-blue-400 p-0 h-auto font-medium">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="text-slate-500 hover:text-blue-400 p-0 h-auto font-medium">
                Terms of Service
              </Button>
              <Button variant="ghost" className="text-slate-500 hover:text-blue-400 p-0 h-auto font-medium">
                Cookie Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;