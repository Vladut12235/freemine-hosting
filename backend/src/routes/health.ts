import { Router } from 'express';

export const router = Router();

router.get('/', (_req, res) => {
  res.json({ ok: true, message: 'Health check ok' });
});

router.get('/ready', (_req, res) => {
  res.json({ ok: true, checks: ['database', 'redis', 'docker'] });
});
