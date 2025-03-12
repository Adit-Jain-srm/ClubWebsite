import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertEventSchema,
  insertSubscriberSchema,
  insertContactMessageSchema,
  insertRecruitmentApplicationSchema,
  insertNewsItemSchema,
  insertEventRegistrationSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Events
  app.get("/api/events", async (_req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get("/api/events/:id", async (req, res) => {
    const event = await storage.getEvent(Number(req.params.id));
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  });

  app.post("/api/events", async (req, res) => {
    const result = insertEventSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid event data" });
    }
    const event = await storage.createEvent(result.data);
    res.status(201).json(event);
  });

  // Event Registrations
  app.get("/api/events/:id/registrations", async (req, res) => {
    const registrations = await storage.getEventRegistrations(Number(req.params.id));
    res.json(registrations);
  });

  app.post("/api/events/:id/register", async (req, res) => {
    const eventId = Number(req.params.id);
    const result = insertEventRegistrationSchema.safeParse({
      ...req.body,
      eventId,
    });

    if (!result.success) {
      return res.status(400).json({ message: "Invalid registration data" });
    }

    try {
      const registration = await storage.createEventRegistration(result.data);
      res.status(201).json(registration);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.patch("/api/events/registrations/:id/attendance", async (req, res) => {
    const id = Number(req.params.id);
    const { attended } = req.body;

    if (typeof attended !== "boolean") {
      return res.status(400).json({ message: "Invalid attendance data" });
    }

    try {
      const registration = await storage.updateEventAttendance(id, attended);
      res.json(registration);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Team Members
  app.get("/api/team", async (_req, res) => {
    const members = await storage.getTeamMembers();
    res.json(members);
  });

  // Newsletter Subscription
  app.post("/api/subscribe", async (req, res) => {
    const result = insertSubscriberSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid email" });
    }
    try {
      const subscriber = await storage.createSubscriber(result.data);
      res.status(201).json(subscriber);
    } catch (error) {
      res.status(400).json({ message: "Email already subscribed" });
    }
  });

  // Contact Form
  app.post("/api/contact", async (req, res) => {
    const result = insertContactMessageSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid message data" });
    }
    const message = await storage.createContactMessage(result.data);
    res.status(201).json(message);
  });

  // Recruitment Applications
  app.post("/api/join", async (req, res) => {
    const result = insertRecruitmentApplicationSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid application data" });
    }
    const application = await storage.createRecruitmentApplication(result.data);
    res.status(201).json(application);
  });

  // News Items
  app.get("/api/news", async (_req, res) => {
    const news = await storage.getNewsItems();
    res.json(news);
  });

  app.post("/api/news", async (req, res) => {
    const result = insertNewsItemSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid news data" });
    }
    const newsItem = await storage.createNewsItem(result.data);
    res.status(201).json(newsItem);
  });

  const httpServer = createServer(app);
  return httpServer;
}