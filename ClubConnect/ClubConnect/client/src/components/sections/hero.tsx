import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";

const NeuralAnimation = () => {
  // Create a grid of nodes for the neural network effect
  const nodes = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.1,
  }));

  const connections = nodes.map((node, i) => {
    const connections = [];
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.random() > 0.7) {
        connections.push(j);
      }
    }
    return connections;
  });

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            delay: node.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {connections.map((nodeConnections, i) =>
        nodeConnections.map((j) => (
          <motion.div
            key={`${i}-${j}`}
            className="absolute bg-primary h-px origin-top-left"
            animate={{
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${nodes[i].x}%`,
              top: `${nodes[i].y}%`,
              width: `${Math.hypot(
                nodes[j].x - nodes[i].x,
                nodes[j].y - nodes[i].y
              )}%`,
              transform: `rotate(${Math.atan2(
                nodes[j].y - nodes[i].y,
                nodes[j].x - nodes[i].x
              )}rad)`,
            }}
          />
        ))
      )}
    </div>
  );
};

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5 pt-24 pb-32">
      <NeuralAnimation />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.img
            src="/logo.png"
            alt="AI Nexus Logo"
            className="h-24 w-24 mx-auto mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Building the Neural Future
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            SRM IST Delhi-NCR's Official AI & ML Society
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/70">
              <Link href="/join">
                Join AI Nexus <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/events">
                Explore Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}