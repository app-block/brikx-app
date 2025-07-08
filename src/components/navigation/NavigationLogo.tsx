
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

const NavigationLogo = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex-shrink-0 flex items-center cursor-pointer group"
      onClick={() => navigate('/')}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
          PRYPCO
        </span>
        <span className="text-xl sm:text-2xl font-bold text-primary group-hover:text-foreground transition-colors duration-200">
          MINT
        </span>
      </div>
    </div>
  );
};

export default NavigationLogo;
