export type MessageType = {
	id: string;
	id_discord_message: string;
	content: string;
	author: string;
	processed_at: string;
	bookmarked_at: string;
};

export type MessageGroupType = {
	id: string;
	name: string;
	emoji: string;
	messages: MessageType[];
	created_at: string;
};

export type EventType = {
	id: string;
	name: string;
	location: string;
	message_groups: MessageGroupType[];
	is_private: boolean;
	created_at: string;
	created_by: string;
};

export type NotificationType = {
	id: string;
	id_member: string;
	has_notification: boolean;
};

export type DashboardType = {
	id: string;
	id_guild: string;
	id_members: string[];
	guild_name: string;
	guild_image_url: string;
	members_notifications: NotificationType[];
	plan: Plan;
	events: EventType[];
};

export type DiscordUser = {
	id: string;
	username: string;
	discriminator: string;
	avatar?: string;
	bot?: boolean;
	system?: boolean;
	mfa_enabled?: boolean;
	banner?: string;
	accent_color?: number;
	locale?: string;
	verified?: boolean;
	email?: string;
	flags?: number;
	premium_type?: number;
	public_flags?: number;
};

export type DiscordApplication = {
	id: string;
	name: string;
	icon: string;
	description: string;
	rpc_origins?: string[];
	bot_public: boolean;
	bot_require_code_grant: boolean;
	terms_of_service_url?: string;
	privacy_policy_url?: string;
	owner: Partial<DiscordUser>;
	verify_key: string;
	team: {
		icon: string;
		id: number;
		members: {
			membership_state: number;
			permissions: string[];
			team_id: number;
			user: Partial<DiscordUser>;
		}[];
		name: string;
		owner_user_id: number;
	};
};

export type UserSession = {
	application: DiscordApplication;
	user: DiscordUser;
};

export type DiscordAuthResponse = {
	application: DiscordApplication;
	scopes: string[];
	expires: Date;
	user: DiscordUser;
};

export type Response<T> = {
	status: number;
	body?: T;
	message?: string;
};

export type Plan = 'FREE' | 'PREMIUM';
