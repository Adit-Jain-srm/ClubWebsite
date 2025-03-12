import { Link } from 'wouter';
import { Button } from './ui/button';
import { SubscribeForm } from './SubscribeForm';
import { 
  Github, 
  Instagram, 
  Linkedin, 
  Twitter,
  Mail, 
  MapPin 
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold">AI Nexus Club</h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Connecting students with AI innovation at SRM University. Join us to explore the fascinating world of artificial intelligence.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="https://github.com" className="text-muted-foreground hover:text-primary" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="text-muted-foreground hover:text-primary" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/">
                    <a className="text-sm text-muted-foreground hover:text-primary">Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/events">
                    <a className="text-sm text-muted-foreground hover:text-primary">Events</a>
                  </Link>
                </li>
                <li>
                  <Link href="/team">
                    <a className="text-sm text-muted-foreground hover:text-primary">Our Team</a>
                  </Link>
                </li>
                <li>
                  <Link href="/join">
                    <a className="text-sm text-muted-foreground hover:text-primary">Join Us</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a className="text-sm text-muted-foreground hover:text-primary">Contact</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-wider">Contact Info</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>SRM University, Kattankulathur, Chennai, Tamil Nadu 603203</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>ainexusclub@srmist.edu.in</span>
                </li>
              </ul>

              <h3 className="mt-6 text-sm font-medium uppercase tracking-wider">Newsletter</h3>
              <p className="text-sm text-muted-foreground">Stay updated with the latest AI news and club events.</p>
              <SubscribeForm />
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t">
          <p className="text-xs text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Nexus Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
