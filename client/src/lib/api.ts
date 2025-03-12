import { type Event, type TeamMember, type NewsItem } from "@shared/schema";

// Base URL for API requests
const API_BASE_URL = "/api";

// Helper function for handling API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `Error: ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
}

// Events API
export async function fetchEvents(): Promise<Event[]> {
  const response = await fetch(`${API_BASE_URL}/events`);
  return handleResponse<Event[]>(response);
}

export async function fetchEvent(id: number): Promise<Event> {
  const response = await fetch(`${API_BASE_URL}/events/${id}`);
  return handleResponse<Event>(response);
}

export async function createEvent(eventData: Omit<Event, "id" | "currentRegistrations">): Promise<Event> {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  return handleResponse<Event>(response);
}

export async function registerForEvent(eventId: number, registrationData: { userId: number }): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  });
  return handleResponse<any>(response);
}

export async function fetchEventRegistrations(eventId: number): Promise<any[]> {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/registrations`);
  return handleResponse<any[]>(response);
}

export async function updateEventAttendance(registrationId: number, attended: boolean): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/events/registrations/${registrationId}/attendance`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ attended }),
  });
  return handleResponse<any>(response);
}

// Team Members API
export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const response = await fetch(`${API_BASE_URL}/team`);
  return handleResponse<TeamMember[]>(response);
}

// Newsletter Subscription API
export async function subscribeToNewsletter(data: { email: string }): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse<any>(response);
}

// Contact Form API
export async function sendContactMessage(data: { name: string; email: string; message: string }): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse<any>(response);
}

// Recruitment Application API
export async function submitRecruitmentApplication(data: {
  name: string;
  regNumber: string;
  email: string;
  phone: string;
  branch: string;
  semester: string;
  team: string;
  whyJoin: string;
  experience: string;
  resumeUrl: string;
}): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse<any>(response);
}

// News Items API
export async function fetchNewsItems(): Promise<NewsItem[]> {
  const response = await fetch(`${API_BASE_URL}/news`);
  return handleResponse<NewsItem[]>(response);
}

export async function createNewsItem(data: Omit<NewsItem, "id">): Promise<NewsItem> {
  const response = await fetch(`${API_BASE_URL}/news`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse<NewsItem>(response);
}
