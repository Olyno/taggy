import type { DashboardMemberType } from '$types';
import { get } from 'svelte/store';
import { dashboard as dashboard_store, socket } from './stores';

const members_search_cache = new Map<string | string[], DashboardMemberType[]>();

let search_timeout: NodeJS.Timeout;

export async function searchMembers(
	user_id: string,
	query: string | string[],
	exact: boolean = false
): Promise<DashboardMemberType[]> {
	return new Promise(resolve => {
		const start_search = () => {
			if (members_search_cache.has(query)) {
				return resolve(members_search_cache.get(query) as DashboardMemberType[]);
			}

			const returnResults = (results: DashboardMemberType[]) => {
				if (results.length === 0) return;
				socket?.removeAllListeners('search');
				socket?.removeAllListeners('search.exact');
				members_search_cache.set(query, results);
				resolve(results);
			};

			socket?.once('search', returnResults);
			socket?.once('search.exact', returnResults);

			socket?.emit(exact ? 'search.exact' : 'search', {
				data: {
					query: query,
					id_guild: get(dashboard_store)?.id_guild
				},
				channel: user_id,
				id: user_id
			});
		};

		clearTimeout(search_timeout);
		search_timeout = setTimeout(start_search, 700);
	});
}
