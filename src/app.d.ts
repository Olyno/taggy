/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	type _DiscordAuthResponse = import('$types').DiscordAuthResponse;
	type _DiscordUser = import('$types').DiscordUser;
	type _DiscordApplication = import('$types').DiscordApplication;
	type _User = import('$types').User;

	interface Locals {
		user: _User;
		application: _DiscordApplication;
		authenticated: boolean;
	}
	// interface Platform {}
	interface Session {}
	// interface Stuff {}
}
