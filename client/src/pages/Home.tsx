import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/EventCard';
import { NewsCard } from '@/components/NewsCard';
import { SubscribeForm } from '@/components/SubscribeForm';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { getEvents, getNewsItems, getTeamMembers } from '@/api/client';
import { Event, NewsItem, TeamMember } from '@/types/api';
import { ArrowRight, Calendar, Trophy, Users } from 'lucide-react';

export function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, newsData, teamData] = await Promise.all([
          getEvents(),
          getNewsItems(),
          getTeamMembers()
        ]);
        
        setEvents(eventsData.slice(0, 3));
        setNews(newsData.slice(0, 3));
        setTeamMembers(teamData.slice(0, 3));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                AI Nexus Club at SRM University
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connecting students with artificial intelligence innovation, research, and industry opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/events">
                  <Button size="lg">Explore Events</Button>
                </Link>
                <Link href="/join">
                  <Button size="lg" variant="outline">Join Our Club</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-xl">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                  <path fill="hsl(var(--primary) / 0.2)" d="M40,-65.5C54.2,-60.5,69.6,-53.7,77.4,-41.7C85.2,-29.7,85.3,-12.3,81.8,3.2C78.3,18.6,71.1,32.1,61.5,42.6C51.9,53.2,39.9,60.8,26.6,66.6C13.3,72.4,-1.2,76.3,-14.8,73.9C-28.3,71.5,-40.8,62.7,-49.8,51.6C-58.7,40.5,-64.1,27.1,-69.6,12.3C-75.1,-2.6,-80.7,-18.8,-76.2,-31.3C-71.7,-43.7,-57.2,-52.2,-42.6,-57C-28.1,-61.9,-13.5,-63,-0.2,-62.7C13.2,-62.4,25.9,-70.6,40,-65.5Z" transform="translate(100 100)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold text-primary">AI Nexus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Workshops</h3>
              <p className="text-muted-foreground">
                Learn from industry experts and faculty through hands-on workshops and training sessions.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Competitions</h3>
              <p className="text-muted-foreground">
                Put your skills to the test in hackathons and competitions with amazing prizes.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Networking</h3>
              <p className="text-muted-foreground">
                Connect with like-minded students, researchers, and industry professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-10">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link href="/events">
              <Button variant="outline" className="flex items-center gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No upcoming events at the moment. Check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Our Team</h2>
            <Link href="/team">
              <Button variant="outline" className="flex items-center gap-2">
                Meet Everyone <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-10">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8">Latest AI News</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-10 bg-card">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Join Our Newsletter</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Stay updated with the latest AI news, upcoming events, and opportunities.
          </p>
          <div className="max-w-md mx-auto">
            <SubscribeForm />
          </div>
        </div>
      </section>
    </div>
  );
}
