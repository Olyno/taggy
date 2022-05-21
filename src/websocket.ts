import { socket_logs } from '$lib/debug';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
const connections = new Map();

function isNumeric(num: string) {
	// @ts-ignore
	return !isNaN(num);
}

wss.on('connection', ws => {
	ws.on('message', data => {
		const message = JSON.parse(data.toString());
		if (message.channel === 'connection') {
			if (message.id === 'bot') {
				socket_logs('Bot: New connection');
			} else if (message.data !== null) {
				connections.set(message.id, ws);
				socket_logs(`Web > ${message.data.id}: New connection`);
			}
		} else if (isNumeric(message.channel) && message.id === 'bot') {
			const connection = connections.get(message.channel);
			if (connection) {
				connection.send(JSON.stringify(message));
			}
		} else {
			socket_logs(`Unkown > ${message.channel}: ${message.data}`);
		}
	});
});

socket_logs('Server started');
