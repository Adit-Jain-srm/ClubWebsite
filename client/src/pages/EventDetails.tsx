import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { getEvent } from '@/api/client';
import { Event } from '@/types/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { EventRegistrationForm } from '@/components/EventRegistrationForm';

export function EventDetails() {
  const [, params] = useRoute('/events/:id');
  const eventId = params?.id ? parseInt(params.id) : 0;
  
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        const eventData = await getEvent(eventId);
        setEvent(eventData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load event details. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleRegistrationSuccess = () => {
    setRegistered(true);
    // Update event registration count if we want to show updated capacity
    if (event) {
      setEvent({
        ...event,
        currentRegistrations: event.currentRegistrations + 1
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="h-96 w-full max-w-3xl bg-muted animate-pulse rounded-lg"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">{error || 'Event not found'}</h2>
        <Link href="/events">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
          </Button>
        </Link>
      </div>
    );
  }

  const isFullyBooked = event.currentRegistrations >= event.maxCapacity;
  const availableSlots = event.maxCapacity - event.currentRegistrations;
  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();

  return (
    <div className="space-y-6">
      <Link href="/events">
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Event Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="w-full h-64 overflow-hidden rounded-lg bg-muted">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            
            <div className="flex flex-wrap gap-4 mt-4">
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
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-3">Event Description</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="whitespace-pre-line">{event.description}</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Registration</h2>

            {isPastEvent ? (
              <div className="text-center p-4 bg-muted rounded-md">
                <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">This event has already taken place.</p>
              </div>
            ) : registered ? (
              <div className="text-center p-4 bg-primary/10 rounded-md">
                <div className="text-primary mb-2">✓</div>
                <p>You have successfully registered for this event.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  A confirmation has been recorded in our system.
                </p>
              </div>
            ) : isFullyBooked ? (
              <div className="text-center p-4 bg-muted rounded-md">
                <Users className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">This event is currently at full capacity.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Fill in the form below to register for this event.
                </p>
                <EventRegistrationForm 
                  eventId={event.id} 
                  onSuccess={handleRegistrationSuccess}
                />
              </>
            )}
          </Card>

          <div className="mt-6 bg-card p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Event Details</h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground">Capacity:</span>
                <span>{event.maxCapacity} attendees</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground">Registered:</span>
                <span>{event.currentRegistrations} attendees</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available Slots:</span>
                <span>{availableSlots} slots</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
