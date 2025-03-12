import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { TeamMember } from "@shared/schema";

function TeamMemberSkeleton() {
  return (
    <Card>
      <CardHeader className="flex items-center">
        <Skeleton className="h-24 w-24 rounded-full" />
      </CardHeader>
      <CardContent className="text-center">
        <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </CardContent>
    </Card>
  );
}

export default function Team() {
  const { data: members, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Our Team</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <TeamMemberSkeleton key={i} />)
        ) : (
          members?.map((member) => (
            <Card key={member.id}>
              <CardHeader className="flex items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={member.imageUrl} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
