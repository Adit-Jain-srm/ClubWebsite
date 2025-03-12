import { useEffect, useState } from 'react';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { getTeamMembers } from '@/api/client';
import { TeamMember } from '@/types/api';
import { Users } from 'lucide-react';

export function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const membersData = await getTeamMembers();
        setTeamMembers(membersData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load team members. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Group team members by role for better organization
  const groupedMembers = teamMembers.reduce((groups, member) => {
    const role = member.role;
    if (!groups[role]) {
      groups[role] = [];
    }
    groups[role].push(member);
    return groups;
  }, {} as Record<string, TeamMember[]>);

  // Create a specific order for roles
  const roleOrder = [
    'Head of Department',
    'Faculty Coordinator',
    'President',
    'Vice President',
    'Secretary',
    'Treasurer',
    'Technical Lead',
    'Marketing Lead',
    'Content Lead',
    'Design Lead',
    'Member'
  ];

  // Sort roles by predefined order
  const sortedRoles = Object.keys(groupedMembers).sort((a, b) => {
    const indexA = roleOrder.indexOf(a);
    const indexB = roleOrder.indexOf(b);
    
    // If role is not in the predefined list, put it at the end
    const posA = indexA === -1 ? 999 : indexA;
    const posB = indexB === -1 ? 999 : indexB;
    
    return posA - posB;
  });

  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Our Team</h1>
        <p className="text-muted-foreground">
          Meet the dedicated individuals who make AI Nexus Club possible. Our team works tirelessly to create opportunities for students interested in artificial intelligence.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : teamMembers.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <Users className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="text-xl font-medium">No team members found</h3>
          <p className="text-muted-foreground">
            Team information will be available soon.
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {sortedRoles.map((role) => (
            <div key={role} className="space-y-6">
              <h2 className="text-2xl font-semibold border-b pb-2">{role}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedMembers[role].map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
