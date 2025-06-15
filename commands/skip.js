import { Message } from 'discord.js';
import { Kazagumo } from 'kazagumo';

export default {
  name: 'skip',
  description: 'Salta la canción actual en reproducción',
  aliases: ['s', 'next'],
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
      player.skip();
    }
  },
};
