import { Router } from 'express';

export const router = Router();

router.get('/', (_req, res) => {
  res.json({ nodes: [{ id: 'node-01', name: 'NODE-01', status: 'online', cpuUsed: 34, ramUsedGb: 82, storageUsedGb: 1200 }] });
});

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'NODE-01', status: 'online', cpuUsed: 34, ramUsedGb: 82 });
});
