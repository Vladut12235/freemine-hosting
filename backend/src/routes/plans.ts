import { Router } from 'express';
import { PLAN_LIST } from '../../../shared/index.js';

export const router = Router();

router.get('/', (_req, res) => {
  res.json({ plans: PLAN_LIST });
});
