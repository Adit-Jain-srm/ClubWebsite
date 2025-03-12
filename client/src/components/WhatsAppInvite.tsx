import React, { useState, useEffect, useRef } from 'react';
import { useKeyboardNavigation } from './ui/KeyboardNavigation';
import { FaWhatsapp, FaQrcode as FaQrCode, FaTimes } from 'react-icons/fa';
import QRCode from 'react-qr-code';

interface WhatsAppInviteProps {
  groupLink: string;
}

export function WhatsAppInvite({ groupLink }: WhatsAppInviteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { registerKeyHandler } = useKeyboardNavigation();
  
  // Toggle panel with W key
  useEffect(() => {
    const unregister = registerKeyHandler('w', () => {
      setIsOpen(prev => !prev);
    });
    
    return unregister;
  }, [registerKeyHandler]);
  
  // Toggle QR code with Q key
  useEffect(() => {
    const unregister = registerKeyHandler('q', () => {
      if (isOpen) {
        setShowQR(prev => !prev);
      }
    });
    
    return unregister;
  }, [registerKeyHandler, isOpen]);
  
  // Close panel with Escape key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen]);
  
  // Handle click outside to close panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <>
      {/* WhatsApp button that floats at the bottom right */}
      <button
        aria-label="Join WhatsApp Group"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 p-4 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        <FaWhatsapp size={24} />
      </button>
      
      {/* Slide-in panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed right-0 bottom-0 z-40 w-full sm:w-96 bg-white dark:bg-gray-800 shadow-xl rounded-t-xl p-6 transform transition-transform duration-300 animate-slide-up"
          aria-modal="true"
          role="dialog"
          aria-labelledby="whatsapp-panel-title"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 id="whatsapp-panel-title" className="text-xl font-semibold flex items-center text-green-600 dark:text-green-400">
              <FaWhatsapp className="mr-2" />
              Join AI Nexus WhatsApp Group
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close panel"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full"
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Stay updated with the latest events, discussions, and announcements by joining our WhatsApp group.
          </p>
          
          {showQR ? (
            <div className="flex flex-col items-center mb-6">
              <div className="bg-white p-4 rounded-lg mb-4">
                <QRCode value={groupLink} size={200} />
              </div>
              <button
                onClick={() => setShowQR(false)}
                className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
              >
                Hide QR Code
              </button>
            </div>
          ) : (
            <div className="mb-6 flex justify-center">
              <button
                onClick={() => setShowQR(true)}
                className="flex items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <FaQrCode className="mr-2" />
                Show QR Code
              </button>
            </div>
          )}
          
          <div className="flex flex-col gap-4">
            <a
              href={groupLink}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              <FaWhatsapp className="mr-2" size={20} />
              Join Group
            </a>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              <p>Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono">W</kbd> to toggle this panel</p>
              <p>Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono">Q</kbd> to toggle QR code</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity"
          aria-hidden="true"
        />
      )}
    </>
  );
}