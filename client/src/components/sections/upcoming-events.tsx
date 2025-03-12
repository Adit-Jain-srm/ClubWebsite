import { motion, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";
import { Calendar, Sparkles, Cpu, ArrowUpRight, ChevronRight, CalendarPlus, Share2, Bell } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRef, useState, useEffect, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { SkipLink, ContrastChecker, FocusRing } from "@/components/ui/a11y-utils";
import { ResponsiveText } from "@/components/ui/ResponsiveText";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const upcomingEvents = [
  {
    id: 1,
    title: "Prompt~Craft",
    date: "March 2025",
    description: "Interactive seminar on Large Language Models (LLMs) and prompt engineering, covering GPT-based automation, AI agents, and API-driven AI interactions with expert insights.",
    tags: ["LLM", "GPT", "AI Agents"],
    color: "#0ea5e9", // sky blue
    location: "Main Auditorium",
    whatsappGroup: "https://chat.whatsapp.com/IL3EaAdWweQDMg3TEy2lgR"
  },
  {
    id: 2,
    title: "Smart Stocks – AI & ML Strategies",
    date: "May 2025",
    description: "Hands-on workshop on AI-powered stock market predictions, algorithmic trading, and risk management, using tools like TensorFlow, Pandas, and yFinance.",
    tags: ["TensorFlow", "Finance", "ML"],
    color: "#06b6d4", // cyan
    location: "Lab 302",
    whatsappGroup: "https://chat.whatsapp.com/IL3EaAdWweQDMg3TEy2lgR"
  },
  {
    id: 3,
    title: "AI Ethics & Future Trends Panel",
    date: "August 2025",
    description: "Expert panel on ethical AI, biases in AI models, deepfakes, data privacy, and AI's impact on jobs, featuring case studies and discussions.",
    tags: ["Ethics", "Privacy", "Deepfakes"],
    color: "#6366f1", // indigo
    location: "Conference Hall",
    whatsappGroup: "https://chat.whatsapp.com/IL3EaAdWweQDMg3TEy2lgR"
  },
  {
    id: 4,
    title: "InsightForge – AI Challenge",
    date: "September 2025",
    description: "AI challenge where participants build predictive ML/DL models with real-world datasets, focusing on model optimization and Kaggle-style problem-solving.",
    tags: ["Competition", "Kaggle", "ML Models"],
    color: "#ec4899", // pink
    location: "Innovation Hub",
    whatsappGroup: "https://chat.whatsapp.com/IL3EaAdWweQDMg3TEy2lgR"
  },
  {
    id: 5,
    title: "AI Literacy Campaigns",
    date: "October 2025",
    description: "AI awareness initiative featuring interactive workshops in schools and communities, live AI tool demonstrations, and AI for Social Good applications.",
    tags: ["Education", "AI4Good", "Workshops"],
    color: "#14b8a6", // teal
    location: "Community Center",
    whatsappGroup: "https://chat.whatsapp.com/IL3EaAdWweQDMg3TEy2lgR"
  },
];

// Tilt card effect component
function TiltCard({ 
  children, 
  tabIndex,
  onKeyDown
}: { 
  children: React.ReactNode;
  tabIndex?: number;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);

  // Spring animations for smooth movement
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateXSpring = useSpring(0, springConfig);
  const rotateYSpring = useSpring(0, springConfig);
  const scaleSpring = useSpring(1, springConfig);

  useEffect(() => {
    rotateXSpring.set(rotateX);
    rotateYSpring.set(rotateY);
    scaleSpring.set(hovering || focused ? 1.02 : 1);
  }, [rotateX, rotateY, hovering, focused, rotateXSpring, rotateYSpring, scaleSpring]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      setPosition({ x, y });
      setRotateX(-y * 7); // Invert for natural tilt
      setRotateY(x * 7);
    }
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setRotateX(0);
    setRotateY(0);
    setHovering(false);
  };

  const handleFocus = () => {
    setFocused(true);
    // Apply a gentle tilt effect when focused with keyboard
    setRotateX(-2);
    setRotateY(5);
  };

  const handleBlur = () => {
    setFocused(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      tabIndex={tabIndex}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={onKeyDown}
      style={{
        transformStyle: "preserve-3d",
        transform: `
          perspective(1000px) 
          rotateX(${rotateXSpring}deg) 
          rotateY(${rotateYSpring}deg)
          scale(${scaleSpring})
        `,
        transformOrigin: "center center",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-full outline-none focus:outline-none"
      aria-live="polite"
    >
      {children}
      {(hovering || focused) && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: `radial-gradient(
              800px circle at ${position.x * 100 + 50}% ${position.y * 100 + 50}%, 
              rgba(56, 189, 248, 0.1), 
              transparent 40%
            )`,
          }}
        />
      )}
      {focused && (
        <div className="absolute inset-0 rounded-lg pointer-events-none ring-2 ring-primary ring-offset-2 ring-offset-background"></div>
      )}
    </motion.div>
  );
}

// Interactive action button that slides in on hover/focus
function ActionButton({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: React.ElementType; 
  label: string; 
  onClick: () => void; 
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            onClick={onClick}
            className="p-2 rounded-full bg-primary text-primary-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            aria-label={label}
          >
            <Icon size={16} />
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Event card component with accessibility features
function EventCard({ 
  event, 
  index 
}: { 
  event: typeof upcomingEvents[0]; 
  index: number; 
}) {
  const [showActions, setShowActions] = useState(false);
  
  // Add to calendar handler
  const handleAddToCalendar = () => {
    // Implement calendar integration
    alert(`Added "${event.title}" to your calendar`);
  };

  // Share event handler
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Join me at ${event.title} - ${event.description.substring(0, 100)}...`,
        url: window.location.href + '#upcoming-events',
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support sharing
      alert(`Share this event: ${event.title}`);
    }
  };

  // Join WhatsApp group handler
  const handleJoinWhatsApp = () => {
    window.open(event.whatsappGroup, '_blank');
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setShowActions(prev => !prev);
      e.preventDefault();
    }
  };

  return (
    <div 
      className="h-full group relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onFocus={() => setShowActions(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setShowActions(false);
        }
      }}
    >
      <TiltCard tabIndex={0} onKeyDown={handleKeyDown}>
        <ContrastChecker 
          foreground="#FFFFFF" 
          background={event.color}
          threshold={4.5}
          warningMessage="Low contrast"
        >
          <Card className="h-full border border-primary/10 bg-gradient-to-b from-card/90 to-card/50 backdrop-blur relative overflow-hidden group">
            {/* Color accent bar - based on event color */}
            <div 
              className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-2" 
              style={{ backgroundColor: event.color }}
              aria-hidden="true"
            />
            
            {/* CPU decoration icon */}
            <div className="absolute -top-6 -right-6 opacity-10 transform rotate-12 group-hover:rotate-45 transition-transform duration-700">
              <Cpu size={60} />
            </div>
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Calendar className="h-4 w-4" />
                <ResponsiveText baseSize={14} className="text-sm font-medium">{event.date}</ResponsiveText>
              </div>
              
              <ResponsiveText as="h3" baseSize={20} className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {event.title}
              </ResponsiveText>
              
              <div className="flex items-start gap-1 text-muted-foreground mb-3">
                <CalendarPlus className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <ResponsiveText baseSize={14} className="text-sm">{event.location}</ResponsiveText>
              </div>
              
              <ResponsiveText baseSize={14} className="text-sm text-muted-foreground leading-relaxed">
                {event.description}
              </ResponsiveText>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {event.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="px-6 pb-6 pt-0">
              <FocusRing>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs w-full justify-between group-hover:text-primary transition-colors"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </FocusRing>
            </CardFooter>
            
            {/* Action buttons that slide in on hover/focus */}
            <motion.div 
              className="absolute top-3 right-3 flex gap-2 z-20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: showActions ? 1 : 0, 
                y: showActions ? 0 : -10,
                pointerEvents: showActions ? "auto" : "none"
              }}
              transition={{ duration: 0.2 }}
            >
              <ActionButton 
                icon={CalendarPlus} 
                label="Add to calendar" 
                onClick={handleAddToCalendar} 
              />
              <ActionButton 
                icon={Share2} 
                label="Share event" 
                onClick={handleShare} 
              />
              <ActionButton 
                icon={Bell} 
                label="Join WhatsApp group for updates" 
                onClick={handleJoinWhatsApp} 
              />
            </motion.div>
            
            {/* Glowing effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.1) 0%, transparent 60%)",
              }}
            />
          </Card>
        </ContrastChecker>
      </TiltCard>
    </div>
  );
}

export default function UpcomingEvents() {
  // Parallax effect for heading
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, -25]);
  
  // Electric particles animation
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section id="upcoming-events" className="py-24 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
      {/* Skip link for keyboard users */}
      <SkipLink href="#events-list">Skip to events list</SkipLink>
      
      {/* Electric particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: particle.size,
            height: particle.size,
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Glowing overlay */}
      <div className="absolute inset-0 bg-grid-small-white/[0.05] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent -z-10" />
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.div
            style={{ y: y1 }}
            className="relative inline-block"
          >
            <motion.h2 
              id="events-heading"
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Upcoming Events
              <motion.span 
                className="absolute -top-2 -right-6 text-primary"
                animate={{ 
                  rotate: [0, 15, -5, 10, 0],
                  scale: [1, 1.2, 0.9, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                aria-hidden="true"
              >
                <Sparkles size={20} />
              </motion.span>
            </motion.h2>
          </motion.div>
          
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            style={{ y: y2 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Join us for exciting events that explore the cutting edge of AI technology
            and connect with fellow enthusiasts.
          </motion.p>
        </div>

        <div id="events-list" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-labelledby="events-heading">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <EventCard event={event} index={index} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <FocusRing>
              <Button 
                variant="outline" 
                className="group border-primary/20 hover:border-primary/50"
              >
                <span>View All Events</span>
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </FocusRing>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
