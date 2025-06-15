import { Connectors } from 'shoukaku';
import { Kazagumo, Plugins } from 'kazagumo';
import 'dotenv/config';

const node = [
  {
    name: 'Main Node',
    url: process.env.LAVALINK_URL,
    auth: process.env.LAVALINK_AUTH,
    secure: true,
  },
];

function create(client) {
  const kazagumo = new Kazagumo(
    {
      defaultSearchEngine: 'youtube',
      plugins: [new Plugins.PlayerMoved(client)],
      send: (guildId, payload) => {
        const guild = client.guilds.cache.get(guildId);
        if (guild) {
          guild.shard.send(payload);
        }
      },
    },
    new Connectors.DiscordJS(client),
    node
  );
  client.kazagumo = kazagumo;
}

export { create };
