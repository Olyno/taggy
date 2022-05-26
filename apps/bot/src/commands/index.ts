import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, CommandInteraction } from 'discord.js';
import command_config from './config';
import command_help from './help';

export type TaggyCommand = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
};

const commands: TaggyCommand[] = [command_config, command_help];

export async function runCommand(
  name: string,
  interaction: CommandInteraction
) {
  const command = commands.find(c => c.data.name === name);
  if (!command) throw new Error(`Command ${name} not found`);
  return command.execute(interaction);
}

export async function setupCommands(client: Client, env: any) {
  const client_id = client.user?.id;
  const rest = new REST({ version: '9' }).setToken(env.DISCORD_TOKEN);

  if (!client_id) {
    throw new Error('Client ID not found');
  }

  client.application?.commands.set([]);

  if (env.NODE_ENV === 'development') {
    const guild = client.guilds.cache.find(
      guild => guild.id === env.DISCORD_GUILD_ID
    );

    if (!guild) {
      throw new Error('Guild not found');
    }

    guild.commands.set([]);

    return rest.put(
      Routes.applicationGuildCommands(client_id, env.DISCORD_GUILD_ID),
      {
        body: commands.map(command => command.data.toJSON()),
      }
    );
  } else {
    return rest.put(Routes.applicationCommands(client_id), {
      body: commands.map(command => command.data.toJSON()),
    });
  }
}
