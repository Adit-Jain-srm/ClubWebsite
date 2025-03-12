import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Team", path: "/team" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M12 4.5a2.5 2.5 0 0 0-4.96.44 2.5 2.5 0 0 0-1.98 2.44 2.5 2.5 0 0 0-2.12 2.13 2.5 2.5 0 0 0-1.97 2.43 2.5 2.5 0 0 0 1.99 2.43 2.5 2.5 0 0 0 2.12 2.13 2.5 2.5 0 0 0 1.98 2.44 2.5 2.5 0 0 0 4.94.44"/>
              <path d="M12 4.5a2.5 2.5 0 0 1 4.96.44 2.5 2.5 0 0 1 1.98 2.44 2.5 2.5 0 0 1 2.12 2.13 2.5 2.5 0 0 1 1.97 2.43 2.5 2.5 0 0 1-1.99 2.43 2.5 2.5 0 0 1-2.12 2.13 2.5 2.5 0 0 1-1.98 2.44 2.5 2.5 0 0 1-4.94.44"/>
              <path d="M8 11.5h8"/>
              <path d="M10 13a2 2 0 0 1-2 2h-.5"/>
              <path d="M14 13a2 2 0 0 0 2 2h.5"/>
            </svg>
            AI Nexus
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path} 
              className={`text-sm font-medium transition-colors hover:text-primary ${location === link.path ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/join">
            <Button>Join Us</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden p-4 bg-background border-b">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className={`text-sm font-medium transition-colors hover:text-primary p-2 ${location === link.path ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/join" onClick={closeMenu}>
              <Button className="w-full">Join Us</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
