import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Keep existing tables
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  maxCapacity: integer("max_capacity").notNull().default(100),
  currentRegistrations: integer("current_registrations").notNull().default(0),
});

// Add event registrations table
export const eventRegistrations = pgTable("event_registrations", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull(),
  userId: integer("user_id").notNull(),
  registrationDate: timestamp("registration_date").notNull().defaultNow(),
  attended: boolean("attended").notNull().default(false),
  feedbackSubmitted: boolean("feedback_submitted").notNull().default(false),
});

// Keep existing tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("member"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  imageUrl: text("image_url").notNull(),
  bio: text("bio").notNull(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
});

export const recruitmentApplications = pgTable("recruitment_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  regNumber: text("reg_number").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  branch: text("branch").notNull(),
  semester: text("semester").notNull(),
  team: text("team").notNull(),
  whyJoin: text("why_join").notNull(),
  experience: text("experience").notNull(),
  resumeUrl: text("resume_url").notNull(),
  submitDate: timestamp("submit_date").notNull().defaultNow(),
});

export const teams = {
  TECH: "TechX Team",
  EVENT: "EventX Team",
  PR: "PR & Outreach Team",
  FINANCE: "Finance Team",
  SOCIAL: "SocialX Team",
} as const;

export const newsItems = pgTable("news_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  source: text("source").notNull(),
  sourceUrl: text("source_url").notNull(),
  publishDate: timestamp("publish_date").notNull(),
  imageUrl: text("image_url"),
});

// Add auth-related schemas
export const insertUserSchema = createInsertSchema(users)
  .omit({ id: true, role: true, createdAt: true })
  .extend({
    password: z.string().min(8, "Password must be at least 8 characters"),
    email: z.string().email("Invalid email").endsWith("srmist.edu.in", "Must use SRM email"),
  });

export const insertEventSchema = createInsertSchema(events)
  .omit({ id: true, currentRegistrations: true })
  .extend({
    maxCapacity: z.number().min(1, "Capacity must be at least 1"),
  });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({ id: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true });
export const insertRecruitmentApplicationSchema = createInsertSchema(recruitmentApplications)
  .omit({ id: true, submitDate: true })
  .extend({
    team: z.enum([
      teams.TECH,
      teams.EVENT,
      teams.PR,
      teams.FINANCE,
      teams.SOCIAL,
    ]),
    semester: z.string().min(1, "Semester is required"),
    regNumber: z.string().min(1, "Registration number is required"),
    email: z.string().email("Invalid email address").endsWith("srmist.edu.in", "Must use SRM email"),
    phone: z.string().min(10, "Invalid phone number"),
    resumeUrl: z.string().url("Invalid resume URL"),
  });
export const insertNewsItemSchema = createInsertSchema(newsItems).omit({ id: true });
export const insertEventRegistrationSchema = createInsertSchema(eventRegistrations)
  .omit({ id: true, registrationDate: true, attended: true, feedbackSubmitted: true });

// Add User type
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Event = typeof events.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type RecruitmentApplication = typeof recruitmentApplications.$inferSelect;
export type NewsItem = typeof newsItems.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type InsertRecruitmentApplication = z.infer<typeof insertRecruitmentApplicationSchema>;
export type InsertNewsItem = z.infer<typeof insertNewsItemSchema>;
export type EventRegistration = typeof eventRegistrations.$inferSelect;
export type InsertEventRegistration = z.infer<typeof insertEventRegistrationSchema>;