import Hero from "@/components/sections/hero";
import Newsletter from "@/components/sections/newsletter";
import UpcomingEvents from "@/components/sections/upcoming-events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code, Users, FileCode } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: "AI Innovation",
      description: "Access cutting-edge AI developments and participate in innovative projects.",
    },
    {
      icon: Code,
      title: "Hands-on Learning",
      description: "Get practical experience with AI tools, APIs, and real-world applications.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Join a community of AI enthusiasts and industry professionals.",
    },
    {
      icon: FileCode,
      title: "Resources",
      description: "Access curated learning materials and stay updated with AI trends.",
    },
  ];

  return (
    <div>
      <Hero />

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join AI Nexus Club?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <UpcomingEvents />

      <section className="py-16 bg-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground mb-8">
              To establish a pioneering AI innovation hub, focusing on cutting-edge developments
              like AI agents, ethical AI, and API integrations beyond conventional learning.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Provide specialized AI-focused training and facilitate student participation
                    in AI research initiatives, promoting publications and industry collaborations.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Launch AI awareness initiatives, develop practical AI solutions, and conduct
                    high-impact AI bootcamps for industry readiness.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}