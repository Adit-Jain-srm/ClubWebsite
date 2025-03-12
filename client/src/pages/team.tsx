import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { TeamMember } from "@shared/schema";
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

// Dynamic electric background
const ElectricEffect = () => {
  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none opacity-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ duration: 2 }}
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <filter id="glow-team" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Electric paths */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.path
            key={`path-${i}`}
            d={`M ${10 + Math.random() * 20} ${Math.random() * 100} Q ${50 + Math.random() * 30} ${20 + Math.random() * 60}, ${70 + Math.random() * 30} ${Math.random() * 100}`}
            stroke="rgba(56, 189, 248, 0.6)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow-team)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0] 
            }}
            transition={{ 
              duration: 4 + Math.random() * 3,
              delay: i * 0.7,
              repeat: Infinity,
              repeatDelay: 1 + Math.random() * 5
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

function TeamMemberSkeleton() {
  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-xl bg-background/40 backdrop-blur-sm border border-blue-500/10">
        <div className="p-6">
          <Skeleton className="h-52 w-full mb-5 rounded-lg" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );
}

const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
      style={{ zIndex: 10 - index }}
    >
      <div 
        className="overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-b from-background/80 to-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-500"
      >
        <div className="p-6">
          <div className="relative mb-5 overflow-hidden rounded-lg aspect-square bg-gradient-to-tr from-blue-900/20 to-blue-700/10">
            <motion.div
              className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.2), transparent 70%)"
              }}
            />
            <motion.img 
              src={member.imageUrl} 
              alt={member.name}
              className="object-cover h-full w-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          
          <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
            <h3 className="font-semibold text-xl tracking-tight">{member.name}</h3>
            <p className="text-sm text-blue-400 mb-2 font-medium">{member.role}</p>
            <div className="w-12 h-0.5 bg-blue-500/30 mb-3" />
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{member.bio}</p>
          </motion.div>
          
          <motion.div 
            className="flex gap-3 text-muted-foreground"
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.a 
              href="#" 
              className="hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
            >
              <FaLinkedin className="w-5 h-5" />
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
            >
              <FaTwitter className="w-5 h-5" />
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
            >
              <FaGithub className="w-5 h-5" />
            </motion.a>
            <motion.a 
              href={`mailto:ainexus.srmist@gmail.com`} 
              className="hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
            >
              <FaEnvelope className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Team() {
  const { data: members, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  
  return (
    <div className="relative py-24 overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-950/5 to-background/95 -z-10" />
      <ElectricEffect />
      
      <motion.div 
        ref={titleRef}
        className="container relative z-10 mb-24"
        style={{ y, opacity }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-1 w-6 bg-blue-500 mr-2" />
            <span className="text-blue-400 font-semibold tracking-widest text-sm">THE TEAM</span>
            <div className="h-1 w-6 bg-blue-500 ml-2" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Meet Our Team
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            The passionate minds behind AI Nexus, dedicated to advancing AI education and innovation at SRM IST Delhi-NCR.
          </motion.p>
        </div>
      </motion.div>

      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <TeamMemberSkeleton key={i} />)
          ) : (
            members?.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))
          )}
        </div>
      </div>

      <motion.div 
        className="container mt-32"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-3xl mx-auto text-center rounded-xl border border-blue-500/20 bg-gradient-to-b from-blue-900/10 to-background/30 backdrop-blur-sm p-10">
          <motion.h2 
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Join Our Team
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Are you passionate about AI and looking to make an impact? We're always looking for talented
            and motivated individuals to join our community.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
              <Link href="/join">
                Apply to Join <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
