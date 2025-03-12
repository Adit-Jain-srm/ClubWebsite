import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Calculates the contrast ratio between two colors
 * Based on WCAG 2.0 guidelines: https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function calculateContrastRatio(foreground: string, background: string): number {
  // Helper function to convert hex color to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Parse as RGB
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    
    return { r, g, b };
  };
  
  // Helper function to calculate relative luminance
  const calculateLuminance = (r: number, g: number, b: number): number => {
    // Convert RGB to values between 0 and 1
    const rsRGB = r / 255;
    const gsRGB = g / 255;
    const bsRGB = b / 255;
    
    // Calculate RGB values
    const R = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const G = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const B = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
    
    // Calculate luminance
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };
  
  // Get RGB values for both colors
  const fgRGB = hexToRgb(foreground);
  const bgRGB = hexToRgb(background);
  
  // Calculate luminance
  const fgLuminance = calculateLuminance(fgRGB.r, fgRGB.g, fgRGB.b);
  const bgLuminance = calculateLuminance(bgRGB.r, bgRGB.g, bgRGB.b);
  
  // Calculate contrast ratio
  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Hook to check contrast ratio and return WCAG compliance levels
 */
export function useContrastCheck(foreground: string, background: string) {
  const [contrast, setContrast] = useState(0);
  const [compliance, setCompliance] = useState({
    AA: {
      normal: false,
      large: false
    },
    AAA: {
      normal: false,
      large: false
    }
  });
  
  useEffect(() => {
    const ratio = calculateContrastRatio(foreground, background);
    setContrast(ratio);
    
    setCompliance({
      AA: {
        normal: ratio >= 4.5,
        large: ratio >= 3
      },
      AAA: {
        normal: ratio >= 7,
        large: ratio >= 4.5
      }
    });
  }, [foreground, background]);
  
  return { contrast, compliance };
}

/**
 * Skip link component for keyboard users to bypass navigation
 */
export function SkipLink({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <a
      href={`#${id}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 ring-2 ring-offset-2 ring-offset-primary-500 rounded focus:outline-none"
    >
      {children}
    </a>
  );
}

/**
 * Tracks whether user is navigating with keyboard or mouse/touch
 */
export function useFocusTracking() {
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsUsingKeyboard(true);
        document.body.classList.add('keyboard-navigation');
      }
    };
    
    const handleMouseDown = () => {
      setIsUsingKeyboard(false);
      document.body.classList.remove('keyboard-navigation');
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  
  return isUsingKeyboard;
}

/**
 * Dynamically calculate font size based on user preferences
 */
export function useResponsiveFontSize(baseSize: number) {
  const [fontSize, setFontSize] = useState(baseSize);
  
  useEffect(() => {
    // Initial calculation
    const calculateSize = () => {
      // Get user's font size preference (default to 1 if not available)
      const fontSizePreference = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16;
      
      // Apply user's preference to base size
      setFontSize(baseSize * fontSizePreference);
    };
    
    // Calculate on mount
    calculateSize();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateSize);
    
    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, [baseSize]);
  
  return fontSize;
}

/**
 * Variants for focus ring component
 */
export const focusRingVariants = cva(
  "outline-none ring-offset-2 transition-shadow duration-200",
  {
    variants: {
      variant: {
        default: "focus-visible:ring-2 focus-visible:ring-primary-500",
        destructive: "focus-visible:ring-2 focus-visible:ring-red-500",
        subtle: "focus-visible:ring-1 focus-visible:ring-primary-400",
      },
      size: {
        default: "focus-visible:ring-offset-2",
        sm: "focus-visible:ring-offset-1",
        lg: "focus-visible:ring-offset-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface FocusRingProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof focusRingVariants> {}

/**
 * Focus ring component to visually indicate focus state
 */
export function FocusRing({ className, variant, size, ...props }: FocusRingProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsFocused(true);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
    <div 
      className={cn(
        focusRingVariants({ variant, size, className }),
        isFocused ? 'focus-visible' : ''
      )}
      tabIndex={0}
      {...props}
    />
  );
}

/**
 * A component to check the contrast ratio between two colors
 * and display WCAG 2.0 compliance details
 */
interface ContrastCheckerProps {
  foreground: string;
  background: string;
  fontSize?: 'small' | 'large';
  children?: React.ReactNode;
  className?: string;
}

export function ContrastChecker({
  foreground,
  background,
  fontSize = 'small',
  children,
  className,
}: ContrastCheckerProps) {
  const { contrast, compliance } = useContrastCheck(foreground, background);
  const isLargeText = fontSize === 'large';
  
  return (
    <div 
      className={cn(
        "p-4 rounded-md border", 
        className
      )}
      style={{ color: foreground, backgroundColor: background }}
    >
      <div className="flex flex-col gap-2">
        {children && <div className="mb-4">{children}</div>}
        
        <div className="flex justify-between items-center text-sm">
          <span>Contrast Ratio:</span>
          <span className="font-mono font-bold">{contrast.toFixed(2)}:1</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span>WCAG AA:</span>
          <span>
            {isLargeText ? (
              compliance.AA.large ? "✓ Pass" : "✗ Fail"
            ) : (
              compliance.AA.normal ? "✓ Pass" : "✗ Fail"
            )}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span>WCAG AAA:</span>
          <span>
            {isLargeText ? (
              compliance.AAA.large ? "✓ Pass" : "✗ Fail"
            ) : (
              compliance.AAA.normal ? "✓ Pass" : "✗ Fail"
            )}
          </span>
        </div>
      </div>
    </div>
  );
}