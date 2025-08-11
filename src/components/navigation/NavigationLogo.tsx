import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
const NavigationLogo = () => {
  const navigate = useNavigate();
  return <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => navigate('/')}>
      <div className="relative">
        {/* Main logo */}
        <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center transition-all duration-200 group-hover:scale-105">
          <img 
            src="/lovable-uploads/a968891f-dedd-45e9-b66d-8cab198cfaca.png" 
            alt="BrikX Logo" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      <div className="ml-3 flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-xl text-white group-hover:text-blue-300 transition-colors duration-200 sm:text-2xl font-bold">
            BrikX
          </span>
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
        </div>
        <Badge variant="secondary" className="bg-slate-800 text-emerald-400 text-xs w-fit border border-slate-700 font-medium">
          Enterprise
        </Badge>
      </div>
    </div>;
};
export default NavigationLogo;