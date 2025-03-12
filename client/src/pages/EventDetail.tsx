import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { fetchEvent, registerForEvent } from "@/lib/api";
import { formatDate } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registrationSchema = z.object({
  userId: z.number(),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const EventDetail = () => {
  const [match, params] = useRoute("/events/:id");
  const [, navigate] = useLocation();
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();

  const eventId = match ? parseInt(params.id) : 0;

  const { data: event, isLoading, error } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => fetchEvent(eventId),
    enabled: !!eventId,
  });

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      userId: 1, // Default user ID for demo purposes
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    if (!event) return;
    
    setIsRegistering(true);
    try {
      await registerForEvent(event.id, data);
      toast({
        title: "Registration Successful",
        description: "You have successfully registered for this event.",
      });
      // Refresh the page to update the registration count
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Could not register for this event.",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleBack = () => {
    navigate("/events");
  };

  if (isLoading) {
    return (
      <div className="container py-10 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-muted-foreground">Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container py-10 text-center">
        <p className="text-destructive mb-4">Error loading event details. The event may not exist.</p>
        <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Events
        </Button>
      </div>
    );
  }

  const isFullyBooked = event.currentRegistrations >= event.maxCapacity;
  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();

  return (
    <div className="container py-10">
      <Button onClick={handleBack} variant="outline" className="mb-6 flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Events
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold mb-6">{event.title}</h1>

          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              <span>{formatDate(eventDate)}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="h-5 w-5 mr-2 text-primary" />
              <span>
                {event.currentRegistrations} / {event.maxCapacity} registered
              </span>
            </div>
          </div>

          <div className="prose max-w-none dark:prose-invert">
            <h2>About This Event</h2>
            <p className="whitespace-pre-line">{event.description}</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Registration</h3>
              
              {isPastEvent ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-2">This event has already taken place.</p>
                </div>
              ) : isFullyBooked ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-2">This event is fully booked.</p>
                  <p className="text-sm text-muted-foreground">Please check other upcoming events.</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="userId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User ID (For demo purposes)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isRegistering}>
                      {isRegistering ? "Registering..." : "Register Now"}
                    </Button>
                  </form>
                </Form>
              )}

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-2">Event Details</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{formatDate(eventDate)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{event.location}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span>{event.maxCapacity} attendees</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Available Spots:</span>
                    <span>{Math.max(0, event.maxCapacity - event.currentRegistrations)}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
