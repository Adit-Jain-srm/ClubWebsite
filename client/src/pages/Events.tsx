import { useEffect, useState } from 'react';
import { EventCard } from '@/components/EventCard';
import { getEvents } from '@/api/client';
import { Event } from '@/types/api';
import { Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
        setFilteredEvents(eventsData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = events.filter((event) => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [searchQuery, events]);

  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
        <p className="text-muted-foreground">
          Join us for workshops, hackathons, and networking opportunities.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Search events by title, description or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : sortedEvents.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="text-xl font-medium">No events found</h3>
          {searchQuery ? (
            <p className="text-muted-foreground">
              No events match your search criteria. Try different keywords.
            </p>
          ) : (
            <p className="text-muted-foreground">
              There are no upcoming events at the moment. Check back later!
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
