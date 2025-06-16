import { Message, EmbedBuilder } from 'discord.js';
export default {
  name: 'help',
  description: 'Muestra la lista de comandos disponibles',
  aliases: ['ayuda'],
  /**
   * @param {Message} message
   * @param {string[]} args
   */
  async execute(message, args) {
    const commands = message.client.commands;
    const prefix = process.env.PREFIX || '..';

    const embed = new EmbedBuilder()
      .setTitle('Comandos disponibles')
      .setDescription(`**Prefijo:** \`${prefix}\``)
      .setColor(0x5865f2);

    // Para evitar duplicados por alias
    const shown = new Set();
    for (const command of commands.values()) {
      if (shown.has(command.name)) continue;
      shown.add(command.name);
      let aliases =
        command.aliases && command.aliases.length > 0
          ? command.aliases.map((alias) => `\`${prefix}${alias}\``).join(', ')
          : 'No posee alias';
      embed.addFields({
        name: `\`${prefix}${command.name}\``,
        value: `Alias: ${aliases}\n*${command.description || 'Sin descripción'}*`,
        inline: false,
      });
    }

    message.reply({ embeds: [embed] });
  },
};
