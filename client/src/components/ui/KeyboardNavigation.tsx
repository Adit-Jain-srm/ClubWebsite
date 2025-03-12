import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback, useRef } from 'react';

interface KeyboardNavigationContextProps {
  isUsingKeyboard: boolean;
  focusVisible: boolean;
  registerKeyHandler: (key: string, handler: () => void) => () => void;
}

const defaultContext: KeyboardNavigationContextProps = {
  isUsingKeyboard: false,
  focusVisible: false,
  registerKeyHandler: () => () => {},
};

// Create context
const KeyboardNavigationContext = createContext<KeyboardNavigationContextProps>(defaultContext);

/**
 * Custom hook to access keyboard navigation state and features
 */
export function useKeyboardNavigation() {
  const context = useContext(KeyboardNavigationContext);
  if (!context) {
    throw new Error('useKeyboardNavigation must be used within a KeyboardNavigation provider');
  }
  return context;
}

interface KeyboardNavigationProps {
  children: ReactNode;
}

/**
 * Provider component that tracks keyboard navigation state and provides utilities
 * for keyboard navigation throughout the application
 */
export function KeyboardNavigation({ children }: KeyboardNavigationProps) {
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const keyHandlersRef = useRef<Map<string, Set<() => void>>>(new Map());

  // Handle registering keyboard shortcuts
  const registerKeyHandler = useCallback((key: string, handler: () => void) => {
    const normalizedKey = key.toLowerCase();
    if (!keyHandlersRef.current.has(normalizedKey)) {
      keyHandlersRef.current.set(normalizedKey, new Set());
    }
    
    keyHandlersRef.current.get(normalizedKey)?.add(handler);
    
    return () => {
      const handlers = keyHandlersRef.current.get(normalizedKey);
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          keyHandlersRef.current.delete(normalizedKey);
        }
      }
    };
  }, []);

  useEffect(() => {
    // Track keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Set keyboard navigation mode
      if (!isUsingKeyboard) {
        setIsUsingKeyboard(true);
        document.body.classList.add('using-keyboard');
      }
      
      // Set focus visibility on Tab key
      if (e.key === 'Tab') {
        setFocusVisible(true);
        document.body.classList.add('focus-visible');
      }
      
      // Execute registered handlers for the pressed key
      const key = e.key.toLowerCase();
      const handlers = keyHandlersRef.current.get(key);
      if (handlers) {
        handlers.forEach(handler => handler());
      }
    };
    
    // Track mouse usage to disable keyboard navigation mode
    const handleFocusIn = (e: FocusEvent) => {
      if (isUsingKeyboard) {
        // Add focus-visible class to the target element
        (e.target as HTMLElement)?.classList?.add('focus-visible');
      }
    };
    
    const handleFocusOut = (e: FocusEvent) => {
      // Remove focus-visible class from the target element
      (e.target as HTMLElement)?.classList?.remove('focus-visible');
    };
    
    // Track mouse interactions
    const handleMouseDown = () => {
      if (isUsingKeyboard) {
        setIsUsingKeyboard(false);
        setFocusVisible(false);
        document.body.classList.remove('using-keyboard');
        document.body.classList.remove('focus-visible');
      }
    };
    
    // Help dialog for keyboard shortcuts (triggered by pressing ?)
    const keyboardShortcutsHelp = (e: KeyboardEvent) => {
      if (e.key === '?' && isUsingKeyboard) {
        // Prevent default behavior of ? key
        e.preventDefault();
        
        // Show keyboard shortcuts dialog - simple implementation
        alert('Keyboard Shortcuts:\n\n' +
              'Tab: Navigate between elements\n' +
              'Enter/Space: Activate focused element\n' +
              'Esc: Close dialogs or menus\n' +
              'W: Toggle WhatsApp invite panel\n' +
              'Q: Toggle QR code in WhatsApp panel\n' +
              '?: Show this help dialog');
      }
    };
    
    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    document.addEventListener('keydown', keyboardShortcutsHelp);
    
    // Apply initial keyboard navigation mode class to body
    if (isUsingKeyboard) {
      document.body.classList.add('using-keyboard');
    } else {
      document.body.classList.remove('using-keyboard');
    }
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      document.removeEventListener('keydown', keyboardShortcutsHelp);
    };
  }, [isUsingKeyboard]);
  
  // Provide context
  const contextValue: KeyboardNavigationContextProps = {
    isUsingKeyboard,
    focusVisible,
    registerKeyHandler,
  };
  
  return (
    <KeyboardNavigationContext.Provider value={contextValue}>
      {children}
    </KeyboardNavigationContext.Provider>
  );
}