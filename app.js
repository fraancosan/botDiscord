import 'dotenv/config';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { create } from './utils/musicHandler.js';
import { commandHandler } from './utils/commandHandler.js';
import { eventHandler } from './utils/eventHandler.js';

const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Crear instancia de Kazagumo
create(client);

client.commands = new Collection();

commandHandler(client);
await eventHandler(client);

client.login(TOKEN);
