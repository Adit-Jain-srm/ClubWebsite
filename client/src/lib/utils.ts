import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

/**
 * Combines class names with Tailwind's utility classes
 * This allows for composing class names with conditional logic
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to a readable format
 */
export function formatDate(input: string | number | Date): string {
  const date = typeof input === 'string' ? parseISO(input) : new Date(input);
  return format(date, 'PPP');
}

/**
 * Gets the initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}

/**
 * Truncates text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Add to Calendar utility
 */
export function generateCalendarUrl(
  options: {
    title: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
  }
) {
  const { title, description, location, startDate, endDate } = options;
  
  // Format dates for different calendar types
  const formatForUrl = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };
  
  const formatForICS = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '').slice(0, -1);
  };
  
  const start = formatForUrl(startDate);
  const end = formatForUrl(endDate);
  const icsStart = formatForICS(startDate);
  const icsEnd = formatForICS(endDate);
  
  // Google Calendar URL
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedLocation = encodeURIComponent(location);
  
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${start}/${end}&details=${encodedDescription}&location=${encodedLocation}&sprop=&sprop=name:`;
  
  // Outlook URL (same as Google)
  const outlookUrl = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodedTitle}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${encodedDescription}&location=${encodedLocation}`;
  
  // iCalendar file content
  const icalContent = 
`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${location}
DTSTART:${icsStart}Z
DTEND:${icsEnd}Z
SUMMARY:${title}
DESCRIPTION:${description.replace(/\\n/g, '\\n')}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;

  const icalUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(icalContent)}`;
  
  return {
    google: googleUrl,
    outlook: outlookUrl,
    ical: icalUrl
  };
}

/**
 * Debounce function to limit how often a function is called
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Get contrast color (black or white) based on background color
 */
export function getContrastColor(hexColor: string): string {
  // If no color is provided or it's invalid, return black
  if (!hexColor || !/^#[0-9A-F]{6}$/i.test(hexColor)) {
    return '#000000';
  }
  
  // Remove the hash
  const hex = hexColor.slice(1);
  
  // Convert hex to RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  
  // Calculate luminance - human perceived brightness
  // https://www.w3.org/TR/WCAG20/#relativeluminancedef
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for light colors, white for dark
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}