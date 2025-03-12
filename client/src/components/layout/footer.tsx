import { Link } from "wouter";
import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-12 mt-8">
      <div className="container grid gap-8 lg:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Brain className="h-6 w-6" />
            <span className="font-bold text-lg">AI Nexus Club</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Empowering students with AI innovation and ethical development at SRM IST Delhi-NCR Campus.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <div className="grid gap-2">
            <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground">
              Events
            </Link>
            <Link href="/team" className="text-sm text-muted-foreground hover:text-foreground">
              Team
            </Link>
            <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground">
              Resources
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <p className="text-sm text-muted-foreground">
            SRM IST Delhi-NCR Campus<br />
            Ghaziabad<br />
            Email: ainexus.srmist@gmail.com
          </p>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t">
        <p className="text-sm text-center text-muted-foreground">
          © {new Date().getFullYear()} AI Nexus Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
