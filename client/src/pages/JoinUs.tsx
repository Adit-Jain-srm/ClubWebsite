import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { teams } from "@shared/schema";
import { submitRecruitmentApplication } from "@/lib/api";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  regNumber: z.string().min(1, "Registration number is required."),
  email: z.string()
    .email("Please enter a valid email.")
    .endsWith("srmist.edu.in", "Please use your SRM email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  branch: z.string().min(1, "Branch is required."),
  semester: z.string().min(1, "Semester is required."),
  team: z.enum([
    teams.TECH,
    teams.EVENT,
    teams.PR,
    teams.FINANCE,
    teams.SOCIAL,
  ], {
    errorMap: () => ({ message: "Please select a team." })
  }),
  whyJoin: z.string().min(20, "Please provide a more detailed response."),
  experience: z.string().min(20, "Please provide a more detailed response."),
  resumeUrl: z.string().url("Please enter a valid URL for your resume."),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const JoinUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      regNumber: "",
      email: "",
      phone: "",
      branch: "",
      semester: "",
      team: undefined,
      whyJoin: "",
      experience: "",
      resumeUrl: "",
    },
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);
    try {
      await submitRecruitmentApplication(data);
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted. We'll review it and get back to you soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Could not submit your application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Join AI Nexus Club</h1>
        <p className="text-muted-foreground max-w-2xl">
          Become part of our vibrant community of AI enthusiasts. Apply to join one of our teams and enhance your skills while working on exciting projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-6">Our Teams</h2>
          
          <div className="space-y-6">
            <div className="bg-card p-5 rounded-lg border">
              <h3 className="font-bold text-lg mb-2">TechX Team</h3>
              <p className="text-muted-foreground text-sm">
                Develop AI projects, host technical workshops, and create learning resources for club members.
              </p>
            </div>
            
            <div className="bg-card p-5 rounded-lg border">
              <h3 className="font-bold text-lg mb-2">EventX Team</h3>
              <p className="text-muted-foreground text-sm">
                Plan and organize workshops, hackathons, competitions, and other events for the club.
              </p>
            </div>
            
            <div className="bg-card p-5 rounded-lg border">
              <h3 className="font-bold text-lg mb-2">PR & Outreach Team</h3>
              <p className="text-muted-foreground text-sm">
                Handle club publicity, social media, industry connections, and collaborations with other clubs.
              </p>
            </div>
            
            <div className="bg-card p-5 rounded-lg border">
              <h3 className="font-bold text-lg mb-2">Finance Team</h3>
              <p className="text-muted-foreground text-sm">
                Manage club budget, sponsorships, fundraising activities, and expense tracking.
              </p>
            </div>
            
            <div className="bg-card p-5 rounded-lg border">
              <h3 className="font-bold text-lg mb-2">SocialX Team</h3>
              <p className="text-muted-foreground text-sm">
                Create content for social media, design graphics, and manage the club's online presence.
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-card rounded-lg border">
            <h3 className="font-bold text-lg mb-3">Why Join Us?</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Enhance your AI and ML skills</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Work on real-world projects</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Network with industry professionals</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Participate in hackathons and competitions</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Build your resume with meaningful experiences</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Application Form</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
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
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl>
                          <Input placeholder="RA2211003010XXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@srmist.edu.in" type="email" {...field} />
                        </FormControl>
                        <FormDescription>
                          Use your SRM email address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. CSE-AIML, ECE, etc." {...field} />
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
                        <FormLabel>Semester</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your semester" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Semester 1</SelectItem>
                            <SelectItem value="2">Semester 2</SelectItem>
                            <SelectItem value="3">Semester 3</SelectItem>
                            <SelectItem value="4">Semester 4</SelectItem>
                            <SelectItem value="5">Semester 5</SelectItem>
                            <SelectItem value="6">Semester 6</SelectItem>
                            <SelectItem value="7">Semester 7</SelectItem>
                            <SelectItem value="8">Semester 8</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="team"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Preference</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a team you'd like to join" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={teams.TECH}>{teams.TECH}</SelectItem>
                          <SelectItem value={teams.EVENT}>{teams.EVENT}</SelectItem>
                          <SelectItem value={teams.PR}>{teams.PR}</SelectItem>
                          <SelectItem value={teams.FINANCE}>{teams.FINANCE}</SelectItem>
                          <SelectItem value={teams.SOCIAL}>{teams.SOCIAL}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="whyJoin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you want to join AI Nexus Club?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Share your motivations and what you hope to achieve by joining the club." 
                          className="min-h-[120px]"
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
                      <FormLabel>Relevant Experience</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe any relevant skills, projects, or experiences you have in AI, programming, design, event management, etc." 
                          className="min-h-[120px]"
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
                      <FormLabel>Resume Link</FormLabel>
                      <FormControl>
                        <Input placeholder="Link to your resume (Google Drive, Dropbox, etc.)" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please share a link to your resume hosted on Google Drive, Dropbox, or similar platforms.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center bg-card p-8 rounded-lg border shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Application Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mb-4">1</div>
            <h3 className="font-semibold mb-2">Submit Application</h3>
            <p className="text-sm text-muted-foreground">Fill out and submit the application form.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mb-4">2</div>
            <h3 className="font-semibold mb-2">Application Review</h3>
            <p className="text-sm text-muted-foreground">Our team reviews your application within 5-7 days.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mb-4">3</div>
            <h3 className="font-semibold mb-2">Interview</h3>
            <p className="text-sm text-muted-foreground">Selected candidates will be invited for a short interview.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mb-4">4</div>
            <h3 className="font-semibold mb-2">Welcome Aboard!</h3>
            <p className="text-sm text-muted-foreground">Successful applicants will be officially inducted into the club.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
