import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

const token = process.env.DISCORD_BOT_TOKEN;

if (!token) {
  console.warn('DISCORD_BOT_TOKEN is not set. Bot will not start.');
  process.exit(0);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Discord bot ready: ${client.user?.tag}`);
});

client.login(token).catch((error) => {
  console.error('Discord login failed', error);
});
