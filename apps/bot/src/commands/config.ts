import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { TaggyCommand } from '.';

export default {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Configure the bot')
    .addStringOption(option =>
      option
        .setName('emoji')
        .setDescription(
          'Configure the emoji to bookmark your messages. Default: 🔖'
        )
        .setRequired(true)
    ),
  execute: (interaction: CommandInteraction) => {
    const emoji = interaction.options.getString('emoji');
    interaction.reply({
      content: 'Emoji set to: ' + emoji,
      ephemeral: true,
    });
  },
} as TaggyCommand;
