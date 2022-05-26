import { PrismaClient } from '@prisma/client';
import { message_groups } from './message';

export * from './dashboard';
export * from './message';

export async function seed(prisma: PrismaClient) {
  const groups = await prisma.messageGroup.findMany({});
  for (const group of groups) {
    message_groups.set(group.emoji, group);
  }
}
