import { 
  insertSubscriberSchema,
  insertContactMessageSchema,
  insertRecruitmentApplicationSchema,
  insertEventRegistrationSchema,
  type Event,
  type TeamMember,
  type NewsItem,
  type Subscriber,
  type ContactMessage,
  type RecruitmentApplication,
  type EventRegistration
} from '@shared/schema';
import { z } from 'zod';

// API Base URL
const API_BASE_URL = '/api';

// Helper function for making API requests
async function fetchAPI<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `HTTP error ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
}

// Events
export async function getEvents(): Promise<Event[]> {
  return fetchAPI<Event[]>('/events');
}

export async function getEvent(id: number): Promise<Event> {
  return fetchAPI<Event>(`/events/${id}`);
}

// Event Registrations
export async function getEventRegistrations(eventId: number): Promise<EventRegistration[]> {
  return fetchAPI<EventRegistration[]>(`/events/${eventId}/registrations`);
}

export async function registerForEvent(
  eventId: number, 
  data: Omit<z.infer<typeof insertEventRegistrationSchema>, 'eventId'>
): Promise<EventRegistration> {
  return fetchAPI<EventRegistration>(`/events/${eventId}/register`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateAttendance(
  registrationId: number, 
  attended: boolean
): Promise<EventRegistration> {
  return fetchAPI<EventRegistration>(`/events/registrations/${registrationId}/attendance`, {
    method: 'PATCH',
    body: JSON.stringify({ attended })
  });
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  return fetchAPI<TeamMember[]>('/team');
}

// Newsletter Subscription
export async function subscribeToNewsletter(
  data: z.infer<typeof insertSubscriberSchema>
): Promise<Subscriber> {
  return fetchAPI<Subscriber>('/subscribe', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

// Contact Form
export async function sendContactMessage(
  data: z.infer<typeof insertContactMessageSchema>
): Promise<ContactMessage> {
  return fetchAPI<ContactMessage>('/contact', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

// Recruitment Applications
export async function submitRecruitmentApplication(
  data: z.infer<typeof insertRecruitmentApplicationSchema>
): Promise<RecruitmentApplication> {
  return fetchAPI<RecruitmentApplication>('/join', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

// News Items
export async function getNewsItems(): Promise<NewsItem[]> {
  return fetchAPI<NewsItem[]>('/news');
}
