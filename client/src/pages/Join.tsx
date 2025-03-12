import { RecruitmentForm } from '@/components/RecruitmentForm';
import { Separator } from '@/components/ui/separator';
import { teams } from '@shared/schema';

export function Join() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Join AI Nexus Club</h1>
        <p className="text-muted-foreground">
          Be part of a community that's passionate about artificial intelligence and its applications. 
          Submit your application to join our team!
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Teams</h2>
        <p className="mb-6">
          We have several teams that focus on different aspects of the club's activities. 
          Each team plays a crucial role in making AI Nexus a vibrant community.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-2">{teams.TECH}</h3>
            <p className="text-sm text-muted-foreground">
              Focuses on developing AI projects, organizing technical workshops, and providing resources for members to enhance their technical skills.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-2">{teams.EVENT}</h3>
            <p className="text-sm text-muted-foreground">
              Plans and executes all club events, including workshops, competitions, guest lectures, and networking sessions.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-2">{teams.PR}</h3>
            <p className="text-sm text-muted-foreground">
              Manages the club's public relations, builds partnerships with industry and other clubs, and increases the club's visibility.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-2">{teams.FINANCE}</h3>
            <p className="text-sm text-muted-foreground">
              Handles the club's budget, secures sponsorships, and manages financial resources to support club activities.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm md:col-span-2">
            <h3 className="text-xl font-medium mb-2">{teams.SOCIAL}</h3>
            <p className="text-sm text-muted-foreground">
              Creates and manages content for the club's social media platforms, designs graphics, and builds the club's online presence.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Join Us?</h2>
        <ul className="space-y-2 list-disc pl-6 mb-6">
          <li>Enhance your technical skills through hands-on AI projects</li>
          <li>Network with industry professionals and like-minded students</li>
          <li>Participate in exclusive events, competitions, and workshops</li>
          <li>Gain leadership experience by managing projects and teams</li>
          <li>Add valuable experience to your resume and portfolio</li>
          <li>Be part of a community that's passionate about AI and its future</li>
        </ul>
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-semibold mb-6">Application Form</h2>
        <p className="text-muted-foreground mb-8">
          Fill out the form below to apply for membership. We'll review your application and get back to you soon.
        </p>
        
        <RecruitmentForm />
      </div>
    </div>
  );
}
