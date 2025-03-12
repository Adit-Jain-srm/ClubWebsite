import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import type { Event } from "@shared/schema";

function EventSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}

export default function Events() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Upcoming Events</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <EventSkeleton key={i} />)
        ) : events?.length === 0 ? (
          <p className="text-muted-foreground text-center col-span-full">
            No upcoming events at the moment.
          </p>
        ) : (
          events?.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(event.date), "PPP")}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{event.description}</p>
                <p className="text-sm">
                  <strong>Location:</strong> {event.location}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
