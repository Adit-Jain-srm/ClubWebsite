import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import EventDetails from "@/pages/events/[id]";
import Team from "@/pages/team";
import Resources from "@/pages/resources";
import Join from "@/pages/join";
import News from "@/pages/news";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { SkipLink } from "@/components/ui/a11y-utils";
import { KeyboardNavigation } from "@/components/ui/KeyboardNavigation";
import { WhatsAppInvite } from "@/components/WhatsAppInvite";

// Enhanced scroll-to-hash element with focus management and accessibility
function ScrollToHashElement() {
  const [location] = useLocation();
  
  useEffect(() => {
    // If there's a hash in the URL
    if (location.includes('#')) {
      const elementId = location.split('#')[1];
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          // Smooth scroll to the element
          element.scrollIntoView({ behavior: 'smooth' });
          
          // Set focus for keyboard users after scrolling
          setTimeout(() => {
            if (element.tabIndex < 0) {
              element.tabIndex = -1; // Make it focusable but not in tab order
            }
            element.focus({ preventScroll: true });
            
            // Announce for screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.className = 'sr-only';
            announcement.textContent = `Navigated to ${element.tagName === 'SECTION' ? 'section' : 'element'}: ${element.getAttribute('aria-label') || elementId}`;
            document.body.appendChild(announcement);
            
            // Clean up announcement
            setTimeout(() => {
              document.body.removeChild(announcement);
            }, 1000);
          }, 600);
        }
      }, 100);
    } else if (location === '/') {
      // Scroll to top when navigating to home page with no hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  
  return null;
}

// Dynamic page title updater for better accessibility
function PageTitle() {
  const [location] = useLocation();
  
  useEffect(() => {
    let title = "ClubConnect - AI Nexus Club";
    
    // Update title based on current route
    if (location === "/") {
      title = "Home | ClubConnect - AI Nexus Club";
    } else if (location.startsWith("/events/")) {
      title = "Event Details | ClubConnect - AI Nexus Club";
    } else if (location === "/team") {
      title = "Our Team | ClubConnect - AI Nexus Club";
    } else if (location === "/resources") {
      title = "Resources | ClubConnect - AI Nexus Club";
    } else if (location === "/join") {
      title = "Join Us | ClubConnect - AI Nexus Club";
    } else if (location === "/news") {
      title = "News | ClubConnect - AI Nexus Club";
    } else {
      title = "Page Not Found | ClubConnect - AI Nexus Club";
    }
    
    document.title = title;
  }, [location]);
  
  return null;
}

// Enhanced Router with accessibility features
function Router() {
  // Track if user prefers reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Apply user font size preferences
  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    motionQuery.addEventListener('change', handleMotionChange);
    
    // Apply font scaling based on user preferences
    const html = document.documentElement;
    const userFontSize = window.getComputedStyle(html).fontSize;
    const baseFontSize = parseInt(userFontSize);
    
    if (baseFontSize !== 16) {
      // User has adjusted their browser font size, respect it
      const scaleFactor = baseFontSize / 16;
      document.body.style.setProperty('--font-scale-factor', scaleFactor.toString());
    }
    
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col ${prefersReducedMotion ? 'reduce-motion' : ''}`}>
      {/* Skip link for keyboard users */}
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <Navbar />
      <main id="main-content" className="flex-grow outline-none" tabIndex={-1}>
        <PageTitle />
        <ScrollToHashElement />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/events/:id" component={EventDetails} />
          <Route path="/team" component={Team} />
          <Route path="/resources" component={Resources} />
          <Route path="/join" component={Join} />
          <Route path="/news" component={News} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" forcedTheme="dark">
      <QueryClientProvider client={queryClient}>
        <KeyboardNavigation>
          <Router />
          <WhatsAppInvite groupLink="https://chat.whatsapp.com/IL3EaAdWweQDMg3TEy2lgR" />
        </KeyboardNavigation>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;