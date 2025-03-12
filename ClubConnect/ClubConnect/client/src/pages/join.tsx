import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRecruitmentApplicationSchema, teams } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Brain, Upload } from "lucide-react";
import { motion } from "framer-motion";

const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

export default function Join() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertRecruitmentApplicationSchema),
    defaultValues: {
      name: "",
      regNumber: "",
      email: "",
      phone: "",
      branch: "",
      semester: "",
      team: "",
      whyJoin: "",
      experience: "",
      resumeUrl: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/join", data);
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "You'll be contacted for the interview round. Join our WhatsApp group for updates.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit application. Please try again.",
      });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <div className="container py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Join AI Nexus Club</h1>
          </div>

          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground mb-4">
              Welcome to AI Nexus – SRMIST Delhi NCR's premier club for AI and ML enthusiasts! 🚀
            </p>
            <div className="bg-primary/10 rounded-lg p-4 mb-8">
              <h2 className="font-semibold mb-2">📢 Important:</h2>
              <ul className="text-sm text-muted-foreground">
                <li>✅ Shortlisting will be done based on your responses.</li>
                <li>✅ Selected candidates will proceed to Round 2: The Interviews.</li>
                <li>✅ Join our WhatsApp group after submission to stay updated.</li>
              </ul>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="regNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="RA2311003010001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Official Email ID *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@srmist.edu.in" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 XXXXXXXXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch & Section *</FormLabel>
                        <FormControl>
                          <Input placeholder="CSE AIML C" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {semesters.map((sem) => (
                              <SelectItem key={sem} value={sem}>
                                {sem} Semester
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="team"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Which team would you like to join? *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a team" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(teams).map(([key, value]) => (
                              <SelectItem key={key} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the team that best matches your interests and skills
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whyJoin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Why do you want to join this team? *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your motivation and what you hope to achieve..."
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Experience *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your relevant skills, projects, competitions, or roles..."
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="resumeUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resume URL *</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Drive/GitHub link to your resume"
                              {...field}
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => window.open("https://drive.google.com", "_blank")}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload your resume to Google Drive and share the link. Include relevant links such as GitHub, LeetCode Profile, LinkedIn, etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-blue-600"
                  disabled={mutation.isPending}
                >
                  Submit Application
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}