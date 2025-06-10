
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Marketplace', path: '/marketplace' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Analytics', path: '/analytics' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden lg:block">
      <div className="flex items-baseline space-x-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`px-4 xl:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-slate-800/60 hover:scale-105 ${
              isActive(item.path) 
                ? 'text-blue-400 bg-slate-800/60 shadow-md' 
                : 'text-slate-300 hover:text-blue-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationMenu;
