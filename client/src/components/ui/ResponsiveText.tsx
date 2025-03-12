import React, { useEffect, useState, ElementType } from 'react';
import { cn } from '../../lib/utils';

interface ResponsiveTextProps {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  baseSize: number;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any; // Allow any other props to be passed through
}

/**
 * A component that adjusts its font size based on user browser/OS settings
 * Respects user preferences for accessibility
 */
export function ResponsiveText({
  as: Component = 'span',
  children,
  baseSize,
  className = '',
  style = {},
  ...props
}: ResponsiveTextProps) {
  const [fontSize, setFontSize] = useState(baseSize);
  
  useEffect(() => {
    // Get user's font size preference (default to 1 if not available)
    const calculateSize = () => {
      const fontSizePreference = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16;
      setFontSize(baseSize * fontSizePreference);
    };
    
    // Calculate on mount
    calculateSize();
    
    // Recalculate on window resize or when user changes preferences
    window.addEventListener('resize', calculateSize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, [baseSize]);
  
  return (
    <Component
      className={className}
      style={{
        ...style,
        fontSize: `${fontSize}px`,
        lineHeight: 1.5, // Recommended for accessibility
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

// Preset components for common text sizes
export function ResponsiveHeading1({ children, className = '', ...props }) {
  return (
    <ResponsiveText 
      as="h1" 
      baseSize={36} 
      className={cn('font-bold tracking-tight', className)} 
      {...props}
    >
      {children}
    </ResponsiveText>
  );
}

export function ResponsiveHeading2({ children, className = '', ...props }) {
  return (
    <ResponsiveText 
      as="h2" 
      baseSize={30} 
      className={cn('font-semibold tracking-tight', className)} 
      {...props}
    >
      {children}
    </ResponsiveText>
  );
}

export function ResponsiveHeading3({ children, className = '', ...props }) {
  return (
    <ResponsiveText 
      as="h3" 
      baseSize={24} 
      className={cn('font-semibold', className)} 
      {...props}
    >
      {children}
    </ResponsiveText>
  );
}

export function ResponsiveBody({ children, className = '', ...props }) {
  return (
    <ResponsiveText 
      as="p" 
      baseSize={16} 
      className={cn('leading-relaxed', className)} 
      {...props}
    >
      {children}
    </ResponsiveText>
  );
}

export function ResponsiveSmall({ children, className = '', ...props }) {
  return (
    <ResponsiveText 
      as="span" 
      baseSize={14} 
      className={cn('text-gray-600 dark:text-gray-400', className)} 
      {...props}
    >
      {children}
    </ResponsiveText>
  );
}