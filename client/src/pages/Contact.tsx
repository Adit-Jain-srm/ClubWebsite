import { ContactForm } from '@/components/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Contact() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions about AI Nexus Club or interested in collaborating? We'd love to hear from you. Reach out using the form below or through our contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <ContactForm />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mt-1 mr-3 text-primary" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <address className="not-italic text-muted-foreground">
                    AI Nexus Club<br />
                    Department of CSE-AIML<br />
                    SRM University<br />
                    Kattankulathur, Chennai<br />
                    Tamil Nadu 603203
                  </address>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 mt-1 mr-3 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">ainexusclub@srmist.edu.in</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 mt-1 mr-3 text-primary" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+91 9876543210</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Office Hours</h2>
            <table className="min-w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">Monday - Friday</td>
                  <td className="py-2 text-right">9:00 AM - 5:00 PM</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Saturday</td>
                  <td className="py-2 text-right">10:00 AM - 2:00 PM</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Sunday</td>
                  <td className="py-2 text-right">Closed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Connect With Us</h2>
            <p className="mb-4 text-muted-foreground">
              Follow us on social media to stay updated with our latest events, workshops, and announcements.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="p-2 bg-card rounded-md hover:bg-primary/10 transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.48 0-.237-.009-.866-.014-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.09-.647.349-1.086.635-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.58 9.58 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.167 22 16.42 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/></svg>
              </a>
              <a href="https://instagram.com" className="p-2 bg-card rounded-md hover:bg-primary/10 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.352-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.181.466.399.8.748 1.15.35.35.683.566 1.15.748.352.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.986-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.352.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.352-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.469a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" fill="currentColor"/></svg>
              </a>
              <a href="https://linkedin.com" className="p-2 bg-card rounded-md hover:bg-primary/10 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" fill="currentColor"/></svg>
              </a>
              <a href="https://twitter.com" className="p-2 bg-card rounded-md hover:bg-primary/10 transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 5.897c-.75.33-1.5.577-2.333.66A4.4 4.4 0 0021.5 4.33c-.833.495-1.75.825-2.667 1.073a4.4 4.4 0 00-7.5 4.007A12.5 12.5 0 013 4.82a4.4 4.4 0 001.333 5.862 4.4 4.4 0 01-2-.547v.054a4.4 4.4 0 003.5 4.315 4.4 4.4 0 01-2 .074 4.4 4.4 0 004.167 3.055 8.8 8.8 0 01-5.5 1.925c-.333 0-.667-.027-1-.063a12.5 12.5 0 006.667 1.925c8 0 12.333-6.582 12.333-12.331 0-.165 0-.33-.011-.495A8.5 8.5 0 0022 5.897z" fill="currentColor"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
