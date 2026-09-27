import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { router as healthRoutes } from './routes/health.js';
import { router as authRoutes } from './routes/auth.js';
import { router as plansRoutes } from './routes/plans.js';
import { router as serversRoutes } from './routes/servers.js';
import { router as nodesRoutes } from './routes/nodes.js';
import { router as paymentRoutes } from './routes/payments.js';

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));

app.use('/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/servers', serversRoutes);
app.use('/api/nodes', nodesRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/api', (_req, res) => {
  res.json({ name: 'FreeMine Hosting API', version: '1.0.0' });
});

const httpServer = createServer(app);
const wsServer = new WebSocketServer({ server: httpServer, path: '/ws' });

wsServer.on('connection', (socket) => {
  socket.send(JSON.stringify({ type: 'server.status', payload: { status: 'connected' } }));
});

httpServer.listen(port, () => {
  console.log(`FreeMine backend listening on ${port}`);
});
