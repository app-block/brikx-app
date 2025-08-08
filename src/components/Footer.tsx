import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Twitter, Linkedin, Mail, Globe, Shield, TrendingUp } from "lucide-react";
const Footer = () => {
  return <footer className="bg-background border-t border-border/40 shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-elegant">
                B
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-foreground tracking-tight">BrikX</span>
                <Badge variant="secondary" className="bg-accent/20 text-accent-foreground text-xs w-fit border-accent/30 mt-1">
                  Enterprise
                </Badge>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Democratizing real estate investment through blockchain technology. 
              Secure, transparent, and accessible global property investments.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl h-10 w-10 transition-all duration-300 hover:scale-110">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl h-10 w-10 transition-all duration-300 hover:scale-110">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl h-10 w-10 transition-all duration-300 hover:scale-110">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-6">
            <h3 className="text-foreground font-semibold text-lg tracking-tight">Platform</h3>
            <div className="space-y-4">
              {['Marketplace', 'Dashboard', 'Analytics', 'Portfolio'].map(item => <Button key={item} variant="ghost" className="w-full justify-start text-muted-foreground hover:text-accent hover:bg-accent/10 p-3 h-auto font-medium rounded-xl transition-all duration-300">
                  {item}
                </Button>)}
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-foreground font-semibold text-lg tracking-tight">Resources</h3>
            <div className="space-y-4">
              {['Documentation', 'API Reference', 'Help Center', 'Community'].map(item => <Button key={item} variant="ghost" className="w-full justify-start text-muted-foreground hover:text-accent hover:bg-accent/10 p-3 h-auto font-medium rounded-xl transition-all duration-300">
                  {item}
                </Button>)}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-foreground font-semibold text-lg tracking-tight">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-muted-foreground group hover:text-accent transition-colors duration-300">
                <Mail className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">support@brikx.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground group hover:text-accent transition-colors duration-300">
                <Globe className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">brix-app.lovable.app</span>
              </div>
            </div>
            
            {/* Security Badges */}
            <div className="space-y-3 pt-6 border-t border-border/30">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground group hover:text-accent transition-colors duration-300">
                <Shield className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">SEC Compliant</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground group hover:text-accent transition-colors duration-300">
                <TrendingUp className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Licensed Platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <p className="text-muted-foreground text-sm font-medium">© 2025 BrikX. All rights reserved. | Built with blockchain technology</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <Button variant="ghost" className="text-muted-foreground hover:text-accent p-0 h-auto font-medium transition-colors duration-300">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-accent p-0 h-auto font-medium transition-colors duration-300">
                Terms of Service
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-accent p-0 h-auto font-medium transition-colors duration-300">
                Cookie Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;