import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from "./providers/Web3Provider";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import InvestmentDashboard from "./pages/InvestmentDashboard";
import PropertyDetails from "./pages/PropertyDetails";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import BuyBRX from "./pages/BuyBRX";
import NotFound from "./pages/NotFound";
import ConnectWalletIcon from "./components/ConnectWalletIcon";

const App = () => (
  <Web3Provider>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ConnectWalletIcon /> {/* <-- Floating wallet icon always visible when not connected */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/dashboard" element={<InvestmentDashboard />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/buy-brx" element={<BuyBRX />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </Web3Provider>
);

export default App;
