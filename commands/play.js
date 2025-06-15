import { Message } from 'discord.js';
import { Kazagumo } from 'kazagumo';

function checkIfPause(message, guild, kazagumo) {
  const player = kazagumo.getPlayer(guild.id);
  if (player && player.paused) {
    player.pause(false);
    message.reply('Reanudando la reproducción de la canción actual.');
    return true;
  } else {
    ('¡Debes proporcionar una canción o URL para reproducir!');
    return false;
  }
}

export default {
  name: 'play',
  description: 'Reproduce una canción o playlist en el canal de voz',
  aliases: ['p'],
  /**
   * @param {Message} message
   * @param {string[]} args
   * @param {Kazagumo} kazagumo
   */
  async execute(message, args, kazagumo = message.client.kazagumo) {
    const { member, channel, guild, author } = message;

    const voiceChannel = member.voice.channel;
    if (!voiceChannel) {
      return message.reply(
        '¡Debes estar en un canal de voz para reproducir música!'
      );
    }
    const query = args.join(' ');
    if (!query) {
      return checkIfPause(message, guild, kazagumo);
    }
    await message.reply('Buscando canción...');

    try {
      let player = await kazagumo.createPlayer({
        guildId: guild.id,
        textId: channel.id,
        voiceId: voiceChannel.id,
      });
      let result = await kazagumo.search(query, {
        requester: author,
      });
      if (!result.tracks.length) {
        return message.reply('No se encontraron resultados para tu búsqueda.');
      }

      if (result.type === 'PLAYLIST') {
        player.queue.add(result.tracks);
      } else {
        player.queue.add(result.tracks[0]);
      }

      if (!player.playing && !player.paused) {
        await player.play();
      } else {
        await message.reply(
          result.type === 'PLAYLIST'
            ? `Playlist añadida a la lista`
            : `Canción añadida a la lista`
        );
      }
    } catch (error) {
      console.error('Error reproduciendo una canción:', error);
      message.reply('Ocurrió un error al reproducir la canción.');
    }
  },
};
