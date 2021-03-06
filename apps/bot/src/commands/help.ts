import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { TaggyCommand } from '.';

const help_embed = new MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Some title')
  .setURL('https://discord.js.org/')
  .setAuthor({
    name: 'Some name',
    iconURL: 'https://i.imgur.com/AfFp7pu.png',
    url: 'https://discord.js.org',
  })
  .setDescription('Some description here')
  .setThumbnail('https://i.imgur.com/AfFp7pu.png')
  .addFields(
    { name: 'Regular field title', value: 'Some value here' },
    { name: '\u200B', value: '\u200B' },
    { name: 'Inline field title', value: 'Some value here', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true }
  )
  .addField('Inline field title', 'Some value here', true)
  .setImage('https://i.imgur.com/AfFp7pu.png')
  .setTimestamp()
  .setFooter({
    text: 'Some footer text here',
    iconURL: 'https://i.imgur.com/AfFp7pu.png',
  });

export default {
  data: new SlashCommandBuilder().setName('help').setDescription('Show help'),
  execute: (interaction: CommandInteraction) => {
    interaction.channel?.send({
      embeds: [help_embed],
    });
  },
} as TaggyCommand;
