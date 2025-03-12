import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';
import { cn, generateCalendarUrl, truncateText } from '../lib/utils';
import { useKeyboardNavigation } from './ui/KeyboardNavigation';
import { calculateContrastRatio } from './ui/a11y-utils';
import { Event } from '../types/api';
import { ResponsiveHeading3, ResponsiveBody } from './ui/ResponsiveText';

interface EnhancedEventCardProps {
  event: Event;
  className?: string;
}

export function EnhancedEventCard({ event, className = "" }: EnhancedEventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [calendarPopupOpen, setCalendarPopupOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { isUsingKeyboard } = useKeyboardNavigation();
  
  // Calculate contrast ratio for text readability
  const cardBgColor = "#1a1a1a"; // Dark background
  const textColor = "#ffffff"; // White text
  const contrastRatio = calculateContrastRatio(textColor, cardBgColor);
  const hasGoodContrast = contrastRatio >= 4.5; // WCAG AA standard
  
  // Format date strings
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const formattedDate = format(startDate, "MMM d, yyyy");
  const formattedTime = `${format(startDate, "h:mm a")} - ${format(endDate, "h:mm a")}`;
  
  // Handle mouse movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to card
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };
    
    // Only add mousemove listener if not using keyboard navigation
    if (!isUsingKeyboard) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isUsingKeyboard]);
  
  // Close calendar popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarPopupOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Transform values for 3D effect
  const rotateX = isHovered ? (mousePosition.y / (cardRef.current?.clientHeight || 1) - 0.5) * 10 : 0;
  const rotateY = isHovered ? (mousePosition.x / (cardRef.current?.clientWidth || 1) - 0.5) * -10 : 0;
  
  // Generate calendar URLs
  const googleCalendarUrl = generateCalendarUrl({
    provider: 'google',
    title: event.title,
    description: event.description,
    location: event.location,
    startDate,
    endDate,
  });
  
  const icsCalendarUrl = generateCalendarUrl({
    provider: 'ics',
    title: event.title,
    description: event.description,
    location: event.location,
    startDate,
    endDate,
  });
  
  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-lg bg-slate-900 text-white shadow-xl",
        "transition-all duration-300 group cursor-pointer transform",
        "border border-slate-800 hover:border-slate-700",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        transformStyle: 'preserve-3d',
        transform: isUsingKeyboard ? 'none' : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="article"
      aria-label={`Event: ${event.title} on ${formattedDate}`}
    >
      {/* Event Card Content */}
      <Link href={`/events/${event.id}`}>
        <div className="p-6 relative z-10">
          {/* Event Title */}
          <ResponsiveHeading3 className="mb-2 group-hover:text-blue-400 transition-colors">
            {event.title}
          </ResponsiveHeading3>
          
          {/* Event Date & Time Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-300 gap-2">
              <FaCalendarAlt className="text-blue-400" />
              <span>{formattedDate}</span>
            </div>
            
            <div className="flex items-center text-gray-300 gap-2">
              <FaClock className="text-blue-400" />
              <span>{formattedTime}</span>
            </div>
            
            <div className="flex items-center text-gray-300 gap-2">
              <FaMapMarkerAlt className="text-blue-400" />
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center text-gray-300 gap-2">
              <FaUsers className="text-blue-400" />
              <span>{event.currentRegistrations}/{event.capacity} registered</span>
            </div>
          </div>
          
          {/* Event Description */}
          <ResponsiveBody className="text-gray-300 mb-4">
            {truncateText(event.description, 120)}
          </ResponsiveBody>
        </div>
      </Link>
      
      {/* Add to Calendar Button */}
      <div 
        className={cn(
          "absolute bottom-4 right-4 transition-all duration-300",
          "transform",
          isHovered && !isUsingKeyboard ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
        )}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCalendarPopupOpen(!calendarPopupOpen);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg"
          aria-label="Add to calendar"
          aria-expanded={calendarPopupOpen}
        >
          <FaCalendarAlt className="text-lg" />
        </button>
        
        {/* Calendar Popup */}
        {calendarPopupOpen && (
          <div 
            ref={calendarRef}
            className="absolute bottom-12 right-0 bg-white text-black rounded-lg shadow-xl p-3 w-44"
          >
            <h4 className="text-sm font-semibold mb-2">Add to Calendar</h4>
            <div className="flex flex-col space-y-2">
              <a 
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:bg-gray-100 p-1 rounded"
                onClick={(e) => e.stopPropagation()}
              >
                Google Calendar
              </a>
              <a 
                href={icsCalendarUrl}
                download={`${event.title.replace(/\s+/g, '-')}.ics`}
                className="text-sm hover:bg-gray-100 p-1 rounded"
                onClick={(e) => e.stopPropagation()}
              >
                Apple Calendar
              </a>
            </div>
          </div>
        )}
      </div>
      
      {/* Accessibility warning if contrast is poor */}
      {!hasGoodContrast && (
        <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs p-1 rounded">
          Low contrast
        </div>
      )}
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-950 opacity-60" />
    </motion.div>
  );
}