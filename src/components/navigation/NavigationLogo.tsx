
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

const NavigationLogo = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex-shrink-0 flex items-center cursor-pointer group"
      onClick={() => navigate('/')}
    >
      <div className="w-9 h-9 sm:w-11 sm:h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg group-hover:bg-blue-700 transition-all duration-300 group-hover:scale-105">
        B
      </div>
      <div className="ml-3 flex flex-col">
        <span className="text-xl sm:text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
          BrikX
        </span>
        <Badge variant="secondary" className="bg-emerald-900/60 text-emerald-300 text-xs w-fit border-emerald-500/40 font-medium">
          Enterprise
        </Badge>
      </div>
    </div>
  );
};

export default NavigationLogo;
