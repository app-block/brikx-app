import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
const NavigationLogo = () => {
  const navigate = useNavigate();
  return <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => navigate('/')}>
      <div className="relative">
        {/* Main logo */}
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md transition-all duration-200 group-hover:scale-105 bg-[#121313]/0">
          <span>B</span>
        </div>
      </div>
      
      <div className="ml-3 flex flex-col">
        
        <Badge variant="secondary" className="bg-slate-800 text-emerald-400 text-xs w-fit border border-slate-700 font-medium">
          Enterprise
        </Badge>
      </div>
    </div>;
};
export default NavigationLogo;