import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
      
      {/* Abstract shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 left-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            AI Nexus Club
            <span className="text-primary block mt-2">SRM University</span>
          </h1>
          
          <p className="mb-8 text-xl text-muted-foreground max-w-xl">
            Bridging theory and practice in artificial intelligence through workshops, hackathons, and industry connections.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/events">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Events
              </Button>
            </Link>
            
            <Link href="/join">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Join the Club
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
