
import { Link, useLocation } from 'react-router-dom';

const NavigationMenu = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) => `
    relative text-sm font-medium transition-all duration-200 hover:text-white px-3 py-2 rounded-lg
    ${isActive(path) 
      ? 'text-white bg-blue-600 border border-blue-500' 
      : 'text-slate-300 hover:bg-slate-800'
    }
  `;

  // Remove "Buy BRX" from the link list, it'll be a button instead
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/marketplace', label: 'Marketplace' },
    { path: '/dashboard', label: 'Dashboard' },
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
          {/* Active indicator */}
          {isActive(item.path) && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
          )}
        </Link>
      ))}
      {/* "Buy BRX" as a separate button */}
      <Link to="/buy-brx" className="ml-2">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
          Buy BRX
        </button>
      </Link>
    </div>
  );
};

export default NavigationMenu;
