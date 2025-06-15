import { Message } from 'discord.js';
import { Kazagumo } from 'kazagumo';

export default {
  name: 'volumen',
  description: 'Cambia el volumen de la música actual',
  aliases: ['vol', 'v'],
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
      if (args.length === 0) {
        return message.reply(
          `El volumen actual es ${player.volume}. Usa \`..volumen <número>\` para cambiarlo.`
        );
      } else {
        const volumen = parseInt(args[0], 10);
        if (isNaN(volumen) || volumen < 1 || volumen > 100) {
          return message.reply(
            'Debes ingresar un número de volumen entre 1 y 100.'
          );
        }
        player.setVolume(volumen);
        message.reply(`Volumen establecido a ${volumen}.`);
      }
    }
  },
};
