import { z } from 'zod';

export const PlanSchema = z.object({
  code: z.string(),
  name: z.string(),
  price: z.number(),
  ramGb: z.number(),
  cpuCores: z.number(),
  storageGb: z.number(),
  maxServers: z.number(),
  maxPorts: z.number(),
  backups: z.number(),
  databases: z.number(),
  priority: z.string(),
  isFree: z.boolean().optional(),
});

export type CreateServerInput = {
  name: string;
  version: string;
  software: 'paper' | 'vanilla';
  ramGb: number;
  cpuCores: number;
  storageGb: number;
  port: number;
  planCode: string;
};

export const createServerSchema = z.object({
  name: z.string().min(3).max(64),
  version: z.string().min(1).max(32),
  software: z.enum(['paper', 'vanilla']),
  ramGb: z.number().int().positive(),
  cpuCores: z.number().int().positive(),
  storageGb: z.number().int().positive(),
  port: z.number().int().positive(),
  planCode: z.string(),
});
