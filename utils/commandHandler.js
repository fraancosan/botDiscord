import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

function commandHandler(client) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    // Importación dinámica para ES Modules
    import(pathToFileURL(filePath).href)

      .then((commandModule) => {
        const command = commandModule.default || commandModule;
        if ('name' in command && 'execute' in command) {
          client.commands.set(command.name, command);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "name" or "execute" property.`
          );
        }
      })
      .catch((err) => {
        console.error(`[ERROR] Failed to load command at ${filePath}:`, err);
      });
  }
}

export { commandHandler };
