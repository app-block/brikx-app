
import { Link, useLocation } from 'react-router-dom';

const NavigationMenu = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const linkClass = (path: string) => `
    relative text-sm font-medium transition-all duration-300 hover:text-white group px-3 py-2 rounded-lg
    ${isActive(path) 
      ? 'text-white bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30' 
      : 'text-slate-300 hover:bg-slate-700/40'
    }
  `;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/marketplace', label: 'Marketplace' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/buy-brx', label: 'Buy BRX' },
    { path: '/analytics', label: 'Analytics' }
  ];

  return (
    <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
      {navItems.map((item) => (
        <Link 
          key={item.path}
          to={item.path} 
          className={linkClass(item.path)}
        >
          <span className="relative z-10">{item.label}</span>
          
          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Active indicator */}
          {isActive(item.path) && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/50"></div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default NavigationMenu;
