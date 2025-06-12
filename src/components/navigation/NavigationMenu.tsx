
import { Link, useLocation } from 'react-router-dom';

const NavigationMenu = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const linkClass = (path: string) => `
    text-sm font-medium transition-colors hover:text-slate-100 
    ${isActive(path) ? 'text-slate-100' : 'text-slate-300'}
  `;

  return (
    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
      <Link to="/" className={linkClass('/')}>
        Home
      </Link>
      <Link to="/marketplace" className={linkClass('/marketplace')}>
        Marketplace
      </Link>
      <Link to="/dashboard" className={linkClass('/dashboard')}>
        Dashboard
      </Link>
      <Link to="/buy-brx" className={linkClass('/buy-brx')}>
        Buy BRX
      </Link>
      <Link to="/analytics" className={linkClass('/analytics')}>
        Analytics
      </Link>
    </div>
  );
};

export default NavigationMenu;
