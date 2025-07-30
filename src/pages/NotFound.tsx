import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center glass-card p-8 rounded-2xl border border-primary/20 premium-glow">
        <h1 className="text-4xl font-bold gradient-text luxury-heading mb-4">404</h1>
        <p className="text-xl text-muted-foreground premium-text mb-4">Oops! Page not found</p>
        <a href="/" className="text-primary hover:text-primary/80 underline font-semibold">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
