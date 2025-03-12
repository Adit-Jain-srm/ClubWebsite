import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Link } from "wouter";
import { useRef, useEffect, useState } from "react";

// Electric animation with enhanced effects
const ElectricAnimation = () => {
  const [paths, setPaths] = useState<{ points: string; delay: number; duration: number; color: string }[]>([]);
  const [pulseEffect, setPulseEffect] = useState(false);
  
  // Trigger pulse effect at random intervals
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 300);
    }, 5000 + Math.random() * 5000);
    
    return () => clearInterval(pulseInterval);
  }, []);
  
  // Generate electric paths
  useEffect(() => {
    const generateRandomPath = () => {
      const pathCount = 12; // Increased number of paths
      const newPaths = [];
      
      // Color palette for electric paths
      const colors = [
        "rgba(56, 189, 248, 0.9)", // Bright cyan blue
        "rgba(96, 165, 250, 0.8)", // Medium blue
        "rgba(129, 140, 248, 0.8)", // Indigo
        "rgba(167, 139, 250, 0.7)", // Purple
        "rgba(236, 72, 153, 0.6)", // Pink
      ];
      
      for (let i = 0; i < pathCount; i++) {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        let currentX = startX;
        let currentY = startY;
        
        let pathPoints = `M ${startX} ${startY} `;
        
        // Create a jagged path with more segments for complex lightning
        const segments = 6 + Math.floor(Math.random() * 6);
        
        for (let j = 0; j < segments; j++) {
          // Random zigzag movement with more variance
          const nextX = currentX + (Math.random() * 40 - 20);
          const nextY = currentY + (Math.random() * 40 - 10); // Tendency to move downward
          
          // Add control points for curved lightning (more natural)
          if (Math.random() > 0.5 && j > 0) {
            const ctrlX1 = currentX + (Math.random() * 20 - 10);
            const ctrlY1 = currentY + (Math.random() * 20 - 10);
            const ctrlX2 = nextX - (Math.random() * 20 - 10);
            const ctrlY2 = nextY - (Math.random() * 20 - 10);
            pathPoints += `C ${ctrlX1} ${ctrlY1}, ${ctrlX2} ${ctrlY2}, ${nextX} ${nextY} `;
          } else {
            pathPoints += `L ${nextX} ${nextY} `;
          }
          
          currentX = nextX;
          currentY = nextY;
        }
        
        newPaths.push({
          points: pathPoints,
          delay: Math.random() * 3,
          duration: 0.8 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      setPaths(newPaths);
    };
    
    generateRandomPath();
    const interval = setInterval(generateRandomPath, 2500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background gradient with animated movement */}
      <motion.div 
        className="absolute inset-0 bg-[#01020e] opacity-40"
        initial={{ opacity: 0.3 }}
        animate={{ 
          opacity: pulseEffect ? 0.6 : 0.4,
          background: pulseEffect 
            ? "radial-gradient(circle at 50% 50%, rgba(96,165,250,0.3), rgba(1,2,14,0.9) 70%)" 
            : "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.15), rgba(1,2,14,0.95) 70%)",
        }}
        transition={{ duration: 1.5 }}
      />
      
      {/* SVG electric effects */}
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="intense-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="electric-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
          </linearGradient>
        </defs>
        
        {/* Main electric paths */}
        <AnimatePresence>
          {paths.map((path, i) => (
            <g key={`path-${i}`}>
              <motion.path
                d={path.points}
                stroke={path.color}
                strokeWidth={1.5 + Math.random() * 2}
                fill="none"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0.2, 0], 
                  opacity: [0, 0.9, 0.6, 0],
                  strokeWidth: [1.5, 2 + Math.random() * 2, 1, 0]
                }}
                exit={{ opacity: 0, pathLength: 0 }}
                transition={{ 
                  duration: path.duration, 
                  delay: path.delay,
                  repeat: 1,
                  repeatDelay: 1 + Math.random() * 2,
                  ease: [0.16, 1, 0.3, 1], // Custom spring-like animation
                  times: [0, 0.4, 0.7, 1] // Control timing of keyframes
                }}
              />
              
              {/* Occasional wider path for glow effect */}
              {Math.random() > 0.7 && (
                <motion.path
                  d={path.points}
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth={0.5}
                  fill="none"
                  filter="url(#intense-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0], 
                    opacity: [0, 0.3, 0] 
                  }}
                  transition={{ 
                    duration: path.duration * 0.8, 
                    delay: path.delay + 0.05,
                    ease: "easeOut"
                  }}
                />
              )}
            </g>
          ))}
        </AnimatePresence>
        
        {/* Central electric node */}
        <motion.circle
          cx="50%"
          cy="40%"
          r={pulseEffect ? 2 : 1}
          fill="url(#electric-gradient)"
          filter="url(#intense-glow)"
          initial={{ opacity: 0.5 }}
          animate={{ 
            opacity: [0.5, 0.9, 0.5],
            r: pulseEffect ? [1, 3, 1] : [1, 1.5, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
      
      {/* Background particles with varied sizes and colors */}
      {Array.from({ length: 80 }).map((_, i) => {
        const size = 0.5 + Math.random() * 2;
        const isLarge = Math.random() > 0.9;
        const colors = [
          "bg-blue-400/40", 
          "bg-indigo-400/30", 
          "bg-purple-400/30", 
          "bg-cyan-400/40",
          "bg-white/20"
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={`particle-${i}`}
            className={`absolute ${color} rounded-full`}
            style={{
              width: isLarge ? `${size * 2}px` : `${size}px`,
              height: isLarge ? `${size * 2}px` : `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: isLarge ? "blur(1px)" : "none"
            }}
            animate={{
              scale: isLarge ? [0, 1.5, 0] : [0, 1, 0],
              opacity: isLarge ? [0, 0.7, 0] : [0, 0.5, 0],
              y: [0, Math.random() * -50 - 20],
              x: [0, (Math.random() - 0.5) * 30]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        );
      })}
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
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  
  return (
    <motion.div 
      ref={ref}
      className="relative overflow-hidden min-h-[100vh] flex items-center"
      style={{
        background: "linear-gradient(to bottom, #01020e 0%, #030720 100%)"
      }}
    >
      <ElectricAnimation />
      
      {/* Content container with parallax effect */}
      <div className="container relative z-10">
        <motion.div
          style={{ y, opacity, scale }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="h-1 w-8 bg-gradient-to-r from-cyan-400 to-blue-500 mr-3" 
              animate={{ width: [8, 32, 8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-cyan-400 font-semibold tracking-widest text-sm">AI NEXUS CLUB</span>
            <motion.div 
              className="h-1 w-8 bg-gradient-to-r from-blue-500 to-cyan-400 ml-3" 
              animate={{ width: [8, 32, 8] }}
              transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Building the Neural Future
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-blue-100/80 mb-10 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            SRM IST Delhi-NCR's Official AI & ML Society
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/20 group"
            >
              <Link href="/join" className="relative overflow-hidden">
                <span className="relative z-10">Join AI Nexus</span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 z-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <Zap className="ml-2 h-4 w-4 inline group-hover:animate-pulse relative z-10" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 shadow-lg shadow-cyan-900/10"
            >
              <Link href="/events">
                Explore Events <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-cyan-500/30 flex justify-center"
          animate={{ borderColor: ["rgba(8, 145, 178, 0.3)", "rgba(8, 145, 178, 0.6)", "rgba(8, 145, 178, 0.3)"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
      
      {/* Bottom gradient */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#01020e] to-transparent"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1]) }}
      />
    </motion.div>
  );
}