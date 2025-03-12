import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Newsletter() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      await apiRequest("POST", "/api/subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to subscribe. Please try again.",
      });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data.email);
  });

  return (
    <div className="bg-muted py-16">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest updates on AI trends, events, and opportunities.
        </p>
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex gap-4 max-w-md mx-auto">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={mutation.isPending}>
              Subscribe
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
