import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { TeamMember } from "@shared/schema";
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa";

function TeamMemberSkeleton() {
  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-xl bg-background/80 backdrop-blur-sm">
        <div className="p-6">
          <Skeleton className="h-52 w-full mb-5 rounded-lg" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  const { data: members, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  return (
    <div className="container py-16">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Meet Our Team</h1>
        <p className="text-xl text-muted-foreground">
          The passionate minds behind AI Nexus, dedicated to advancing AI education and innovation at SRM IST Delhi-NCR.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <TeamMemberSkeleton key={i} />)
        ) : (
          members?.map((member) => (
            <div 
              key={member.id}
              className="relative group transition-all duration-300 hover:scale-105"
            >
              <div className="overflow-hidden rounded-xl border bg-background/80 backdrop-blur-sm">
                <div className="p-6">
                  <div className="relative mb-5 overflow-hidden rounded-lg aspect-square bg-muted">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name}
                      className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-semibold text-xl">{member.name}</h3>
                  <p className="text-sm text-primary/80 mb-4">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  
                  <div className="flex gap-3 text-muted-foreground">
                    <a href="#" className="hover:text-primary transition-colors">
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="hover:text-primary transition-colors">
                      <FaTwitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="hover:text-primary transition-colors">
                      <FaGithub className="w-5 h-5" />
                    </a>
                    <a href={`mailto:ainexus.srmist@gmail.com`} className="hover:text-primary transition-colors">
                      <FaEnvelope className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
        <p className="text-muted-foreground mb-6">
          Are you passionate about AI and looking to make an impact? We're always looking for talented
          and motivated individuals to join our community.
        </p>
        <a 
          href="/join" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Apply to Join
        </a>
      </div>
    </div>
  );
}
