import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { insertEventRegistrationSchema as registrationSchema } from '@shared/schema';
import { registerForEvent } from '@/api/client';

type EventRegistrationFormData = Omit<z.infer<typeof registrationSchema>, 'eventId'>;

interface EventRegistrationFormProps {
  eventId: number;
  onSuccess?: () => void;
}

export function EventRegistrationForm({ eventId, onSuccess }: EventRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<EventRegistrationFormData>({
    resolver: zodResolver(registrationSchema.omit({ eventId: true })),
    defaultValues: {
      userId: 0,
    },
  });

  const onSubmit = async (data: EventRegistrationFormData) => {
    setIsSubmitting(true);
    try {
      await registerForEvent(eventId, data);
      toast({
        title: 'Registration successful',
        description: 'You have successfully registered for this event.',
      });
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'Event might be at full capacity. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your student ID"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Form>
  );
}
