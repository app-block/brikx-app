
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

const NavigationLogo = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex-shrink-0 flex items-center cursor-pointer group"
      onClick={() => navigate('/')}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Main logo */}
        <div className="relative w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
          <span className="drop-shadow-sm">B</span>
        </div>
      </div>
      
      <div className="ml-3 flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-cyan-300 transition-all duration-300">
            BrikX
          </span>
          <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
        </div>
        <Badge variant="secondary" className="bg-gradient-to-r from-emerald-900/80 to-cyan-900/80 text-emerald-300 text-xs w-fit border border-emerald-500/40 font-medium shadow-lg backdrop-blur-sm">
          Enterprise
        </Badge>
      </div>
    </div>
  );
};

export default NavigationLogo;
