import { Card, CardContent, CardHeader } from './ui/card';
import { TeamMember } from '@/types/api';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="overflow-hidden text-center transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="w-24 h-24 mx-auto mb-2 overflow-hidden rounded-full bg-muted">
          <img 
            src={member.imageUrl} 
            alt={member.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-bold text-lg">{member.name}</h3>
        <p className="text-sm text-primary">{member.role}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {member.bio}
        </p>
      </CardContent>
    </Card>
  );
}
