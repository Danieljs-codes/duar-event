import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';
import Dashboard from '~/components/dashboard/dashboard';
import { db } from '~/db';

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    redirect('/auth-callback');
  }

  await db.events.findMany({
    where: {
      userId: user.id,
    },
  });

  return <Dashboard />;
};

export default DashboardPage;
