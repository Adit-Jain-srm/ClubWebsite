import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";

export default function EventDetails() {
  const [, params] = useRoute("/events/:id");
  const { toast } = useToast();
  const eventId = params?.id ? parseInt(params.id) : null;

  const { data: event, isLoading } = useQuery({
    queryKey: ["/api/events", eventId],
    enabled: !!eventId,
  });

  const registerMutation = useMutation({
    mutationFn: async () => {
      if (!eventId) throw new Error("No event ID");
      return apiRequest(`/api/events/${eventId}/register`, {
        method: "POST",
        body: { userId: 1 }, // TODO: Replace with actual user ID from auth
      });
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "You have successfully registered for this event.",
      });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    },
  });

  if (isLoading || !event) {
    return (
      <div className="container py-16">
        <div className="space-y-4">
          <div className="h-8 w-1/3 bg-muted animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  const registrationProgress = (event.currentRegistrations / event.maxCapacity) * 100;
  const isFullyBooked = event.currentRegistrations >= event.maxCapacity;

  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{event.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-primary">
              <Calendar className="h-4 w-4" />
              {format(new Date(event.date), "PPP")}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {event.location}
            </div>

            <p className="text-lg">{event.description}</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {event.currentRegistrations} / {event.maxCapacity} registered
                </span>
                <span>{Math.round(registrationProgress)}% full</span>
              </div>
              <Progress value={registrationProgress} className="h-2" />
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              size="lg"
              onClick={() => registerMutation.mutate()}
              disabled={isFullyBooked || registerMutation.isPending}
            >
              {isFullyBooked
                ? "Event Fully Booked"
                : registerMutation.isPending
                ? "Registering..."
                : "Register Now"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
