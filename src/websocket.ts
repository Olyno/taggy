import { socket_logs } from '$lib/debug';
import { Server } from 'socket.io';

const io = new Server();

function isNumeric(num: string) {
	// @ts-ignore
	return !isNaN(num);
}

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

io.listen(8080, {
	cors: {
		origin: ['http://localhost:3000', 'http://localhost:8080']
	}
});

socket_logs('Server started');
