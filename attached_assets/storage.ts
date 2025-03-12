import {
  type Event,
  type TeamMember,
  type Subscriber,
  type ContactMessage,
  type RecruitmentApplication,
  type NewsItem,
  type EventRegistration,
  type InsertEvent,
  type InsertTeamMember,
  type InsertSubscriber,
  type InsertContactMessage,
  type InsertRecruitmentApplication,
  type InsertNewsItem,
  type InsertEventRegistration,
} from "@shared/schema";

export interface IStorage {
  // Events
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;

  // Event Registrations
  getEventRegistrations(eventId: number): Promise<EventRegistration[]>;
  getEventRegistration(eventId: number, userId: number): Promise<EventRegistration | undefined>;
  createEventRegistration(registration: InsertEventRegistration): Promise<EventRegistration>;
  updateEventAttendance(id: number, attended: boolean): Promise<EventRegistration>;

  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;

  // Newsletter Subscribers
  getSubscribers(): Promise<Subscriber[]>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;

  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;

  // Recruitment Applications
  getRecruitmentApplications(): Promise<RecruitmentApplication[]>;
  createRecruitmentApplication(application: InsertRecruitmentApplication): Promise<RecruitmentApplication>;

  // News Items
  getNewsItems(): Promise<NewsItem[]>;
  createNewsItem(newsItem: InsertNewsItem): Promise<NewsItem>;
}

export class MemStorage implements IStorage {
  private events: Map<number, Event>;
  private teamMembers: Map<number, TeamMember>;
  private subscribers: Map<number, Subscriber>;
  private contactMessages: Map<number, ContactMessage>;
  private recruitmentApplications: Map<number, RecruitmentApplication>;
  private newsItems: Map<number, NewsItem>;
  private eventRegistrations: Map<number, EventRegistration>;
  private currentIds: {
    events: number;
    teamMembers: number;
    subscribers: number;
    contactMessages: number;
    recruitmentApplications: number;
    newsItems: number;
    eventRegistrations: number;
  };

  constructor() {
    this.events = new Map();
    this.teamMembers = new Map();
    this.subscribers = new Map();
    this.contactMessages = new Map();
    this.recruitmentApplications = new Map();
    this.newsItems = new Map();
    this.eventRegistrations = new Map();
    this.currentIds = {
      events: 1,
      teamMembers: 1,
      subscribers: 1,
      contactMessages: 1,
      recruitmentApplications: 1,
      newsItems: 1,
      eventRegistrations: 1,
    };

    // Initialize with sample team members and news
    this.initializeTeamMembers();
    this.initializeNewsItems();
  }

  private initializeTeamMembers() {
    const defaultMembers: InsertTeamMember[] = [
      {
        name: "Dr. Avneesh Vashistha",
        role: "Head of Department",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mentor",
        bio: "HOD and Club Mentor, guiding the next generation of AI innovators.",
      },
      {
        name: "Shruthy Govindan",
        role: "Faculty Coordinator",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=coordinator",
        bio: "Faculty Coordinator of AI Nexus Club, CSE-AIML Department.",
      },
      {
        name: "Adit Jain",
        role: "President",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=president",
        bio: "Leading the club's initiatives and fostering innovation in AI.",
      },
      {
        name: "Mehir Singh",
        role: "Vice President",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=vp",
        bio: "Supporting club operations and driving technical excellence.",
      },
      {
        name: "Vasvi Singla",
        role: "Secretary",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=secretary",
        bio: "Managing club communications and event coordination.",
      },
    ];

    defaultMembers.forEach((member) => {
      this.createTeamMember(member);
    });
  }

  private initializeNewsItems() {
    const defaultNews: InsertNewsItem[] = [
      {
        title: "OpenAI Announces GPT-5",
        content: "OpenAI has unveiled GPT-5, featuring enhanced reasoning capabilities and improved factual accuracy.",
        source: "OpenAI Blog",
        sourceUrl: "https://openai.com/blog",
        publishDate: new Date(),
        imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=gpt5",
      },
      {
        title: "Google DeepMind's Latest Breakthrough",
        content: "DeepMind researchers achieve significant progress in protein structure prediction.",
        source: "Google AI Blog",
        sourceUrl: "https://ai.googleblog.com",
        publishDate: new Date(),
        imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=deepmind",
      },
    ];

    defaultNews.forEach((news) => {
      this.createNewsItem(news);
    });
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentIds.events++;
    const event = { 
      ...insertEvent, 
      id, 
      currentRegistrations: 0 
    };
    this.events.set(id, event);
    return event;
  }

  // Event Registrations
  async getEventRegistrations(eventId: number): Promise<EventRegistration[]> {
    return Array.from(this.eventRegistrations.values())
      .filter(reg => reg.eventId === eventId);
  }

  async getEventRegistration(eventId: number, userId: number): Promise<EventRegistration | undefined> {
    return Array.from(this.eventRegistrations.values())
      .find(reg => reg.eventId === eventId && reg.userId === userId);
  }

  async createEventRegistration(insertRegistration: InsertEventRegistration): Promise<EventRegistration> {
    const event = await this.getEvent(insertRegistration.eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    if (event.currentRegistrations >= event.maxCapacity) {
      throw new Error("Event is at full capacity");
    }

    const id = this.currentIds.eventRegistrations++;
    const registration = {
      ...insertRegistration,
      id,
      registrationDate: new Date(),
      attended: false,
      feedbackSubmitted: false,
    };

    // Update event registration count
    event.currentRegistrations++;
    this.events.set(event.id, event);

    this.eventRegistrations.set(id, registration);
    return registration;
  }

  async updateEventAttendance(id: number, attended: boolean): Promise<EventRegistration> {
    const registration = this.eventRegistrations.get(id);
    if (!registration) {
      throw new Error("Registration not found");
    }

    const updatedRegistration = { ...registration, attended };
    this.eventRegistrations.set(id, updatedRegistration);
    return updatedRegistration;
  }

  // Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentIds.teamMembers++;
    const member = { ...insertMember, id };
    this.teamMembers.set(id, member);
    return member;
  }

  async getSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values());
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentIds.subscribers++;
    const subscriber = { ...insertSubscriber, id };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentIds.contactMessages++;
    const message = { ...insertMessage, id };
    this.contactMessages.set(id, message);
    return message;
  }

  // Recruitment Applications
  async getRecruitmentApplications(): Promise<RecruitmentApplication[]> {
    return Array.from(this.recruitmentApplications.values());
  }

  async createRecruitmentApplication(
    insertApplication: InsertRecruitmentApplication
  ): Promise<RecruitmentApplication> {
    const id = this.currentIds.recruitmentApplications++;
    const application = {
      ...insertApplication,
      id,
      submitDate: new Date(),
    };
    this.recruitmentApplications.set(id, application);
    return application;
  }

  // News Items
  async getNewsItems(): Promise<NewsItem[]> {
    return Array.from(this.newsItems.values());
  }

  async createNewsItem(insertNewsItem: InsertNewsItem): Promise<NewsItem> {
    const id = this.currentIds.newsItems++;
    const newsItem = { ...insertNewsItem, id };
    this.newsItems.set(id, newsItem);
    return newsItem;
  }
}

export const storage = new MemStorage();