import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  BookOpen,
  Code2,
  FileCode,
  GraduationCap,
  Bot,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

interface Resource {
  title: string;
  description: string;
  link: string;
  tags: string[];
  icon: React.ElementType;
}

const resources: Resource[] = [
  {
    title: "AI Fundamentals Learning Path",
    description: "Comprehensive guide to core AI concepts, machine learning basics, and neural networks.",
    link: "https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/",
    tags: ["Basics", "ML", "Neural Networks"],
    icon: Brain,
  },
  {
    title: "Ethical AI Guidelines",
    description: "Best practices for developing responsible and ethical AI systems.",
    link: "https://www.microsoft.com/en-us/ai/responsible-ai",
    tags: ["Ethics", "Best Practices"],
    icon: Shield,
  },
  {
    title: "LangChain Documentation",
    description: "Build applications with LLMs through composability.",
    link: "https://python.langchain.com/docs/get_started/introduction",
    tags: ["LLM", "APIs"],
    icon: Code2,
  },
  {
    title: "Hugging Face Hub",
    description: "Access state-of-the-art machine learning models and datasets.",
    link: "https://huggingface.co/",
    tags: ["Models", "Datasets"],
    icon: Sparkles,
  },
  {
    title: "AI Research Papers",
    description: "Curated collection of important AI research papers and breakthroughs.",
    link: "https://arxiv.org/list/cs.AI/recent",
    tags: ["Research", "Academic"],
    icon: BookOpen,
  },
  {
    title: "OpenAI API Documentation",
    description: "Learn to integrate and work with OpenAI's powerful AI models.",
    link: "https://platform.openai.com/docs/introduction",
    tags: ["API", "Integration"],
    icon: FileCode,
  },
  {
    title: "AI Ethics Course",
    description: "Free course on ethical considerations in AI development.",
    link: "https://www.coursera.org/learn/ai-ethics",
    tags: ["Ethics", "Course"],
    icon: GraduationCap,
  },
  {
    title: "AI Agents Development",
    description: "Guide to building autonomous AI agents and systems.",
    link: "https://docs.langchain.com/docs/use-cases/autonomous-agents",
    tags: ["Agents", "Automation"],
    icon: Bot,
  },
];

export default function Resources() {
  return (
    <div className="container py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-6">Learning Resources</h1>
        <p className="text-lg text-muted-foreground">
          Curated collection of high-quality resources to help you excel in AI development,
          from fundamentals to advanced topics and ethical considerations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <resource.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                </CardContent>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">
          Resources are regularly updated to reflect the latest developments in AI.
          Check back often for new content!
        </p>
      </div>
    </div>
  );
}