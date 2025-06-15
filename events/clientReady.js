import { Events } from 'discord.js';

export default {
  name: Events.ClientReady,
  once: true,
  /**
   * @param {import('discord.js').Client} client
   */
  async execute(client) {
    console.log(`${client.user.tag} esta listo y conectado!!!`);
  },
};
