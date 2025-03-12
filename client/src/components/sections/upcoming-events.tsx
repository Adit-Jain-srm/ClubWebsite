import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const upcomingEvents = [
  {
    id: 1,
    title: "Prompt~Craft",
    date: "March 2025",
    description: "Interactive seminar on Large Language Models (LLMs) and prompt engineering, covering GPT-based automation, AI agents, and API-driven AI interactions with expert insights.",
  },
  {
    id: 2,
    title: "Smart Stocks – AI & ML Strategies",
    date: "May 2025",
    description: "Hands-on workshop on AI-powered stock market predictions, algorithmic trading, and risk management, using tools like TensorFlow, Pandas, and yFinance.",
  },
  {
    id: 3,
    title: "AI Ethics & Future Trends Panel",
    date: "August 2025",
    description: "Expert panel on ethical AI, biases in AI models, deepfakes, data privacy, and AI's impact on jobs, featuring case studies and discussions.",
  },
  {
    id: 4,
    title: "InsightForge – AI Challenge",
    date: "September 2025",
    description: "AI challenge where participants build predictive ML/DL models with real-world datasets, focusing on model optimization and Kaggle-style problem-solving.",
  },
  {
    id: 5,
    title: "AI Literacy Campaigns",
    date: "October 2025",
    description: "AI awareness initiative featuring interactive workshops in schools and communities, live AI tool demonstrations, and AI for Social Good applications.",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Upcoming Events
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join us for exciting events that explore the cutting edge of AI technology
            and connect with fellow enthusiasts.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
