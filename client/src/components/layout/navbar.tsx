import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { SiInstagram } from "react-icons/si";
import { Mail, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Track mouse position for magnetic effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  
  // Magnetic effect calculation - with reduced effect and distance
  const calculateMagneticEffect = (element: HTMLElement, scale = 1.03, distance = 100) => {
    if (!navRef.current) return { x: 0, y: 0, scale: 1 };
    
    const { left, top, width, height } = element.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = mousePosition.x - centerX;
    const distanceY = mousePosition.y - centerY;
    const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Only apply effect when mouse is close enough - reduced distance for more subtle effect
    if (totalDistance < distance) {
      const intensity = 1 - totalDistance / distance;
      return { 
        x: distanceX * 0.1 * intensity, // Reduced movement factor
        y: distanceY * 0.1 * intensity, // Reduced movement factor
        scale: 1 + (scale - 1) * intensity // Smaller scaling
      };
    }
    
    return { x: 0, y: 0, scale: 1 };
  };
  
  // Update mouse position for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Handle scroll transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to upcoming events section when clicked
  const scrollToEvents = (e: React.MouseEvent) => {
    e.preventDefault();
    const eventsSection = document.getElementById('upcoming-events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    } else if (location !== '/') {
      // If not on home page, go to home and then scroll
      window.location.href = '/#upcoming-events';
    }
  };

  const navItems = [
    { href: "/", label: "Home", action: null },
    { label: "Events", action: scrollToEvents },
    { href: "/team", label: "Team", action: null },
    { href: "/resources", label: "Resources", action: null },
    { href: "/news", label: "News", action: null },
    { href: "/join", label: "Join Us", action: null },
  ];

  return (
    <motion.nav 
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-lg border-b border-primary/10 shadow-lg shadow-primary/5" 
          : "bg-background/20 backdrop-blur-sm"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 mr-8 group">
            <motion.div 
              className="relative"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <span className="font-bold text-lg group-hover:text-primary transition-colors">
                AI Nexus
                <motion.span 
                  className="absolute -top-1 -right-2 text-xs text-cyan-400"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Zap size={10} />
                </motion.span>
              </span>
              <span className="text-xs block text-muted-foreground group-hover:text-primary/80 transition-colors">
                SRM IST Delhi-NCR
              </span>
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>

          <div className="hidden md:flex gap-1">
            {navItems.map((item, index) => {
              // Create ref for this button
              const buttonRef = useRef<HTMLDivElement>(null);
              
              // Calculate magnetic effect for this button
              const magneticEffect = buttonRef.current 
                ? calculateMagneticEffect(buttonRef.current) 
                : { x: 0, y: 0, scale: 1 };
              
              return (
                <motion.div
                  key={item.label}
                  ref={buttonRef}
                  className="px-1"
                  animate={{ 
                    x: magneticEffect.x,
                    y: magneticEffect.y,
                    scale: magneticEffect.scale
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                >
                  {item.action ? (
                    <Button
                      variant={location === (item.href || '') ? "default" : "ghost"}
                      onClick={item.action}
                      className="relative overflow-hidden group"
                    >
                      <span className="relative z-10">{item.label}</span>
                      <motion.span 
                        className="absolute inset-0 bg-primary/10 rounded-md z-0"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  ) : (
                    <Button
                      variant={location === (item.href || '') ? "default" : "ghost"}
                      asChild
                      className="relative overflow-hidden group"
                    >
                      <Link href={item.href || ''}>
                        <span className="relative z-10">{item.label}</span>
                        <motion.span 
                          className="absolute inset-0 bg-primary/10 rounded-md z-0"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.a
            href="https://www.instagram.com/ainexus.srmist/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full"
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: "rgba(236, 72, 153, 0.1)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <SiInstagram className="h-5 w-5" />
          </motion.a>
          <motion.a
            href="mailto:ainexus.srmist@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full"
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: "rgba(56, 189, 248, 0.1)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="h-5 w-5" />
          </motion.a>
          
          {/* Mobile menu button - we'll implement mobile menu in a separate update */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}