import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { api_logs, socket_logs } from '../../configs/debug.js';
import { env } from '../../configs/env.js';
import { handler } from './dist/handler.js';

function isNumeric(num) {
	// @ts-ignore
	return !isNaN(num);
}

function getServer() {
	const app = express();
	app.get('/healthcheck', (_, res) => res.end('ok'));
	app.use(handler);
	return createServer(app);
}

const server = getServer();
const io = new Server(server, {
	cors: {
		origin: ['http://localhost:3000', env.VITE_SOCKET_SERVER]
	}
});

io.on('connection', socket => {
	socket.on('connection', message => {
		socket.on('create.dashboard', message => {
			socket.to(message.channel).emit('create.dashboard', message.data);
		});

		socket.on('delete.dashboard', message => {
			socket.to(message.channel).emit('delete.dashboard', message.data);
		});

		if (message.id === 'bot') {
			socket.join('bot');

			socket.on('search', message => {
				socket.to(message.channel).emit('search', message.data);
			});

			socket.on('search.exact', message => {
				socket.to(message.channel).emit('search.exact', message.data);
			});

			socket_logs('Bot: New connection');
		} else if (message.data !== null) {
			socket.join([message.data.id, 'all']);

			socket.on('search', message => {
				socket.to('bot').emit('search', message);
			});

			socket.on('search.exact', message => {
				socket.to('bot').emit('search.exact', message);
			});

			socket_logs(`Web > ${message.data.id}: New connection`);
		}
	});
});

server.listen(3000, () => api_logs('Listening on port 3000'));
