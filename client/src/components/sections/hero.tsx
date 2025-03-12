import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useRef, useEffect, useState } from "react";

const ElectricAnimation = () => {
  const [paths, setPaths] = useState<{ points: string; delay: number; duration: number }[]>([]);
  
  useEffect(() => {
    const generateRandomPath = () => {
      const pathCount = 8; // Number of electric paths
      const newPaths = [];
      
      for (let i = 0; i < pathCount; i++) {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        let currentX = startX;
        let currentY = startY;
        
        let pathPoints = `M ${startX} ${startY} `;
        
        // Create a jagged path with 5-8 segments
        const segments = 5 + Math.floor(Math.random() * 4);
        
        for (let j = 0; j < segments; j++) {
          // Random zigzag movement
          const nextX = currentX + (Math.random() * 30 - 15);
          const nextY = currentY + (Math.random() * 30 - 5); // Tendency to move downward
          
          pathPoints += `L ${nextX} ${nextY} `;
          currentX = nextX;
          currentY = nextY;
        }
        
        newPaths.push({
          points: pathPoints,
          delay: Math.random() * 2,
          duration: 1 + Math.random() * 2
        });
      }
      
      setPaths(newPaths);
    };
    
    generateRandomPath();
    const interval = setInterval(generateRandomPath, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {paths.map((path, i) => (
          <g key={i}>
            <motion.path
              d={path.points}
              stroke="rgba(56, 189, 248, 0.8)" // Primary blue color
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0], 
                opacity: [0, 0.8, 0] 
              }}
              transition={{ 
                duration: path.duration, 
                delay: path.delay,
                repeat: Infinity,
                repeatDelay: 2 + Math.random() * 3,
                ease: "easeInOut" 
              }}
            />
          </g>
        ))}
      </svg>
      
      {/* Background particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0],
            y: [0, Math.random() * -30],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <motion.div 
      ref={ref}
      className="relative overflow-hidden min-h-[90vh] flex items-center"
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(0,100,255,0.1), transparent 70%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,50,0.1) 100%)"
      }}
    >
      <ElectricAnimation />
      
      <div className="container relative z-10">
        <motion.div
          style={{ y, opacity }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-1 w-6 bg-primary mr-2" />
            <span className="text-primary font-semibold tracking-widest text-sm">AI NEXUS CLUB</span>
            <div className="h-1 w-6 bg-primary ml-2" />
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Building the Neural Future
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            SRM IST Delhi-NCR's Official AI & ML Society
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
              <Link href="/join">
                Join AI Nexus <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-blue-500 text-blue-500 hover:bg-blue-500/10">
              <Link href="/events">
                Explore Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1]) }}
      />
    </motion.div>
  );
}