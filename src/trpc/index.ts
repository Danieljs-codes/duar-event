import { auth, clerkClient, currentUser } from '@clerk/nextjs';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '~/db';

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const user = await currentUser();

    if (!user?.emailAddresses?.[0]?.emailAddress) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }

    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          firstName: user.firstName ?? 'Olamide',
          lastName: user.lastName ?? 'Daniel',
          imageUrl: user.imageUrl,
        },
      });
    }

    return { success: true };
  }),

  getAllUserEvent: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const events = await db.events.findMany({
      where: {
        userId,
      },
    });

    return events;
  }),

  deleteUser: privateProcedure.mutation(async ({ ctx }) => {
    const { sessionId } = auth();
    if (!sessionId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }
    await clerkClient.sessions.revokeSession(sessionId);
    await clerkClient.users.deleteUser(ctx.userId);
  }),
});

export type AppRouter = typeof appRouter;
