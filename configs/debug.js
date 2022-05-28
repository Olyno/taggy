import debug from 'debug';

debug.enable('server:*');
debug.enable('bot');

export const bot_logs = debug('bot');
export const api_logs = debug('server:api');
export const socket_logs = debug('server:socket');
export const client_logs = debug('client');
