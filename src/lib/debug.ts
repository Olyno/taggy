import debug from 'debug';

debug.enable('server:*');

export const api_logs = debug('server:api');
export const socket_logs = debug('server:socket');
export const client_logs = debug('client');
