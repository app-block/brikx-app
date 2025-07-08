
import { Link, useLocation } from 'react-router-dom';

const NavigationMenu = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) => `
    relative text-sm font-medium transition-all duration-200 hover:text-foreground px-3 py-2 rounded-lg
    ${isActive(path) 
      ? 'text-foreground bg-primary/20 border border-primary/50' 
      : 'text-muted-foreground hover:bg-secondary'
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
      {/* "Get started" as a separate button - PRYPCO style */}
      <Link to="/auth" className="ml-2">
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-2 rounded-full shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all">
          Get started
        </button>
      </Link>
    </div>
  );
};

export default NavigationMenu;
