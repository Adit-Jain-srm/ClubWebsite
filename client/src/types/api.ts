import { 
  events, 
  teamMembers, 
  subscribers, 
  contactMessages, 
  recruitmentApplications, 
  newsItems,
  eventRegistrations
} from "@shared/schema";

export type Event = typeof events.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type RecruitmentApplication = typeof recruitmentApplications.$inferSelect;
export type NewsItem = typeof newsItems.$inferSelect;
export type EventRegistration = typeof eventRegistrations.$inferSelect;
