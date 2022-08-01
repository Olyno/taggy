/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	type _DiscordAuthResponse = import('$types').DiscordAuthResponse;
	type _DiscordUser = import('$types').DiscordUser;
	type _DiscordApplication = import('$types').DiscordApplication;
	type _User = import('$types').User;

	interface UserSession {
		user: import('@supabase/supabase-js').User;
		accessToken?: string;
	}
	interface Locals extends UserSession {
		error: import('@supabase/supabase-js').ApiError;
	}
	interface Session extends UserSession {}
	/*interface Locals {
		user: _User;
		application: _DiscordApplication;
		authenticated: boolean;
	}*/
	// interface Platform {}
	// interface Stuff {}
}
