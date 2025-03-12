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
import { useEffect } from "react";
import { useLocation } from "wouter";

function ScrollToHashElement() {
  const [location] = useLocation();
  
  useEffect(() => {
    // If there's a hash in the URL
    if (location.includes('#')) {
      const elementId = location.split('#')[1];
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (location === '/') {
      // Scroll to top when navigating to home page with no hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
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
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;