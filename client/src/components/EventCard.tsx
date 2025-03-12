import { Link } from 'wouter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar, MapPin, Users } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Event } from '@/types/api';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const isFullyBooked = event.currentRegistrations >= event.maxCapacity;
  const availableSlots = event.maxCapacity - event.currentRegistrations;
  
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="w-full h-40 mb-2 overflow-hidden rounded-lg bg-muted">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2" />
            <span>
              {isFullyBooked 
                ? 'Fully booked' 
                : `${availableSlots} slots available`}
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {event.description}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/events/${event.id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
