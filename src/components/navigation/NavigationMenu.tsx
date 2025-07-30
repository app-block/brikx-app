
import { Link, useLocation } from 'react-router-dom';

const NavigationMenu = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) => `
    relative text-sm font-medium transition-all duration-300 hover:text-primary px-3 py-2 rounded-lg backdrop-blur-sm
    ${isActive(path) 
      ? 'text-primary-foreground bg-primary/20 border border-primary/40 shadow-lg glow-subtle' 
      : 'text-muted-foreground hover:bg-primary/10 hover:text-foreground hover:border-primary/20 border border-transparent'
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
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full glow-subtle"></div>
          )}
        </Link>
      ))}
      {/* "Buy BRX" as a separate button */}
      <Link to="/buy-brx" className="ml-2">
        <button className="luxury-button bg-gradient-to-r from-primary to-primary-variant text-primary-foreground font-semibold px-5 py-2 rounded-lg shadow-elegant hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:scale-105">
          Buy BRX
        </button>
      </Link>
    </div>
  );
};

export default NavigationMenu;
