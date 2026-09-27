import { Router } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const registerSchema = z.object({
  username: z.string().min(3).max(32),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const router = Router();

router.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid registration payload.' });
  }

  const { username, email, password, confirmPassword } = parsed.data;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  const passwordHash = await argon2.hash(password);

  return res.status(201).json({
    user: {
      username,
      email,
      passwordHash,
    },
    message: 'User registered successfully.',
  });
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid login payload.' });
  }

  const { email, password } = parsed.data;
  const passwordHash = await argon2.hash(password);
  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });

  return res.json({ token, user: { email, passwordHash }, message: 'Logged in.' });
});

router.post('/logout', (_req, res) => {
  res.json({ message: 'Logged out.' });
});

router.get('/me', (_req, res) => {
  res.json({ user: { id: 'user-1', username: 'demo-user', email: 'demo@freemine.test' } });
});
