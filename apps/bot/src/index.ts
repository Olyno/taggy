import { env } from '$configs/env.js';
import { prisma } from '$configs/prisma.js';
import { Client, GuildMember, Intents } from 'discord.js';
import { io } from 'socket.io-client';
import { setupCommands } from './commands';
import { createDashboard, createMessage, deleteDashboard, deleteMessage, seed } from './database';
import { defined, findMembers } from './utils';

const socket = io(env.VITE_SOCKET_SERVER.replace(/^https?:\/\//g, 'wss://'));

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES
	],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

// client.on('interactionCreate', interaction => {
//   if (!interaction.isCommand()) return;
//   runCommand(interaction.commandName, interaction)
//     .then(() => console.log('Command %s executed', interaction.commandName))
//     .catch(err =>
//       console.log('Command %s error: %s', interaction.commandName, err)
//     );
// });

client.once('ready', () => {
	console.log('Ready');
	setupCommands(client, env)
		.then(() => console.log('Commands setup'))
		.catch(err => console.log('Commands setup error: %s', err));
});

socket.on('connect', () => {
	socket.emit('connection', { id: 'bot' });
	console.log('Socket connected');
});

socket.on('search', async message => {
	const { query, id_guild } = message.data;
	const guild = client.guilds.cache.get(id_guild);

	if (!guild) return;

	const members = await findMembers(guild, query);

	socket.emit('search', {
		id: 'bot',
		channel: message.channel,
		data: members?.map(member => {
			return {
				id: member.id,
				username: member.user.username + '#' + member.user.discriminator,
				avatar: member.avatar || member.user.avatar
			};
		})
	});
});

socket.on('search.exact', async message => {
	const { query, id_guild } = message.data;
	const guild = client.guilds.cache.get(id_guild);

	if (!guild) return;

	if (query instanceof Array) {
		if (query.length === 0) {
			return socket.emit('search.exact', {
				id: 'bot',
				channel: message.channel,
				data: []
			});
		}

		const members_found = await Promise.all(query.map(q => findMembers(guild, q, true)));
		const members: GuildMember[] = members_found
			.map(member_found => member_found?.first())
			.filter(defined);

		socket.emit('search.exact', {
			id: 'bot',
			channel: message.channel,
			data: members.map(member => {
				return {
					id: member.id,
					username: member.user.username + '#' + member.user.discriminator,
					avatar: member.avatar || member.user.avatar
				};
			})
		});
		return;
	}

	const member = await findMembers(guild, query, true);

	socket.emit('search.exact', {
		id: 'bot',
		channel: message.channel,
		data: member?.map(member => {
			return {
				id: member.id,
				username: member.user.username + '#' + member.user.discriminator,
				avatar: member.avatar || member.user.avatar
			};
		})
	});
});

client.on('guildCreate', async guild => {
	const dashboard = await createDashboard(prisma, guild);
	socket.emit('create.dashboard', {
		id: 'bot',
		channel: guild.ownerId,
		data: dashboard
	});
	console.log('Joined guild %s (%d)', guild.name, guild.id);
});

client.on('guildDelete', async guild => {
	const dashboard = await deleteDashboard(prisma, guild);
	socket.emit('delete.dashboard', {
		channel: guild.ownerId,
		id: 'bot',
		data: dashboard
	});
	console.log('Left guild %s (%d)', guild.name, guild.id);
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (user.bot) return;
	if (!reaction.message.guild) return;
	const message = await createMessage(prisma, reaction, user);
	socket.emit('create.message', {
		channel: reaction.message.guild?.id,
		id: 'bot',
		data: message
	});
});

client.on('messageReactionRemove', async (reaction, user) => {
	if (user.bot) return;
	if (!reaction.message.guild) return;
	const message = await deleteMessage(prisma, reaction, user);
	socket.emit('delete.message', {
		channel: reaction.message.guild?.id,
		id: 'bot',
		data: message
	});
});

seed(prisma);

client.login(env.DISCORD_TOKEN);
