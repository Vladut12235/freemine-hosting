import 'dotenv/config';
import express from 'express';

const app = express();
const port = Number(process.env.PORT || 4100);

app.get('/health', (_req, res) => {
  res.json({ ok: true, node: 'NODE-01', status: 'online' });
});

app.listen(port, () => console.log(`Node agent listening on ${port}`));
