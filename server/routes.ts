import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConfessionResponseSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a response
  app.post("/api/confession/response", async (req: Request, res: Response) => {
    try {
      const data = insertConfessionResponseSchema.parse({
        result: req.body.response
      });
      
      const response = await storage.createResponse(data);
      
      res.status(201).json({ success: true, data: response });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, error: validationError.message });
      } else {
        res.status(500).json({ success: false, error: "Internal server error" });
      }
    }
  });

  // Get all responses with statistics
  app.get("/api/confession/results", async (_req: Request, res: Response) => {
    try {
      const responses = await storage.getResponses();
      const counts = await storage.getResponseCounts();
      
      res.json({
        success: true,
        ...counts,
        responses
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // Check if there's a result already (for returning users)
  app.get("/api/confession/check-result", async (_req: Request, res: Response) => {
    try {
      const latestResponse = await storage.getLatestResponse();
      
      if (latestResponse) {
        res.json({
          success: true,
          result: latestResponse.result,
          timestamp: latestResponse.timestamp
        });
      } else {
        res.json({
          success: true,
          result: null
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
