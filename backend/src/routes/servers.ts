import { Router } from 'express';
import { z } from 'zod';
import { canCreateServer } from '../lib/resourceAllocator.js';

const createServerSchema = z.object({
  name: z.string().min(3),
  version: z.string().min(1),
  software: z.enum(['paper', 'vanilla']),
  ramGb: z.number().int().positive(),
  cpuCores: z.number().int().positive(),
  storageGb: z.number().int().positive(),
  port: z.number().int().positive(),
  planCode: z.string(),
});

export const router = Router();

router.get('/', (_req, res) => {
  res.json({ servers: [{ id: 'srv-demo', name: 'Test Server', status: 'online' }] });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, name: 'Demo Server', status: 'online', players: 5, tps: 19.98 });
});

router.post('/', (req, res) => {
  const parsed = createServerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid server payload.' });
  }

  const { planCode, ramGb, cpuCores, storageGb, port } = parsed.data;
  const check = canCreateServer(planCode as any, { ramGb, cpuCores, storageGb, ports: 1 });

  if (!check.allowed) {
    return res.status(400).json({ message: 'Insufficient node resources.' });
  }

  res.status(201).json({
    message: 'Server creation queued.',
    server: {
      id: 'srv-1',
      name: parsed.data.name,
      version: parsed.data.version,
      software: parsed.data.software,
      status: 'installing',
      port,
      ramGb,
      cpuCores,
      storageGb,
    },
  });
});

router.delete('/:id', (req, res) => {
  res.json({ message: `Server ${req.params.id} scheduled for deletion.` });
});
