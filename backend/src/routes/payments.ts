import { Router } from 'express';
import { z } from 'zod';

const paymentSchema = z.object({
  userId: z.string(),
  planCode: z.string(),
  amount: z.number().positive(),
  provider: z.enum(['stripe', 'paypal']),
});

export const router = Router();

router.post('/', (req, res) => {
  const parsed = paymentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Payment payload invalid.' });
  }

  res.status(201).json({
    status: 'pending',
    paymentId: 'pay_123',
    provider: parsed.data.provider,
    amount: parsed.data.amount,
    message: 'Payment created successfully.',
  });
});

router.post('/webhook', (_req, res) => {
  res.json({ received: true, message: 'Webhook acknowledged.' });
});
