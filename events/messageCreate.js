import { Events } from 'discord.js';

const PREFIX = process.env.PREFIX || '..';

export default {
  name: Events.MessageCreate,
  /**
   * @param {import('discord.js').Message} message
   * @param {import('discord.js').Client} client
   */
  async execute(message, client) {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => Array.isArray(cmd.aliases) && cmd.aliases.includes(commandName)
      );
    if (!command) return;

    try {
      await command.execute(message, args, client.kazagumo);
    } catch (error) {
      console.error(error);
      message.reply('Hubo un error al ejecutar el comando.');
    }
  },
};
