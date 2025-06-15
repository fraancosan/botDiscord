import { Message } from 'discord.js';
import { Kazagumo } from 'kazagumo';

export default {
  name: 'join',
  description: 'Inicia el bot en el canal de voz',
  aliases: ['j', 'connect'],
  /**
   * @param {Message} message
   * @param {string[]} args
   * @param {Kazagumo} kazagumo
   */
  async execute(message, args, kazagumo = message.client.kazagumo) {
    const { member, channel, guild, author } = message;

    const voiceChannel = member.voice.channel;
    if (!voiceChannel) {
      return message.reply('¡Debes estar en un canal de voz para unirte!');
    }
    if (kazagumo.getPlayer(guild.id)) {
      return message.reply(
        'Ya estoy conectado a un canal de voz en este servidor.'
      );
    }
    try {
      await kazagumo.createPlayer({
        guildId: guild.id,
        textId: channel.id,
        voiceId: voiceChannel.id,
      });
      await message.reply(`Me he unido al canal de voz: ${voiceChannel.name}`);
    } catch (error) {
      console.error('Error al unirse al canal de voz:', error);
      message.reply('Ups! ha ocurrido un error.');
    }
  },
};
