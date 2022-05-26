import { PrismaClient } from '@prisma/client';
import {
  GuildEmoji,
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  ReactionEmoji,
  User,
} from 'discord.js';

function getEmojiName(emoji: GuildEmoji | ReactionEmoji): string {
  const emoji_name = emoji.name;
  const identifier = emoji.identifier;
  const is_custom_emoji = identifier.match(/^(a:)?\w+:[0-9]+$/g);
  if (is_custom_emoji) {
    if (emoji.animated) {
      return `<${identifier}>`;
    }
    return `<:${identifier}>`;
  }
  return emoji_name as string;
}

export const message_groups = new Map();

export const createMessage = async (
  prisma: PrismaClient,
  reaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser
) => {
  const emoji_name = getEmojiName(reaction.emoji);
  const message_group = message_groups.get(emoji_name);
  if (!message_group) return;
  const dashboard = await prisma.dashboard.findFirst({
    where: {
      id_guild: reaction.message.guild!.id,
      id_members: {
        has: user.id,
      },
    },
  });
  if (!dashboard) return;
  return prisma.messageGroup.update({
    where: {
      id: message_group.id,
    },
    data: {
      messages: {
        connectOrCreate: {
          where: {
            id_discord_message: reaction.message.id,
          },
          create: {
            id_discord_message: reaction.message.id,
            url: reaction.message.url,
            author: user.username || user.id,
            content: reaction.message.content || '<Content not available>',
          },
        },
      },
    },
  });
};

export const deleteMessage = async (
  prisma: PrismaClient,
  reaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser
) => {
  const emoji_name = getEmojiName(reaction.emoji);
  const message_group = message_groups.get(emoji_name);
  if (!message_group) return;
  const dashboard = await prisma.dashboard.findFirst({
    where: {
      id_guild: reaction.message.guild!.id,
      id_members: {
        has: user.id,
      },
    },
  });
  if (!dashboard) return;
  return prisma.messageGroup.update({
    where: {
      id: message_group.id,
    },
    data: {
      messages: {
        delete: {
          id_discord_message: reaction.message.id,
        },
      },
    },
  });
};
