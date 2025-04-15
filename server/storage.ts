import { confessionResponses, type ConfessionResponse, type InsertConfessionResponse } from "@shared/schema";

export interface IStorage {
  getResponses(): Promise<ConfessionResponse[]>;
  getResponseCounts(): Promise<{ total: number; accepted: number; rejected: number }>;
  getLatestResponse(): Promise<ConfessionResponse | undefined>;
  createResponse(response: InsertConfessionResponse): Promise<ConfessionResponse>;
}

export class MemStorage implements IStorage {
  private responses: Map<number, ConfessionResponse>;
  private currentId: number;

  constructor() {
    this.responses = new Map();
    this.currentId = 1;
  }

  async getResponses(): Promise<ConfessionResponse[]> {
    return Array.from(this.responses.values()).sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }

  async getResponseCounts(): Promise<{ total: number; accepted: number; rejected: number }> {
    const responses = Array.from(this.responses.values());
    const total = responses.length;
    const accepted = responses.filter(r => r.result === 'accepted').length;
    const rejected = responses.filter(r => r.result === 'rejected').length;

    return { total, accepted, rejected };
  }

  async getLatestResponse(): Promise<ConfessionResponse | undefined> {
    const responses = await this.getResponses();
    return responses.length > 0 ? responses[0] : undefined;
  }

  async createResponse(insertResponse: InsertConfessionResponse): Promise<ConfessionResponse> {
    const id = this.currentId++;
    const response: ConfessionResponse = {
      ...insertResponse,
      id,
      timestamp: new Date(),
    };
    this.responses.set(id, response);
    return response;
  }
}

export const storage = new MemStorage();
