import { 
  type Event,
  type TeamMember,
  type NewsItem,
  type InsertContactMessage,
  type InsertSubscriber,
  type InsertRecruitmentApplication,
  type InsertEventRegistration
} from '@shared/schema';

// Reusable fetch function with error handling
async function fetchApi<T>(
  endpoint: string, 
  options?: RequestInit
): Promise<T> {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
}

// Event-related API calls
export async function fetchEvents(): Promise<Event[]> {
  return fetchApi<Event[]>('/api/events');
}

export async function fetchEvent(id: number): Promise<Event> {
  return fetchApi<Event>(`/api/events/${id}`);
}

export async function registerForEvent(
  eventId: number, 
  data: { userId: number }
): Promise<any> {
  const registration: InsertEventRegistration = {
    eventId,
    userId: data.userId,
  };

  return fetchApi(`/api/events/${eventId}/register`, {
    method: 'POST',
    body: JSON.stringify(registration),
  });
}

// Team-related API calls
export async function fetchTeamMembers(): Promise<TeamMember[]> {
  return fetchApi<TeamMember[]>('/api/team');
}

// News-related API calls
export async function fetchNewsItems(): Promise<NewsItem[]> {
  return fetchApi<NewsItem[]>('/api/news');
}

// Contact-related API calls
export async function submitContactMessage(
  message: InsertContactMessage
): Promise<any> {
  return fetchApi('/api/contact', {
    method: 'POST',
    body: JSON.stringify(message),
  });
}

// Newsletter subscription
export async function postSubscriber(
  subscriber: InsertSubscriber
): Promise<any> {
  return fetchApi('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscriber),
  });
}

// Recruitment application
export async function submitRecruitmentApplication(
  application: InsertRecruitmentApplication
): Promise<any> {
  return fetchApi('/api/join', {
    method: 'POST',
    body: JSON.stringify(application),
  });
}
