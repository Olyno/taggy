import { PrismaClient } from '@prisma/client';
import { Guild } from 'discord.js';

export const createDashboard = async (prisma: PrismaClient, guild: Guild) => {
  return prisma.dashboard
    .create({
      data: {
        id_guild: guild.id,
        id_members: [guild.ownerId],
        guild_name: guild.name,
        guild_image_url:
          guild.iconURL({
            format: 'png',
            dynamic: true,
          }) ||
          'https://discord.com/assets/9f6f9cd156ce35e2d94c0e62e3eff462.png',
        members_notifications: {
          create: [
            {
              id_member: guild.ownerId,
            },
          ],
        },
        events: {
          create: [
            {
              name: 'Office Hour',
              location: 'Discord',
              message_groups: {
                create: [
                  {
                    name: 'Bookmarks',
                    emoji: '🔖',
                  },
                ],
              },
              is_private: false,
              created_by: guild.ownerId,
            },
          ],
        },
      },
    })
    .catch(() => {
      return prisma.dashboard.findFirst({
        where: {
          id_guild: guild.id,
        },
      });
    });
};

export const deleteDashboard = async (prisma: PrismaClient, guild: Guild) => {
  return prisma.dashboard
    .delete({
      where: {
        id_guild: guild.id,
      },
    })
    .catch(() => null);
};
