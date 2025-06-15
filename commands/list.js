import { Message } from 'discord.js';
import { Kazagumo } from 'kazagumo';

export default {
  name: 'list',
  description: 'Retorna la lista de reproducción actual',
  aliases: ['playlist', 'queue', 'q', 'l'],
  /**
   * @param {Message} message
   * @param {string[]} args
   * @param {Kazagumo} kazagumo
   */
  async execute(message, args, kazagumo = message.client.kazagumo) {
    const { member, channel, guild, author } = message;

    const player = kazagumo.getPlayer(guild.id);
    if (!player) {
      return message.reply('No hay música reproduciéndose en este momento.');
    } else {
      if (player.queue.size === 0) {
        return message.reply('La lista de reproducción está vacía.');
      }

      const queueList = player.queue
        .map((track, index) => {
          return `${index + 1}. ${track.title} - ${track.requester.username}`;
        })
        .join('\n');

      return message.reply(`**Lista de reproducción actual:**\n${queueList}`);
    }
  },
};
