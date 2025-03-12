import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { SiInstagram } from "react-icons/si";
import { Mail } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/team", label: "Team" },
    { href: "/resources", label: "Resources" },
    { href: "/news", label: "News" },
    { href: "/join", label: "Join Us" },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 mr-8">
            <div>
              <span className="font-bold text-lg">AI Nexus</span>
              <span className="text-xs block text-muted-foreground">SRM IST Delhi-NCR</span>
            </div>
          </Link>

          <div className="flex gap-6">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={location === item.href ? "default" : "ghost"}
                asChild
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/ainexus.srmist/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <SiInstagram className="h-5 w-5" />
          </a>
          <a
            href="mailto:ainexus.srmist@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}