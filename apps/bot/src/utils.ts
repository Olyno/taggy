import { Collection, Guild, GuildMember } from 'discord.js';

export function defined<T>(arg: T | null | undefined): arg is T {
  return arg !== null;
}

export async function findMembers(
  guild: Guild,
  query: string,
  exact: boolean = false,
  retried: boolean = false
): Promise<Collection<string, GuildMember> | undefined> {
  const members_found = guild?.members.cache.filter(m => {
    if (exact) {
      return m.id === query || m.user.username === query;
    }
    return (
      m.id === query ||
      m.nickname === query ||
      m.user.username === query ||
      m.nickname?.toLowerCase()?.includes(query.toLowerCase()) ||
      m.user.username.toLowerCase().includes(query.toLowerCase())
    );
  });
  if (members_found?.values.length === 0 && !retried) {
    await guild?.members.fetch();
    return findMembers(guild, query, exact, true);
  }
  return members_found;
}
